// types/kimia-farma-skb.ts
// Template for Kimia Farma - Surat Kirim Barang (SKB)

// ─────────────────────────────────────────────
// Sub-types
// ─────────────────────────────────────────────

export interface ReceivingPlant {
  nama: string | null;          // e.g. "KFTD TANGERANG"
  alamat: string | null;        // e.g. "JL. RAYA PONDOK KACANG TIMUR RT/RW"
  kota: string | null;          // e.g. "TANGERANG SELATAN 15226"
  phone: string | null;
}

export interface SupplyingPlant {
  nama: string | null;          // e.g. "Unit Logistik Sentral"
  alamat: string | null;        // e.g. "Jl Rawa gelam V no 1 Kawasan I"
  kota: string | null;          // e.g. "Jakarta 13930 - Indonesia"
  phone: string | null;
  fax: string | null;
}

export interface Signatory {
  nama: string | null;
  tanggal: string | null;       // format: DD/MM/YYYY
  jabatan: string | null;
}

// ─────────────────────────────────────────────
// Main Document Type
// ─────────────────────────────────────────────

export interface KimiaFarmaSkb {

  // ── Header ─────────────────────────────────
  header: {
    tanggal: string | null;         // e.g. "22.01.2026"
    receiving_plant: ReceivingPlant;
    supplying_plant: SupplyingPlant;
    perusahaan: string | null;      // e.g. "PT. Kimia Farma Tbk"
    npwp: string | null;            // e.g. "01.001.627.7-051.000"
    licence: string | null;
  };

  // ── Shipment Reference ─────────────────────
  referensi: {
    skb_no: string | null;          // e.g. "3000082143 / DARAT"
    driver_no_mobil: string | null; // e.g. "ADE / B 9356 SCL"
    fwd_agent: string | null;       // e.g. "MASAJI KARGOSENTRA TAMA, PT"
  };

  // ── Quantities ─────────────────────────────
  quantities: {
    jumlah_koli: number | null;     // e.g. 196
    jumlah_tonase_kg: number | null;// e.g. 903
    jumlah_volume_m3: number | null;// e.g. 5.064
  };

  // ── DO Numbers ─────────────────────────────
  do_numbers: string[];             // array of all DO numbers listed

  // ── Notes ──────────────────────────────────
  note: string | null;              // e.g. "Dalam Kota\n1300999036"

  // ── Signatories ────────────────────────────
  signatories: {
    received_by: Signatory;
    issued_by: Signatory;
  };

  // ── Tembusan ───────────────────────────────
  tembusan: string[];               // list of cc recipients
}

// ─────────────────────────────────────────────
// Empty Template
// ─────────────────────────────────────────────

export const emptyKimiaFarmaSkb: KimiaFarmaSkb = {
  header: {
    tanggal: null,
    receiving_plant: {
      nama: null,
      alamat: null,
      kota: null,
      phone: null,
    },
    supplying_plant: {
      nama: null,
      alamat: null,
      kota: null,
      phone: null,
      fax: null,
    },
    perusahaan: null,
    npwp: null,
    licence: null,
  },
  referensi: {
    skb_no: null,
    driver_no_mobil: null,
    fwd_agent: null,
  },
  quantities: {
    jumlah_koli: null,
    jumlah_tonase_kg: null,
    jumlah_volume_m3: null,
  },
  do_numbers: [],
  note: null,
  signatories: {
    received_by: { nama: null, tanggal: null, jabatan: null },
    issued_by: { nama: null, tanggal: null, jabatan: null },
  },
  tembusan: [],
};

// ─────────────────────────────────────────────
// Sample Output (based on uploaded document)
// ─────────────────────────────────────────────

export const sampleKimiaFarmaSkb: KimiaFarmaSkb = {
  header: {
    tanggal: "22.01.2026",
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
    perusahaan: "PT. Kimia Farma Tbk",
    npwp: "01.001.627.7-051.000",
    licence: null,
  },
  referensi: {
    skb_no: "3000082143 / DARAT",
    driver_no_mobil: "ADE / B 9356 SCL",
    fwd_agent: "MASAJI KARGOSENTRA TAMA, PT",
  },
  quantities: {
    jumlah_koli: 196,
    jumlah_tonase_kg: 903,
    jumlah_volume_m3: 5.064,
  },
  do_numbers: [
    "1300998854", "1301000098", "1301000099", "1301000102", "1301000103",
    "1301000104", "1301000105", "1301000109", "1301000110", "1301000111",
    "1301000115", "1301000116", "1301000117", "1301000118", "1301000119",
    "1301000121", "1301000173", "1301000184", "1301000185", "1301000186",
    "1301000187", "1301000188", "1301000189", "1301000190", "1301000191",
    "1301000202", "1301000420", "1301000640", "1301000644",
  ],
  note: "Dalam Kota\n1300999036",
  signatories: {
    received_by: {
      nama: null, // signature + stamp only
      tanggal: null,
      jabatan: "KFTD TANGERANG",
    },
    issued_by: {
      nama: "NUR MUH. AMINULLAH",
      tanggal: "22.01.2026",
      jabatan: "DISTRIBUTION CENTER",
    },
  },
  tembusan: [
    "Lembar 1 : Bagian Adm / Keuangan Unit Logistik Sentral",
    "Lembar 2 : Bagian PP Unit Logistik Sentral",
    "Lembar 3 : Bagian Penyimpanan Unit Logistik Sentral",
    "Lembar 4-6 : Penerima Barang",
  ],
};