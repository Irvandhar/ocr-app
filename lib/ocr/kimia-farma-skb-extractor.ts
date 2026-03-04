// lib/ocr/kimia-farma-skb-extractor.ts
// OCR extraction logic specifically for Kimia Farma - Surat Kirim Barang (SKB)

import { KimiaFarmaSkb, emptyKimiaFarmaSkb } from "@/types/kimia-farma-skb";

const MODEL = "google/gemini-3-flash-preview"; 

// ─────────────────────────────────────────────
// The Prompt
// ─────────────────────────────────────────────

export function buildKimiaFarmaSkbPrompt(): string {
  return `You are an expert OCR system specializing in Indonesian pharmaceutical logistics documents.

This image is a "Surat Kirim Barang" (SKB) from Kimia Farma / PT. Kimia Farma Tbk.
The document is mostly printed/typed text. Extract ALL fields carefully including all DO numbers.

Return ONLY a valid JSON object with this EXACT structure. Do not include markdown, backticks, or explanations.

{
  "header": {
    "tanggal": "date from top left e.g. 22.01.2026",
    "receiving_plant": {
      "nama": "receiving plant name e.g. KFTD TANGERANG",
      "alamat": "street address",
      "kota": "city and postal code",
      "phone": "phone number or null"
    },
    "supplying_plant": {
      "nama": "supplying plant name e.g. Unit Logistik Sentral",
      "alamat": "street address",
      "kota": "city and country",
      "phone": "phone number",
      "fax": "fax number or null"
    },
    "perusahaan": "company name top right e.g. PT. Kimia Farma Tbk",
    "npwp": "NPWP number e.g. 01.001.627.7-051.000",
    "licence": "licence value or null if empty"
  },
  "referensi": {
    "skb_no": "SKB No value e.g. 3000082143 / DARAT",
    "driver_no_mobil": "Driver and vehicle number e.g. ADE / B 9356 SCL",
    "fwd_agent": "forwarding agent name e.g. MASAJI KARGOSENTRA TAMA, PT"
  },
  "quantities": {
    "jumlah_koli": 0,
    "jumlah_tonase_kg": 0,
    "jumlah_volume_m3": 0.0
  },
  "do_numbers": ["1300998854", "1301000098"],
  "note": "full note text including any reference numbers, or null",
  "signatories": {
    "received_by": {
      "nama": "name of receiver or null if only stamp/signature",
      "tanggal": "date or null",
      "jabatan": "position/branch name e.g. KFTD TANGERANG"
    },
    "issued_by": {
      "nama": "printed name of issuer e.g. NUR MUH. AMINULLAH",
      "tanggal": "date e.g. 22.01.2026",
      "jabatan": "position e.g. DISTRIBUTION CENTER"
    }
  },
  "tembusan": [
    "Lembar 1 : Bagian Adm / Keuangan Unit Logistik Sentral",
    "Lembar 2 : ..."
  ]
}

Important rules:
- jumlah_koli and jumlah_tonase_kg must be integers
- jumlah_volume_m3 must be a float (e.g. 5.064)
- do_numbers must be an array of strings — extract EVERY DO number listed, they may span multiple lines
- tembusan must be an array of strings, one per line
- For empty/blank fields, use null
- Return ONLY the JSON — no other text`;
}

// ─────────────────────────────────────────────
// API Caller
// ─────────────────────────────────────────────

export async function extractKimiaFarmaSkb(
  imageBase64: string
): Promise<KimiaFarmaSkb> {
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
            { type: "text", text: buildKimiaFarmaSkbPrompt() },
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
    return JSON.parse(cleaned) as KimiaFarmaSkb;
  } catch {
    console.error("JSON parse failed, raw text:", rawText);
    return {
      ...emptyKimiaFarmaSkb,
      note: `[OCR parse error] Raw: ${rawText.slice(0, 200)}`,
    };
  }
}