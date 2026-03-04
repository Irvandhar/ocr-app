// OCR extraction logic for Kimia Farma - Delivery Local

import { KimiaFarmaDelivery, emptyKimiaFarmaDelivery } from "@/types/kimia-farma-delivery";

const MODEL = "google/gemini-3-flash-preview"; 

// ─────────────────────────────────────────────
// The Prompt
// ─────────────────────────────────────────────

export function buildKimiaFarmaDeliveryPrompt(): string {
  return `You are an expert OCR system specializing in Indonesian pharmaceutical logistics documents.

This image is a "Delivery Local" document from Kimia Farma / PT. Kimia Farma Tbk.
It contains a materials table with SO No, PO No, batch info, quantities, and three signatories including an Apoteker Penanggung Jawab.
Extract ALL fields carefully, especially all rows in the materials table.

Return ONLY a valid JSON object with this EXACT structure. Do not include markdown, backticks, or explanations.

{
  "header": {
    "actual_gi_date": "e.g. 22.01.2026",
    "date": "e.g. 22.01.2026",
    "receiving_plant": {
      "nama": "e.g. KFTD TANGERANG",
      "alamat": "street address",
      "kota": "city and postal code",
      "phone": "phone number or null"
    },
    "supplying_plant": {
      "nama": "e.g. Unit Logistik Sentral",
      "alamat": "street address",
      "kota": "city and country",
      "phone": "phone number",
      "fax": "fax number or null"
    },
    "perusahaan": "e.g. PT. Kimia Farma Tbk, TBK",
    "npwp": "e.g. 01.001.627.7-051.000",
    "licence": "licence code or null"
  },
  "referensi": {
    "do_no_via": "DO No and transport method e.g. 1301000202/ DARAT",
    "driver_no_mobil": "driver name and vehicle plate e.g. ADE/ B 9356 SCL",
    "fwd_agent": "forwarding agent e.g. MASAJI KARGOSENTRA TAMA, PT"
  },
  "materials": [
    {
      "so_no": "SO number e.g. 1000766403",
      "po_no": "PO number e.g. 7100582971",
      "material_code": "material code before the name e.g. 11000493",
      "material_name": "full material name e.g. SUFENTA 0.005 MG INJEKSI (PCC)",
      "quantity_uom": "quantity with unit e.g. 250 Dus",
      "batch_edi_dom": "batch number, EDI and DOM dates combined e.g. 25025996 10.2028 00.00.0000",
      "gw_uom": "gross weight with unit e.g. 15 Kg",
      "karton": 12,
      "dus": 10,
      "eceran": 0,
      "volume": "volume with unit e.g. 2,500 M3",
      "packing": "packing info or null"
    }
  ],
  "total": {
    "gw_uom": "total gross weight e.g. 15 Kg",
    "karton": 12,
    "dus": 10,
    "eceran": 0,
    "volume": "total volume e.g. 2,500 M3"
  },
  "note": "full note text preserving all lines with \\n, or null",
  "signatories": {
    "received_by": {
      "nama": "name or null if only stamp",
      "tanggal": "date or null",
      "jabatan": "branch/position name e.g. PT. Kimia Farma Trading & Distribution CABANG TANGERANG"
    },
    "apoteker_penanggung_jawab": {
      "nama": "full name with title e.g. Hendri Mardiansyah, S.Farm., Apt.",
      "no_sipa": "SIPA number printed below name",
      "jabatan": "e.g. APOTEKER PENANGGUNG JAWAB"
    },
    "issued_by": {
      "nama": "printed name e.g. NUR MUH. AMINULLAH",
      "tanggal": "date e.g. 22 January 2026",
      "jabatan": "position e.g. NATIONAL DISTRIBUTION CENTER"
    }
  },
  "tembusan": [
    "Lembar 1 : Bagian Adm / Keuangan Unit Logistik Sentral"
  ]
}

Important rules:
- materials must be an array — extract EVERY row in the table
- karton, dus, eceran in both materials and total must be integers
- tembusan must be an array of strings, one entry per line
- For empty/blank fields use null
- Preserve \\n line breaks in the note field
- Return ONLY the JSON — no other text`;
}

// ─────────────────────────────────────────────
// API Caller
// ─────────────────────────────────────────────

export async function extractKimiaFarmaDelivery(
  imageBase64: string
): Promise<KimiaFarmaDelivery> {
  const apiKey = process.env.OPENROUTER_API_KEY!;

  console.log("API key present:", !!apiKey);
  console.log("Sending image of length:", imageBase64.length);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${imageBase64}` },
            },
            { type: "text", text: buildKimiaFarmaDeliveryPrompt() },
          ],
        },
      ],
    }),
  });

  console.log("OpenRouter status:", response.status);

  const responseText = await response.text();
  console.log("OpenRouter response:", responseText.slice(0, 500));

  if (!response.ok) {
    throw new Error(`OpenRouter error ${response.status}: ${responseText}`);
  }

  const data = JSON.parse(responseText);
  const rawText: string = data.choices[0].message.content;

  try {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as KimiaFarmaDelivery;
  } catch {
    console.error("JSON parse failed, raw text:", rawText);
    return {
      ...emptyKimiaFarmaDelivery,
      note: `[OCR parse error] Raw: ${rawText.slice(0, 200)}`,
    };
  }
}