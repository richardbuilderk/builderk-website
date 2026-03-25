export default async function handler(req, res) {
  // CORS headers for Formspree
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Map Formspree fields to GHL contact
    const contact = {
      firstName: extractFirstName(data.name || ''),
      lastName: extractLastName(data.name || ''),
      email: data.email || '',
      phone: formatPhone(data.phone || ''),
      locationId: process.env.GHL_LOCATION_ID,
      state: 'Florida',
      postalCode: data.zip_code || '',
      source: 'Website Form',
      tags: buildTags(data),
    };

    // Send to GHL
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_PIT_TOKEN}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    const ghlData = await ghlResponse.json();

    if (!ghlResponse.ok) {
      console.error('GHL error:', ghlData);
      return res.status(500).json({ error: 'Failed to create contact in GHL', details: ghlData });
    }

    console.log('Lead added to GHL:', ghlData.contact?.id, contact.firstName, contact.lastName);
    return res.status(200).json({ success: true, contactId: ghlData.contact?.id });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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

  // Timeline tag
  if (data.timeline) {
    const timelineMap = {
      'Just exploring': 'just-exploring',
      'Ready to start': 'ready-to-start',
      'Within 6 months': 'within-6-months',
      'Within 1 year': 'within-1-year',
    };
    tags.push(timelineMap[data.timeline] || data.timeline.toLowerCase().replace(/[^a-z0-9]/g, '-'));
  }

  return tags;
}
