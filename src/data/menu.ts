export type MenuItem = {
  id: string; name: string; kalori: number; protein: number;
  karbo: number; lemak: number; harga: number; kategori: string; emoji: string;
};

export const OPERATIONAL_COST = 5000;

export const menuData: MenuItem[] = [
  { id: "tahu-rebus", name: "Tahu Rebus", kalori: 80, protein: 8, karbo: 2, lemak: 5, harga: 1500, kategori: "Sayuran & Rebus", emoji: "⬜" },
  { id: "tempe-kukus", name: "Tempe Kukus", kalori: 150, protein: 14, karbo: 8, lemak: 8, harga: 2000, kategori: "Sayuran & Rebus", emoji: "🟫" },
  { id: "bayam-bening", name: "Sayur Bayam Bening", kalori: 40, protein: 2, karbo: 6, lemak: 1, harga: 1500, kategori: "Sayuran & Rebus", emoji: "🥬" },
  { id: "buncis-rebus", name: "Buncis Rebus", kalori: 45, protein: 2, karbo: 8, lemak: 0, harga: 1500, kategori: "Sayuran & Rebus", emoji: "🫘" },
  { id: "wortel-rebus", name: "Wortel Rebus", kalori: 40, protein: 1, karbo: 9, lemak: 0, harga: 1500, kategori: "Sayuran & Rebus", emoji: "🥕" },
  { id: "telur-rebus", name: "Telur Rebus", kalori: 70, protein: 6, karbo: 1, lemak: 5, harga: 2000, kategori: "Lauk & Karbo", emoji: "🥚" },
  { id: "ikan-rebus", name: "Ikan Rebus", kalori: 120, protein: 20, karbo: 0, lemak: 4, harga: 4000, kategori: "Lauk & Karbo", emoji: "🐟" },
  { id: "nasi-putih", name: "Nasi Putih", kalori: 200, protein: 4, karbo: 45, lemak: 0, harga: 2000, kategori: "Lauk & Karbo", emoji: "🍚" },
  { id: "nasi-merah", name: "Nasi Merah", kalori: 180, protein: 4, karbo: 40, lemak: 1, harga: 3000, kategori: "Lauk & Karbo", emoji: "🍱" },
  { id: "kentang", name: "Kentang", kalori: 90, protein: 2, karbo: 20, lemak: 0, harga: 2000, kategori: "Lauk & Karbo", emoji: "🥔" },
  { id: "tempe-goreng", name: "Tempe Goreng", kalori: 200, protein: 12, karbo: 10, lemak: 12, harga: 2000, kategori: "Gorengan", emoji: "🟤" },
  { id: "tahu-goreng", name: "Tahu Goreng", kalori: 150, protein: 6, karbo: 4, lemak: 10, harga: 1500, kategori: "Gorengan", emoji: "🟡" },
  { id: "telur-dadar", name: "Telur Dadar", kalori: 120, protein: 7, karbo: 1, lemak: 9, harga: 2500, kategori: "Gorengan", emoji: "🍳" },
  { id: "ikan-goreng", name: "Ikan Goreng", kalori: 200, protein: 20, karbo: 0, lemak: 12, harga: 5000, kategori: "Gorengan", emoji: "🐠" },
  { id: "ayam-goreng", name: "Ayam Goreng", kalori: 250, protein: 25, karbo: 0, lemak: 15, harga: 6000, kategori: "Gorengan", emoji: "🍗" },
  { id: "ayam-rebus-bumbu", name: "Ayam Rebus Berbumbu", kalori: 220, protein: 25, karbo: 2, lemak: 10, harga: 6000, kategori: "Berbumbu", emoji: "🫕" },
  { id: "tumis-kangkung", name: "Tumis Kangkung", kalori: 80, protein: 3, karbo: 7, lemak: 4, harga: 2000, kategori: "Berbumbu", emoji: "🌿" },
  { id: "pisang", name: "Pisang", kalori: 90, protein: 1, karbo: 23, lemak: 0, harga: 2000, kategori: "Buah", emoji: "🍌" },
  { id: "semangka", name: "Semangka", kalori: 30, protein: 1, karbo: 8, lemak: 0, harga: 2000, kategori: "Buah", emoji: "🍉" },
  { id: "pepaya", name: "Pepaya", kalori: 45, protein: 1, karbo: 11, lemak: 0, harga: 2000, kategori: "Buah", emoji: "🟠" },
];

export const kategoriList = ["Semua", "Sayuran & Rebus", "Lauk & Karbo", "Gorengan", "Berbumbu", "Buah"];

export const kategoriColor: Record<string, string> = {
  "Sayuran & Rebus": "#22c55e",
  "Lauk & Karbo": "#f59e0b",
  "Gorengan": "#ef4444",
  "Berbumbu": "#a855f7",
  "Buah": "#ec4899",
};