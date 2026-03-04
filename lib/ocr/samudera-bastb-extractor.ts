// lib/ocr/samudera-bastb-extractor.ts
// OCR extraction logic specifically for Samudera BASTB documents

import { SamuderaBastb, emptySamuderaBastb } from "@/types/samudera-bastb";

const MODEL = "google/gemini-3-flash-preview";
/**"google/gemini-3.1-flash-lite-preview"; */


export function buildSamuderaBastbPrompt(): string {
  return `You are an expert OCR system specializing in Indonesian logistics documents.

This image is a "Berita Acara Serah Terima Barang" (BASTB) from Samudera (doc: FRM-OPS-KF-003).
The document contains both printed text and handwritten entries. Extract ALL handwritten values carefully.

Return ONLY a valid JSON object with this EXACT structure. Do not include markdown, backticks, or explanations.

{
  "metadata": {
    "no_dok": "printed value, usually FRM-OPS-KF-003",
    "tanggal_dok": "printed date near top right e.g. 06-Sep-2024",
    "revisi": "printed revision number e.g. 00",
    "no_dokumen": "large number top right e.g. 11559"
  },
  "header": {
    "hari": "handwritten day name e.g. KAMIS",
    "tanggal": "handwritten date number e.g. 22",
    "bulan": "handwritten month number e.g. 01",
    "tahun": "handwritten year e.g. 2026"
  },
  "shipment": {
    "skb_do_po_so": "handwritten SKB/DO/PO/SO number",
    "nama_tujuan": "handwritten destination name",
    "jumlah_koli": 0,
    "berat_kg": 0,
    "volume_cbm": 0.0,
    "origin": "handwritten origin/asal pengambilan barang",
    "moda_transportasi": "one of: Land FTL | Train | Sea Reguler | Sea Express | Air Reguler | Air Express | null (whichever checkbox is checked)",
    "nopol_truk_no_container": "handwritten truck plate or container number",
    "nomor_segel_seal": "handwritten seal number",
    "nama_no_telpon_supir": "handwritten driver name and phone"
  },
  "pelaksanaan_pengiriman": {
    "jenis": "one of: Langsung ke tujuan | Menginap di tujuan | Relokasi / dialihkan | Dikembalikan ke origin | Disimpan sementara | null (whichever checkbox is checked)",
    "menginap_detail": { "sejak_tgl": null, "sd": null },
    "relokasi_ke": null,
    "dikembalikan_alasan": null,
    "disimpan_sementara_detail": { "lokasi": null, "sejak_tgl": null, "sd": null }
  },
  "kondisi_kemasan": {
    "sesuai_dokumen": "Sesuai or Tidak Sesuai based on whether the statement is checked/confirmed",
    "keterangan_lain": "any handwritten notes in keterangan lain field, or null"
  },
  "signatories": {
    "yang_menyerahkan": {
      "nama": "handwritten name or null if only signature",
      "tanggal": "handwritten date DD/MM/YYYY",
      "perusahaan": "handwritten company name",
      "no_handphone": "handwritten phone number or null"
    },
    "transporter": {
      "nama": "handwritten name",
      "tanggal": "handwritten date",
      "perusahaan": "handwritten company name",
      "no_handphone": "handwritten phone number"
    },
    "penerima": {
      "nama": "handwritten name",
      "tanggal": "handwritten date",
      "perusahaan": "handwritten company name or null",
      "no_handphone": "handwritten phone number or null"
    }
  }
}

Important rules:
- jumlah_koli, berat_kg must be integers (numbers, not strings)
- volume_cbm must be a float (e.g. 5.069)
- For unchecked checkboxes, use null
- For empty/blank handwritten fields, use null
- If handwriting is unclear, make your best guess and append [?]
- All string values must be trimmed (no leading/trailing spaces)
- Return ONLY the JSON — no other text`;
}

// ─────────────────────────────────────────────
// API Caller
// ─────────────────────────────────────────────

export async function extractSamuderaBastb(
  imageBase64: string
): Promise<SamuderaBastb> {
  const apiKey = process.env.OPENROUTER_API_KEY!;

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
            {
              type: "text",
              text: buildSamuderaBastbPrompt(),
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${await response.text()}`);
  }

  const data = await response.json();
  const rawText: string = data.choices[0].message.content;

  try {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as SamuderaBastb;
  } catch {
    console.error("Failed to parse Samudera BASTB JSON:", rawText);
    // Return empty template with error note
    return {
      ...emptySamuderaBastb,
      kondisi_kemasan: {
        sesuai_dokumen: null,
        keterangan_lain: `[OCR parse error] Raw: ${rawText.slice(0, 200)}`,
      },
    };
  }
}