// types/samudera-bastb.ts
// Template for Samudera - Berita Acara Serah Terima Barang (BASTB)
// Doc: FRM-OPS-KF-003

// ─────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────

export type ModaTransportasi =
  | "Land FTL"
  | "Train"
  | "Sea Reguler"
  | "Sea Express"
  | "Air Reguler"
  | "Air Express"
  | null;

export type PelaksanaanPengiriman =
  | "Langsung ke tujuan"
  | "Menginap di tujuan"
  | "Relokasi / dialihkan"
  | "Dikembalikan ke origin"
  | "Disimpan sementara"
  | null;

export type KondisiKemasan = "Sesuai" | "Tidak Sesuai" | null;

// ─────────────────────────────────────────────
// Sub-types
// ─────────────────────────────────────────────

export interface Signatory {
  nama: string | null;
  tanggal: string | null;   // format: DD/MM/YYYY
  perusahaan: string | null;
  no_handphone: string | null;
}

export interface MenginapDiTujuan {
  sejak_tgl: string | null; // format: DD/MM/YYYY
  sd: string | null;        // format: DD/MM/YYYY
}

export interface DisimpanSementara {
  lokasi: string | null;
  sejak_tgl: string | null;
  sd: string | null;
}

// ─────────────────────────────────────────────
// Main Document Type
// ─────────────────────────────────────────────

export interface SamuderaBastb {
  // ── Document Metadata ──────────────────────
  metadata: {
    no_dok: string;               // e.g. "FRM-OPS-KF-003"
    tanggal_dok: string;          // e.g. "06-Sep-2024"
    revisi: string;               // e.g. "00"
    no_dokumen: string;           // top-right number e.g. "11559"
  };

  // ── Header Info ────────────────────────────
  header: {
    hari: string | null;          // e.g. "KAMIS"
    tanggal: string | null;       // e.g. "22"
    bulan: string | null;         // e.g. "01"
    tahun: string | null;         // e.g. "2026"
  };

  // ── Shipment Details ───────────────────────
  shipment: {
    skb_do_po_so: string | null;          // e.g. "3 0000 62/93"
    nama_tujuan: string | null;           // e.g. "KFID TANGERANG"
    jumlah_koli: number | null;           // e.g. 196
    berat_kg: number | null;              // e.g. 903
    volume_cbm: number | null;            // e.g. 5.069
    origin: string | null;               // e.g. "NDC 13"
    moda_transportasi: ModaTransportasi;
    nopol_truk_no_container: string | null; // e.g. "B 9316 SCL"
    nomor_segel_seal: string | null;      // e.g. "1887293"
    nama_no_telpon_supir: string | null;  // e.g. "ADT"
  };

  // ── Pelaksanaan Pengiriman ─────────────────
  pelaksanaan_pengiriman: {
    jenis: PelaksanaanPengiriman;
    menginap_detail: MenginapDiTujuan | null;
    relokasi_ke: string | null;
    dikembalikan_alasan: string | null;
    disimpan_sementara_detail: DisimpanSementara | null;
  };

  // ── Kondisi Kemasan ────────────────────────
  kondisi_kemasan: {
    sesuai_dokumen: KondisiKemasan;   // "Sesuai" if checked
    keterangan_lain: string | null;
  };

  // ── Signatories ────────────────────────────
  signatories: {
    yang_menyerahkan: Signatory;
    transporter: Signatory;
    penerima: Signatory;
  };
}

// ─────────────────────────────────────────────
// Empty Template (default / blank state)
// ─────────────────────────────────────────────

export const emptySamuderaBastb: SamuderaBastb = {
  metadata: {
    no_dok: "FRM-OPS-KF-003",
    tanggal_dok: "",
    revisi: "00",
    no_dokumen: "",
  },
  header: {
    hari: null,
    tanggal: null,
    bulan: null,
    tahun: null,
  },
  shipment: {
    skb_do_po_so: null,
    nama_tujuan: null,
    jumlah_koli: null,
    berat_kg: null,
    volume_cbm: null,
    origin: null,
    moda_transportasi: null,
    nopol_truk_no_container: null,
    nomor_segel_seal: null,
    nama_no_telpon_supir: null,
  },
  pelaksanaan_pengiriman: {
    jenis: null,
    menginap_detail: null,
    relokasi_ke: null,
    dikembalikan_alasan: null,
    disimpan_sementara_detail: null,
  },
  kondisi_kemasan: {
    sesuai_dokumen: null,
    keterangan_lain: null,
  },
  signatories: {
    yang_menyerahkan: {
      nama: null,
      tanggal: null,
      perusahaan: null,
      no_handphone: null,
    },
    transporter: {
      nama: null,
      tanggal: null,
      perusahaan: null,
      no_handphone: null,
    },
    penerima: {
      nama: null,
      tanggal: null,
      perusahaan: null,
      no_handphone: null,
    },
  },
};

// ─────────────────────────────────────────────
// Sample Output (based on the uploaded document)
// ─────────────────────────────────────────────

export const sampleSamuderaBastb: SamuderaBastb = {
  metadata: {
    no_dok: "FRM-OPS-KF-003",
    tanggal_dok: "06-Sep-2024",
    revisi: "00",
    no_dokumen: "11559",
  },
  header: {
    hari: "KAMIS",
    tanggal: "22",
    bulan: "01",
    tahun: "2026",
  },
  shipment: {
    skb_do_po_so: "3 0000 62/93",
    nama_tujuan: "KFID TANGERANG",
    jumlah_koli: 196,
    berat_kg: 903,
    volume_cbm: 5.069,
    origin: "NDC 13",
    moda_transportasi: null, // checkbox not clearly marked
    nopol_truk_no_container: "B 9316 SCL",
    nomor_segel_seal: "1887293",
    nama_no_telpon_supir: "ADT",
  },
  pelaksanaan_pengiriman: {
    jenis: null,
    menginap_detail: null,
    relokasi_ke: null,
    dikembalikan_alasan: null,
    disimpan_sementara_detail: null,
  },
  kondisi_kemasan: {
    sesuai_dokumen: "Sesuai",
    keterangan_lain: null,
  },
  signatories: {
    yang_menyerahkan: {
      nama: null, // signature only
      tanggal: "22/01/2026",
      perusahaan: "MKJ",
      no_handphone: null,
    },
    transporter: {
      nama: "ADE F",
      tanggal: "22 Jan 2026",
      perusahaan: "MOSTRANS",
      no_handphone: "085810694532",
    },
    penerima: {
      nama: "Ahmad F.",
      tanggal: "22/1/2026",
      perusahaan: null,
      no_handphone: null,
    },
  },
};