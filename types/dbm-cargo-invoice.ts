// types/dbm-cargo-invoice.ts
// Template for DBM Cargo & Logistics - Invoice
// Website: www.dbmcargo.com

// ─────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────

export type JenisLayanan = "REG" | "ONS" | null;

// ─────────────────────────────────────────────
// Sub-types
// ─────────────────────────────────────────────

export interface InvoiceItem {
  no: number;
  tanggal: string | null;         // format: DD/MM/YYYY or DD/MM/YYY
  no_awb: string | null;          // e.g. "965097"
  jenis: JenisLayanan;            // "REG" or "ONS"
  dest: string | null;            // e.g. "BTJ"

  barang: {
    kg: number | null;
    tarif: number | null;
    jumlah: number | null;
  };

  packing: {
    kg: number | null;
    tarif: number | null;
    jumlah: number | null;
  };

  lain_lain: number | null;
  total: number | null;
}

export interface TransferInfo {
  nama_bank: string | null;       // e.g. "BNI CABANG SOEKARNO - HATTA"
  nama_perusahaan: string | null; // e.g. "PT. DHARMA BANDAR MANDALA JAKA"
  no_rekening: string | null;     // e.g. "196.94667"
}

// ─────────────────────────────────────────────
// Main Document Type
// ─────────────────────────────────────────────

export interface DbmCargoInvoice {
  // ── Header ─────────────────────────────────
  header: {
    no_invoice: string | null;    // e.g. "DTD-JKT-INV-2025-0003680"
    tanggal: string | null;       // e.g. "15-JANUARI-2026"
    jatuh_tempo: string | null;   // e.g. "14-FEBRUARI-2026"
  };

  // ── Recipient ──────────────────────────────
  to: {
    nama: string | null;          // e.g. "ENSEVAL PUTERA MEGATRADING TBK"
    alamat: string | null;        // full address
  };

  // ── Transfer Info ──────────────────────────
  transfer: TransferInfo;

  // ── Line Items ─────────────────────────────
  items: InvoiceItem[];

  // ── Summary ────────────────────────────────
  summary: {
    gross_barang: number | null;  // e.g. 13877000
    gross_packing: number | null; // e.g. 788000
    gross_total: number | null;   // e.g. 14665000
    discount: number | null;      // e.g. 0
    netto: number | null;         // e.g. 14665000
    ppn_persen: number | null;    // e.g. 1.1
    ppn_nominal: number | null;   // e.g. 161315
    materai: number | null;       // e.g. 10000
    total: number | null;         // e.g. 14836315
  };

  // ── Terbilang ──────────────────────────────
  terbilang: string | null; // e.g. "Empat Belas Juta Delapan Ratus..."
}

// ─────────────────────────────────────────────
// Empty Template
// ─────────────────────────────────────────────

export const emptyDbmCargoInvoice: DbmCargoInvoice = {
  header: {
    no_invoice: null,
    tanggal: null,
    jatuh_tempo: null,
  },
  to: {
    nama: null,
    alamat: null,
  },
  transfer: {
    nama_bank: null,
    nama_perusahaan: null,
    no_rekening: null,
  },
  items: [],
  summary: {
    gross_barang: null,
    gross_packing: null,
    gross_total: null,
    discount: null,
    netto: null,
    ppn_persen: null,
    ppn_nominal: null,
    materai: null,
    total: null,
  },
  terbilang: null,
};

// ─────────────────────────────────────────────
// Sample Output (based on uploaded document)
// ─────────────────────────────────────────────

export const sampleDbmCargoInvoice: DbmCargoInvoice = {
  header: {
    no_invoice: "DTD-JKT-INV-2025-0003680",
    tanggal: "15-JANUARI-2026",
    jatuh_tempo: "14-FEBRUARI-2026",
  },
  to: {
    nama: "ENSEVAL PUTERA MEGATRADING TBK",
    alamat:
      "PULO LENTUT, KAWASAN INDUSTRI BLOK 000 NO.10 RT:000 RW:000 KEL.PULO GADUNG KEC.CAKUNG KOTA/KAB.JAKARTA TIMUR DKI JAKARTA RAYA 13920",
  },
  transfer: {
    nama_perusahaan: "PT. DHARMA BANDAR MANDALA JAKA",
    no_rekening: "196.94667",
    nama_bank: "BNI CABANG SOEKARNO - HATTA",
  },
  items: [
    { no: 1,  tanggal: "03/11/202", no_awb: "965097", jenis: "REG", dest: "BTJ", barang: { kg: 4,  tarif: 37000, jumlah: 148000   }, packing: { kg: 1,  tarif: 4000, jumlah: 4000   }, lain_lain: null, total: 152000   },
    { no: 2,  tanggal: "04/11/202", no_awb: "965122", jenis: "REG", dest: "BTJ", barang: { kg: 74, tarif: 37000, jumlah: 2738000  }, packing: { kg: 27, tarif: 4000, jumlah: 108000 }, lain_lain: null, total: 2846000  },
    { no: 3,  tanggal: "05/11/202", no_awb: "973372", jenis: "REG", dest: "BTJ", barang: { kg: 64, tarif: 37000, jumlah: 2368000  }, packing: { kg: 36, tarif: 4000, jumlah: 144000 }, lain_lain: null, total: 2512000  },
    { no: 4,  tanggal: "05/11/202", no_awb: "973373", jenis: "ONS", dest: "BTJ", barang: { kg: 73, tarif: 41000, jumlah: 2993000  }, packing: { kg: 52, tarif: 4000, jumlah: 208000 }, lain_lain: null, total: 3201000  },
    { no: 5,  tanggal: "15/11/202", no_awb: "973278", jenis: "REG", dest: "BTJ", barang: { kg: 11, tarif: 37000, jumlah: 407000   }, packing: { kg: 4,  tarif: 4000, jumlah: 16000  }, lain_lain: null, total: 423000   },
    { no: 6,  tanggal: "18/11/202", no_awb: "976374", jenis: "REG", dest: "BTJ", barang: { kg: 20, tarif: 37000, jumlah: 740000   }, packing: { kg: 10, tarif: 4000, jumlah: 40000  }, lain_lain: null, total: 780000   },
    { no: 7,  tanggal: "20/11/202", no_awb: "976475", jenis: "REG", dest: "BTJ", barang: { kg: 5,  tarif: 37000, jumlah: 185000   }, packing: { kg: 1,  tarif: 4000, jumlah: 4000   }, lain_lain: null, total: 189000   },
    { no: 8,  tanggal: "22/11/202", no_awb: "980333", jenis: "REG", dest: "BTJ", barang: { kg: 4,  tarif: 37000, jumlah: 148000   }, packing: { kg: 1,  tarif: 4000, jumlah: 4000   }, lain_lain: null, total: 152000   },
    { no: 9,  tanggal: "25/11/202", no_awb: "980428", jenis: "REG", dest: "BTJ", barang: { kg: 36, tarif: 37000, jumlah: 1332000  }, packing: { kg: 28, tarif: 4000, jumlah: 112000 }, lain_lain: null, total: 1444000  },
    { no: 10, tanggal: "27/11/202", no_awb: "982318", jenis: "ONS", dest: "BTJ", barang: { kg: 37, tarif: 41000, jumlah: 1517000  }, packing: { kg: 30, tarif: 4000, jumlah: 120000 }, lain_lain: null, total: 1637000  },
    { no: 11, tanggal: "27/11/202", no_awb: "982319", jenis: "ONS", dest: "BTJ", barang: { kg: 20, tarif: 41000, jumlah: 820000   }, packing: { kg: 1,  tarif: 4000, jumlah: 4000   }, lain_lain: null, total: 824000   },
    { no: 12, tanggal: "28/11/202", no_awb: "980459", jenis: "REG", dest: "BTJ", barang: { kg: 13, tarif: 37000, jumlah: 481000   }, packing: { kg: 6,  tarif: 4000, jumlah: 24000  }, lain_lain: null, total: 505000   },
  ],
  summary: {
    gross_barang: 13877000,
    gross_packing: 788000,
    gross_total: 14665000,
    discount: 0,
    netto: 14665000,
    ppn_persen: 1.1,
    ppn_nominal: 161315,
    materai: 10000,
    total: 14836315,
  },
  terbilang:
    "Empat Belas Juta Delapan Ratus Tiga Puluh Enam Ribu Tiga Ratus Lima Belas Rupiah",
};