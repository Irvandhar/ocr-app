// Template for Kimia Farma - Delivery Local

// ─────────────────────────────────────────────
// Sub-types
// ─────────────────────────────────────────────

export interface ReceivingPlant {
  nama: string | null;        // e.g. "KFTD TANGERANG"
  alamat: string | null;      // e.g. "JL. RAYA PONDOK KACANG TIMUR RT/RW"
  kota: string | null;        // e.g. "TANGERANG SELATAN 15226"
  phone: string | null;
}

export interface SupplyingPlant {
  nama: string | null;        // e.g. "Unit Logistik Sentral"
  alamat: string | null;
  kota: string | null;        // e.g. "Jakarta 13930 - Indonesia"
  phone: string | null;
  fax: string | null;
}

export interface MaterialItem {
  so_no: string | null;           // e.g. "1000766403"
  po_no: string | null;           // e.g. "7100582971"
  material_code: string | null;   // e.g. "11000493"
  material_name: string | null;   // e.g. "SUFENTA 0.005 MG INJEKSI (PCC)"
  quantity_uom: string | null;    // e.g. "250 Dus"
  batch_edi_dom: string | null;   // e.g. "25025996 10.2028 00.00.0000"
  gw_uom: string | null;          // e.g. "15 Kg"
  karton: number | null;          // e.g. 12
  dus: number | null;             // e.g. 10
  eceran: number | null;          // e.g. 0
  volume: string | null;          // e.g. "2,500 M3"
  packing: string | null;
}

export interface MaterialTotal {
  gw_uom: string | null;          // e.g. "15 Kg"
  karton: number | null;
  dus: number | null;
  eceran: number | null;
  volume: string | null;          // e.g. "2,500 M3"
}

export interface Signatory {
  nama: string | null;
  tanggal: string | null;
  jabatan: string | null;
}

export interface ApotekerPenanggungJawab {
  nama: string | null;            // e.g. "Hendri Mardiansyah, S.Farm., Apt."
  no_sipa: string | null;         // e.g. "DB.19/31.71.01.10/..."
  jabatan: string | null;         // e.g. "APOTEKER PENANGGUNG JAWAB"
}

// ─────────────────────────────────────────────
// Main Document Type
// ─────────────────────────────────────────────

export interface KimiaFarmaDelivery {

  // ── Header ─────────────────────────────────
  header: {
    actual_gi_date: string | null;    // e.g. "22.01.2026"
    date: string | null;              // e.g. "22.01.2026"
    receiving_plant: ReceivingPlant;
    supplying_plant: SupplyingPlant;
    perusahaan: string | null;        // e.g. "PT. Kimia Farma Tbk, TBK"
    npwp: string | null;              // e.g. "01.001.627.7-051.000"
    licence: string | null;           // e.g. "HK.07.01/I/V/522/14"
  };

  // ── Referensi ──────────────────────────────
  referensi: {
    do_no_via: string | null;         // e.g. "1301000202/ DARAT"
    driver_no_mobil: string | null;   // e.g. "ADE/ B 9356 SCL"
    fwd_agent: string | null;         // e.g. "MASAJI KARGOSENTRA TAMA, PT"
  };

  // ── Materials Table ────────────────────────
  materials: MaterialItem[];
  total: MaterialTotal;

  // ── Notes ──────────────────────────────────
  note: string | null;                // e.g. "1 Karton @ 20 Dus\n1 Dus @ 5 AMP\nSo. Note : PESANAN NAPZA KFTD TANGERANG JANUARI"

  // ── Signatories ────────────────────────────
  signatories: {
    received_by: Signatory;
    apoteker_penanggung_jawab: ApotekerPenanggungJawab;
    issued_by: Signatory;
  };

  // ── Tembusan ───────────────────────────────
  tembusan: string[];
}

// ─────────────────────────────────────────────
// Empty Template
// ─────────────────────────────────────────────

export const emptyKimiaFarmaDelivery: KimiaFarmaDelivery = {
  header: {
    actual_gi_date: null,
    date: null,
    receiving_plant: { nama: null, alamat: null, kota: null, phone: null },
    supplying_plant: { nama: null, alamat: null, kota: null, phone: null, fax: null },
    perusahaan: null,
    npwp: null,
    licence: null,
  },
  referensi: {
    do_no_via: null,
    driver_no_mobil: null,
    fwd_agent: null,
  },
  materials: [],
  total: {
    gw_uom: null,
    karton: null,
    dus: null,
    eceran: null,
    volume: null,
  },
  note: null,
  signatories: {
    received_by: { nama: null, tanggal: null, jabatan: null },
    apoteker_penanggung_jawab: { nama: null, no_sipa: null, jabatan: null },
    issued_by: { nama: null, tanggal: null, jabatan: null },
  },
  tembusan: [],
};

// ─────────────────────────────────────────────
// Sample Output (based on uploaded document)
// ─────────────────────────────────────────────

export const sampleKimiaFarmaDelivery: KimiaFarmaDelivery = {
  header: {
    actual_gi_date: "22.01.2026",
    date: "22.01.2026",
    receiving_plant: {
      nama: "KFTD TANGERANG",
      alamat: "JL. RAYA PONDOK KACANG TIMUR RT/RW",
      kota: "TANGERANG SELATAN 15226",
      phone: null,
    },
    supplying_plant: {
      nama: "Unit Logistik Sentral",
      alamat: "Jl Rawa gelam V no 1 Kawasan I",
      kota: "Jakarta 13930 - Indonesia",
      phone: "021-4613510",
      fax: "021-4601869",
    },
    perusahaan: "PT. Kimia Farma Tbk, TBK",
    npwp: "01.001.627.7-051.000",
    licence: "HK.07.01/I/V/522/14",
  },
  referensi: {
    do_no_via: "1301000202/ DARAT",
    driver_no_mobil: "ADE/ B 9356 SCL",
    fwd_agent: "MASAJI KARGOSENTRA TAMA, PT",
  },
  materials: [
    {
      so_no: "1000766403",
      po_no: "7100582971",
      material_code: "11000493",
      material_name: "SUFENTA 0.005 MG INJEKSI (PCC)",
      quantity_uom: "250 Dus",
      batch_edi_dom: "25025996 10.2028 00.00.0000",
      gw_uom: "15 Kg",
      karton: 12,
      dus: 10,
      eceran: 0,
      volume: "2,500 M3",
      packing: null,
    },
  ],
  total: {
    gw_uom: "15 Kg",
    karton: 12,
    dus: 10,
    eceran: 0,
    volume: "2,500 M3",
  },
  note: "1 Karton @ 20 Dus\n1 Dus @ 5 AMP\nSo. Note : PESANAN NAPZA KFTD TANGERANG JANUARI",
  signatories: {
    received_by: {
      nama: null,
      tanggal: null,
      jabatan: "PT. Kimia Farma Trading & Distribution CABANG TANGERANG",
    },
    apoteker_penanggung_jawab: {
      nama: "Hendri Mardiansyah, S.Farm., Apt.",
      no_sipa: "DB.19/31.71.01.10/...779.3/e/2025",
      jabatan: "APOTEKER PENANGGUNG JAWAB",
    },
    issued_by: {
      nama: "NUR MUH. AMINULLAH",
      tanggal: "22 January 2026",
      jabatan: "NATIONAL DISTRIBUTION CENTER",
    },
  },
  tembusan: [
    "Lembar 1 : Bagian Adm / Keuangan Unit Logistik Sentral",
    "Lembar 2 : Bagian PP Unit Logistik Sentral",
    "Lembar 3 : Bagian Penyimpanan Unit Logistik Sentral",
    "Lembar 4-6 : Penerima Barang",
  ],
};