export default async function handler(req, res) {
  // CORS: lock to the production origin (same-origin form posts are unaffected)
  res.setHeader('Access-Control-Allow-Origin', 'https://www.builderk.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GHL_TOKEN = process.env.GHL_PIT_TOKEN;
  const GHL_LOCATION = process.env.GHL_LOCATION_ID;
  const GHL_HEADERS = {
    'Authorization': `Bearer ${GHL_TOKEN}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json',
  };

  try {
    const data = req.body;
    const isReferral = !!data.referrer_name;
    const isCalc = data.form_type === 'calculator-estimate';

    // Build contact payload based on form type
    const contact = isReferral
      ? buildReferralContact(data, GHL_LOCATION)
      : buildWebsiteContact(data, GHL_LOCATION);

    // 1. Create or update the contact in GHL
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: GHL_HEADERS,
      body: JSON.stringify(contact),
    });

    const ghlData = await ghlResponse.json();

    let contactId;
    if (!ghlResponse.ok) {
      // Handle duplicate contact — GHL returns the existing contactId in meta
      if (ghlData.meta?.contactId) {
        contactId = ghlData.meta.contactId;
        console.log('Contact already exists in GHL:', contactId, ghlData.meta.contactName);
      } else {
        console.error('GHL contact error:', ghlData);
        return res.status(500).json({ error: 'Failed to create contact. Please try again.' });
      }
    } else {
      contactId = ghlData.contact?.id;
      console.log('Contact created in GHL:', contactId, contact.firstName, contact.lastName);
    }

    // 2. Look up the pipeline and "Lead Generation" stage
    const pipelineStage = await findLeadGenStage(GHL_LOCATION, GHL_HEADERS);

    if (!pipelineStage) {
      console.error('Could not find Lead Generation pipeline stage');
      return res.status(200).json({ success: true, contactId, opportunity: false, reason: 'Pipeline stage not found' });
    }

    // 3. Create the opportunity
    const oppName = isCalc
      ? `${data.email || 'Unknown'} — Calculator Estimate ${data.estimate_total || ''}`.trim()
      : isReferral
        ? `${data.client_name || 'Unknown'} — Referral from ${data.referrer_name}`
        : `${data.name || 'Unknown'} — Website Lead`;

    const opportunityPayload = {
      pipelineId: pipelineStage.pipelineId,
      pipelineStageId: pipelineStage.stageId,
      locationId: GHL_LOCATION,
      contactId,
      name: oppName,
      status: 'open',
      source: isReferral ? 'Referral Program' : 'Website Form',
      monetaryValue: estimateValue(data),
    };

    const oppResponse = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: GHL_HEADERS,
      body: JSON.stringify(opportunityPayload),
    });

    const oppData = await oppResponse.json();

    if (!oppResponse.ok) {
      console.error('GHL opportunity error:', oppData);
      return res.status(200).json({ success: true, contactId, opportunity: false, reason: oppData });
    }

    console.log('Opportunity created in GHL:', oppData.opportunity?.id, oppName);
    return res.status(200).json({ success: true, contactId, opportunityId: oppData.opportunity?.id });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// --- Contact builders ---

function buildWebsiteContact(data, locationId) {
  // Calculator estimates arrive with email only; use the email handle as a stand-in name
  const fallbackName = data.email ? data.email.split('@')[0] : '';
  return {
    firstName: extractFirstName(data.name || fallbackName),
    lastName: extractLastName(data.name || ''),
    email: data.email || '',
    phone: formatPhone(data.phone || ''),
    locationId,
    state: 'Florida',
    postalCode: data.zip_code || '',
    source: data.form_type === 'calculator-estimate' ? 'Cost Calculator' : 'Website Form',
    tags: buildTags(data),
  };
}

function buildReferralContact(data, locationId) {
  return {
    firstName: extractFirstName(data.client_name || ''),
    lastName: extractLastName(data.client_name || ''),
    email: data.client_email || '',
    phone: formatPhone(data.client_phone || ''),
    locationId,
    source: 'Referral Program',
    tags: [
      'referral-lead',
      `referrer-${(data.referrer_name || '').toLowerCase().replace(/\s+/g, '-')}`,
      data.referrer_company ? `brokerage-${data.referrer_company.toLowerCase().replace(/\s+/g, '-')}` : null,
    ].filter(Boolean),
    customFields: [
      { key: 'referrer_name', value: data.referrer_name || '' },
      { key: 'referrer_email', value: data.referrer_email || '' },
      { key: 'referrer_phone', value: data.referrer_phone || '' },
      { key: 'referrer_company', value: data.referrer_company || '' },
      { key: 'project_notes', value: data.project_notes || '' },
    ],
  };
}

// --- Pipeline lookup ---

async function findLeadGenStage(locationId, headers) {
  try {
    const resp = await fetch(
      `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
      { headers }
    );
    const data = await resp.json();

    if (!resp.ok || !data.pipelines) {
      console.error('Pipeline fetch error:', data);
      return null;
    }

    // Look for the main pipeline (first one or one containing "Main" or "Builderk")
    const pipeline = data.pipelines.find(p =>
      /main|builderk/i.test(p.name)
    ) || data.pipelines[0];

    if (!pipeline) return null;

    // Find the "Lead Generation" stage
    const stage = pipeline.stages.find(s =>
      /lead\s*gen/i.test(s.name)
    ) || pipeline.stages[0]; // fallback to first stage

    return {
      pipelineId: pipeline.id,
      stageId: stage.id,
    };
  } catch (err) {
    console.error('Pipeline lookup error:', err);
    return null;
  }
}

// --- Helpers ---

function estimateValue(data) {
  // Calculator estimates carry an exact figure like "$379,800"
  if (data.estimate_total) {
    const n = parseInt(String(data.estimate_total).replace(/[^0-9]/g, ''), 10);
    if (n) return n;
  }
  if (!data.budget) return 0;
  const map = {
    '$200K - $400K': 300000,
    '$400K - $700K': 550000,
    '$700K - $1M': 850000,
    '$1M+': 1250000,
  };
  return map[data.budget] || 0;
}

function extractFirstName(name) {
  return name.trim().split(' ')[0] || 'Unknown';
}

function extractLastName(name) {
  const parts = name.trim().split(' ');
  return parts.length > 1 ? parts.slice(1).join(' ') : '';
}

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return phone;
}

function buildTags(data) {
  const tags = ['website-lead'];

  // Budget tag
  if (data.budget) {
    const budgetMap = {
      '$200K - $400K': '200k-400k',
      '$400K - $700K': '400k-700k',
      '$700K - $1M': '700k-1m',
      '$1M+': '1m-plus',
    };
    tags.push(budgetMap[data.budget] || data.budget.toLowerCase().replace(/[^a-z0-9]/g, '-'));
  }

  // Home size tag
  if (data.home_size) {
    const sizeMap = {
      'Under 1,500 sq ft': 'under-1500sqft',
      '1,500 - 2,000 sq ft': '1500-2000sqft',
      '2,000 - 3,000 sq ft': '2000-3000sqft',
      '3,000+ sq ft': '3000-plus-sqft',
    };
    tags.push(sizeMap[data.home_size] || 'custom-size');
  }

  // Lot ownership tag
  if (data.lot_ownership) {
    if (data.lot_ownership.includes('Yes')) tags.push('owns-lot');
    else tags.push('still-looking-lot');
  }

  // Timeline tag (keys match the live form's option values; legacy values kept)
  if (data.timeline) {
    const timelineMap = {
      'ASAP': 'ready-to-start',
      '1-3 months': 'within-3-months',
      '3-6 months': 'within-6-months',
      '6-12 months': 'within-1-year',
      'Just exploring': 'just-exploring',
      'Ready to start': 'ready-to-start',
      'Within 6 months': 'within-6-months',
      'Within 1 year': 'within-1-year',
    };
    tags.push(timelineMap[data.timeline] || data.timeline.toLowerCase().replace(/[^a-z0-9]/g, '-'));
  }

  // Calculator estimate tags
  if (data.form_type === 'calculator-estimate') {
    tags.push('calculator-estimate');
    if (data.calc_tier) tags.push('tier-' + String(data.calc_tier).toLowerCase());
    if (data.calc_sqft) tags.push('sqft-' + data.calc_sqft);
  }

  // Origin context tags (hidden fields populated by the website form)
  const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  if (data.source_page) tags.push('src-' + slugify(data.source_page));
  if (data.city_interest) tags.push('city-' + slugify(data.city_interest));
  if (data.plan_interest) tags.push('plan-' + slugify(data.plan_interest));
  if (data.utm_source) tags.push('utm-' + slugify(data.utm_source));
  if (data.utm_campaign) tags.push('camp-' + slugify(data.utm_campaign));

  return tags;
}
