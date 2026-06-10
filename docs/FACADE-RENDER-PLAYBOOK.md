# BuilderK Facade Render Playbook

How to generate new facade and home-style renderings for builderk.com, consistent with the
ones already live on the **Facades & Styles** page (`/facades`).

> **Honest note on sources.** There was no saved prompt or instructions file anywhere in the
> project. The original prompts were typed straight into Gemini / ChatGPT and never stored.
> This playbook reconstructs the recipe by reverse-engineering the 11 renders we already have
> plus their written descriptions in `facades.html`. Treat the master prompt below as the new
> single source of truth and keep it updated whenever the look evolves.

---

## 1. What we already have

**Live facade renders:** `builderk-website/images/facades/` — 11 PNGs, ~2,600 x 1,500 px (16:9 landscape).
**Style overview cards:** `builderk-website/images/style-{modern,coastal,contemporary,traditional}.png` — portrait ~1,140 x 1,330 px.
**Wired into:** `builderk-website/facades.html` (each card's `<img src>` and `alt` text).

| Code | Style | Stories | Look |
|------|-------|---------|------|
| P1 | Modern | 1 | Minimalist all-white, black window frames, flat roof |
| P3 | Modern | 1 | Gray + white two-tone, stone accent entry |
| P5 | Modern | 2 | Tropical: white stucco + dark wood cladding, balcony |
| C1 | Coastal | 1 | Classic beach: light gray, white trim, metal roof, porch |
| C3 | Coastal (Modern) | 1 | All stucco white/gray, metal roof, black frames |
| C4 | Coastal | 2 | Beach luxury, all stucco, metal roof, balcony |
| C5 | Coastal | 2 | Tropical, beige/white, wrap-around balcony |
| CO1 | Contemporary | 1 | Clean lines, warm white/beige, mixed rooflines, stone column |
| T1 | Traditional | 1 | Classic Florida, cream stucco, barrel-tile hip roof, arch |
| T2 | Traditional | 1 | Mediterranean, beige stucco, brown barrel tile, shutters |
| T3 | Traditional | 1 | Southern charm, soft white stucco, porch, square columns |

**Note the gaps.** The series skips P2, P4, and C2, and Contemporary only has one render (CO1).
Those are the obvious slots to fill first if you want a fuller catalog.

---

## 2. Naming convention (keep this exact)

Files use this pattern, with a real em dash and spaces as separators:

```
<CODE> — <Style> <Stories>-Story <Sub-style> (<Short Descriptor>).png
```

Examples that already exist:
```
P1 — Modern 1-Story White-Black (Minimalist).png
C4 — Coastal 2-Story Beach Luxury (All Stucco).png
T2 — Traditional 1-Story (Mediterranean Touch).png
```

Code prefixes:
- **P** = Modern (think "Premium/Plan")
- **C** = Coastal
- **CO** = Contemporary
- **T** = Traditional

Number within each prefix sequentially. When you add the next Modern, it becomes **P6**; the next
Contemporary becomes **CO2**; etc.

---

## 3. The BuilderK house DNA (goes in every prompt)

Every render shares this so the whole page looks like one catalog. Paste this block into every prompt
and only change the style-specific part:

```
Photorealistic architectural exterior rendering of a custom single-family home in Florida.
Front three-quarter angle showing the full facade and the front entrance. Professionally
landscaped front yard: manicured green lawn, tropical plants, a few palms, paver driveway and
walkway. Bright sunny day, clear blue sky, soft natural daylight. Real-estate / architectural
visualization quality, ultra detailed, sharp focus. No people, no cars, no text, no watermark,
no logos. Wide 16:9 landscape composition.
```

Hard rules that keep the set consistent:
- **Same camera:** eye-level, front three-quarter (about 30 to 40 degrees off straight-on).
- **Same lighting:** midday sun, blue sky, no dramatic sunset or night shots.
- **Same lot:** flat Florida lot, paver drive, tropical landscaping. Do not let the tool invent
  mountains, snow, or a cityscape.
- **Clean frame:** no people, cars, text, or watermarks.

---

## 4. Master prompt template

Fill the four brackets and append it to the DNA block from section 3.

```
[STORIES]-story [STYLE] style home. Exterior: [MATERIALS + COLORS]. Roof: [ROOF].
Windows and doors: [WINDOWS / ENTRY]. Signature details: [DETAILS].
```

- **[STORIES]** — single / two
- **[STYLE]** — Modern / Coastal / Contemporary / Traditional
- **[MATERIALS + COLORS]** — see the style library below
- **[ROOF]** — flat / metal standing-seam / barrel tile / mixed
- **[WINDOWS / ENTRY]** — frame color, glass, porch, balcony, arch
- **[DETAILS]** — the one thing that makes it distinct (stone column, wood cladding, shutters...)

---

## 5. Style modifier library (copy-paste)

Each block is the proven "[MATERIALS]...[DETAILS]" fill for that style. These are pulled straight
from the renders already on the site, so they reproduce the existing look.

### Modern (P)
> Clean lines, flat roofs, minimalist. Open layouts, large windows, floor-to-ceiling glass,
> indoor-outdoor feel.
- **Materials/colors:** white or two-tone (white + dark gray) stucco; optional dark wood cladding accents.
- **Roof:** flat.
- **Windows/entry:** large windows, black window frames, clean concrete or paver walkway.
- **Details:** stone accent at entrance (two-tone), or dark wood cladding + horizontal-railing
  balcony for a two-story tropical-modern.

### Coastal (C)
> Florida waterfront lifestyle. Light palettes, metal roofs, covered porches, hurricane-ready,
> often raised.
- **Materials/colors:** light gray / white / beige stucco, white trim.
- **Roof:** metal standing-seam.
- **Windows/entry:** covered front porch with columns; second-floor balcony or wrap-around balcony
  on two-story versions; black or white window frames.
- **Details:** breezy beach feel, tropical landscaping, optional raised foundation.

### Contemporary (CO)
> Blend of modern and classic. Mixed rooflines, warm tones, stone accents, curb-appeal detailing.
- **Materials/colors:** warm white + beige stucco.
- **Roof:** mixed flat and low-pitched.
- **Windows/entry:** stone accent entry column.
- **Details:** architectural detailing that reads warmer and more textured than pure Modern.

### Traditional (T)
> Timeless Florida. Barrel-tile roofs, arched entryways, stucco, decorative details.
- **Materials/colors:** cream / beige / soft white stucco.
- **Roof:** hip roof with barrel tile (or concrete tile).
- **Windows/entry:** arched entryway, or covered porch with square columns.
- **Details:** decorative shutters, stone accent at entrance, paver driveway.

---

## 6. Worked examples (the 11 we already have)

Drop the DNA block (section 3) above each of these to regenerate or extend the series.

```
P1  single-story Modern style home. Exterior: all-white stucco. Roof: flat. Windows: large with
    black frames. Details: clean concrete walkway, pure minimalist.

P3  single-story Modern style home. Exterior: dark gray and white two-tone stucco. Roof: flat.
    Windows: black frames. Details: stone accent at the entrance, bold contrast, tropical landscaping.

P5  two-story Modern style home. Exterior: white stucco with dark wood cladding accents. Roof: flat.
    Windows: large, black frames. Details: second-floor balcony with horizontal railing, tropical.

C1  single-story Coastal home. Exterior: light gray stucco, white trim. Roof: metal standing-seam.
    Entry: covered front porch with columns. Details: classic beach look.

C3  single-story Modern Coastal home. Exterior: all stucco, white and light gray. Roof: metal.
    Windows: black frames. Details: modern meets coastal, clean.

C4  two-story Coastal home. Exterior: all stucco. Roof: metal standing-seam. Details: beach luxury,
    second-floor balcony with white railing.

C5  two-story Coastal home. Exterior: beige and white. Roof: metal. Details: wrap-around second-floor
    balcony, tropical landscaping.

CO1 single-story Contemporary home. Exterior: warm white and beige stucco. Roof: mixed flat and
    low-pitched. Details: stone accent entry column, clean lines.

T1  single-story Traditional Florida home. Exterior: warm cream stucco. Roof: hip roof with barrel
    tile. Entry: arched entryway. Details: paver driveway, timeless Florida.

T2  single-story Traditional home. Exterior: light beige stucco. Roof: brown barrel tile. Details:
    stone accent at entrance, decorative shutters, Mediterranean touch.

T3  single-story Traditional home. Exterior: soft white stucco. Roof: hip roof with concrete tile.
    Entry: covered front porch with square columns. Details: Southern charm.
```

---

## 7. Which tool, and how to set it up

You said these were made in Gemini or ChatGPT. Both work. The original tool and settings were not
recorded, so here is a clean, repeatable setup for each. **Recommended primary: Gemini (Nano Banana).**

### Option A — Gemini "Nano Banana" (Google AI Studio) — recommended
- Go to **aistudio.google.com** and pick the image model (Gemini 2.5 Flash Image, aka Nano Banana),
  or use the Gemini app.
- Strongest at following long, detailed prompts and at **consistency from a reference image**, which
  is what you want for a matching catalog.
- Paste the DNA block + the master prompt fill. Set aspect ratio to **16:9**.
- For a matching series, attach an existing render (e.g. `C1`) as a reference image and say
  "keep the same camera angle, lighting, lot, and landscaping; change only the house to ...".

### Option B — ChatGPT (GPT-4o / gpt-image-1)
- Strong prompt adherence, landscape up to 1536 x 1024.
- Same prompt. Ask for "wide landscape 16:9". Generate, then upscale (see section 8).

### Resolution reality check
The live files are ~2,600 px wide. Most generators output around 1,024 to 1,536 px. So the workflow is:
**generate at the tool's max landscape size, then upscale to ~2,560 px wide** before saving. Any
upscaler works (Topaz, Upscayl free/open-source, or the generator's own "HD/upscale" button).

---

## 8. Output + file specs

| Asset | Aspect | Target size | Format |
|-------|--------|-------------|--------|
| Facade render | 16:9 landscape | ~2,560 x 1,440 px | PNG |
| Style overview card | ~4:5 portrait | ~1,140 x 1,330 px | PNG |

After generating:
1. Upscale to target width if needed.
2. Name it with the convention in section 2.
3. Save to `builderk-website/images/facades/`.
4. (Optional but smart) compress: these PNGs are 6 to 8 MB each, which is heavy for the web. Run them
   through an optimizer or export as WebP to cut load time. The `images/` folder is otherwise PNG today.

---

## 9. Adding a new facade to the site (step by step)

1. **Pick the slot.** Next code in the series (e.g. P6, CO2), style, stories.
2. **Build the prompt:** DNA block (section 3) + master fill (section 4) using the style library (section 5).
3. **Generate** in Gemini/ChatGPT at 16:9. For a matching set, attach an existing render as reference.
4. **Upscale** to ~2,560 px wide, **compress**.
5. **Name + save** to `builderk-website/images/facades/`.
6. **Wire into `facades.html`:** copy an existing `.facade-card` block inside the right style section,
   then update three things:
   - `<img src="images/facades/<your new file>.png">`
   - the `alt="..."` text (describe the house, good for SEO)
   - the `<h3>` card title, the `<p>` description, and the `.facade-tag` (1 Story / 2 Story / Featured)
7. **Deploy** (Vercel auto-deploys `builderk-website` on push).

---

## 10. Handing this to an outside vendor

This doc doubles as a vendor brief. Give a contractor:
- Sections 3 to 6 (DNA + master prompt + style library + the 11 examples) as the spec.
- Section 8 for deliverable specs (16:9, ~2,560 px wide, PNG, named to convention).
- One existing render as a visual reference so they match camera, lighting, and landscaping.
Ask them to deliver the gaps first (P2, P4, C2) plus more Contemporary, so every style has 3+ options.

---

## 11. Quick checklist

- [ ] Front three-quarter angle, eye level
- [ ] Midday sun, clear blue sky
- [ ] Florida lot: lawn, tropical plants, palms, paver drive
- [ ] Correct style materials, roof, and signature detail
- [ ] No people, cars, text, or watermark
- [ ] 16:9, upscaled to ~2,560 px wide, compressed
- [ ] Named to convention, saved in `images/facades/`
- [ ] Card added to `facades.html` with src + alt + title + description + tag
