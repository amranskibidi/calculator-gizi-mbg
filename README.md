# 🍱 MBG Calculator

<div align="center">

![MBG Calculator Banner](https://img.shields.io/badge/MBG-Calculator-2563eb?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPvCfiqE8L3RleHQ+PC9zdmc+)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

**Kalkulator gizi & biaya menu Makan Bergizi Gratis (MBG) dengan sistem ompreng digital drag & drop.**

*Dibangun dengan ❤️ untuk anak Indonesia — by **amranskibidi***

[🚀 Demo Live](#) · [🐛 Laporkan Bug](../../issues) · [💡 Request Fitur](../../issues)

</div>

---

## 📸 Tampilan

```
┌─────────────────────────────────────────────┐
│  🍱 MBG Calculator      [Makan Bergizi Gratis]  🌙 │
├─────────────┬───────────────────────────────┤
│  🧒 Budi    │  👨‍🍳 Chef MBG  │  👧 Siti    │
│  (makan)    │   (masak)      │  (makan)    │
├─────────────┴───────────────────────────────┤
│ MENU              │  🍱 OMPRENG + RINGKASAN  │
│ [Cari makanan...] │  ┌──────────────────┐   │
│ [Semua][Sayur]... │  │  Visual Ompreng  │   │
│ ┌──────┐┌──────┐  │  │  5 Sekat         │   │
│ │🥬 Bayam││🍗Ayam│  │  └──────────────────┘   │
│ └──────┘└──────┘  │  [Isi Ompreng List]      │
│ ┌──────┐┌──────┐  │  [Ringkasan Gizi]        │
│ │🍚 Nasi││🥚Telur│  │  [Harga + Ops Cost]     │
│ └──────┘└──────┘  │                          │
└───────────────────┴──────────────────────────┘
```

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🖱️ **Drag & Drop** | Seret menu langsung ke ompreng digital |
| 🍱 **Ompreng 5 Sekat** | Visual ompreng stainless persis aslinya |
| 📊 **Hitung Gizi Otomatis** | Kalori, protein, karbohidrat, lemak real-time |
| 💰 **Biaya Lengkap** | Harga makanan + biaya operasional Rp 5.000 |
| 🧒👧 **Animasi Karakter** | Budi & Siti makan sambil berterima kasih |
| 👨‍🍳 **Animasi Koki** | Chef MBG masak dengan uap dan sendok berputar |
| 🌙 **Dark / Light Mode** | Toggle tema gelap & terang |
| 📱 **Responsive** | Tampil sempurna di HP, tablet, dan desktop |
| 🔍 **Cari & Filter** | Filter menu per kategori + pencarian nama |
| 🎨 **Font Premium** | Fredoka One + Nunito — bulat & friendly |

---

## 🍽️ Daftar Menu

Menu sudah mencakup **20 pilihan makanan** dari program MBG:

| Kategori | Menu |
|----------|------|
| 🥬 Sayuran & Rebus | Tahu Rebus, Tempe Kukus, Bayam Bening, Buncis, Wortel |
| 🍚 Lauk & Karbo | Telur Rebus, Ikan Rebus, Nasi Putih, Nasi Merah, Kentang |
| 🍳 Gorengan | Tempe Goreng, Tahu Goreng, Telur Dadar, Ikan Goreng, Ayam Goreng |
| 🫕 Berbumbu | Ayam Rebus Berbumbu, Tumis Kangkung |
| 🍌 Buah | Pisang, Semangka, Pepaya |

---

## 🚀 Cara Instalasi & Menjalankan

### Prasyarat

Pastikan sudah terinstal di komputermu:

- [Node.js](https://nodejs.org/) versi **18 ke atas**
- npm (sudah termasuk dalam Node.js)
- Git

Cek versi dengan:
```bash
node --version   # harus v18 atau lebih
npm --version
```

---

### Langkah-langkah

#### 1. Clone Repository

```bash
git clone https://github.com/amranskibidi/mbg-calculator.git
cd mbg-calculator
```

> Atau download ZIP dari tombol **Code → Download ZIP** di GitHub, lalu extract.

---

#### 2. Install Dependencies

```bash
npm install
```

Tunggu hingga selesai (biasanya 1–2 menit).

---

#### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses:

```
http://localhost:3000
```

Selesai! 🎉

---

### Perintah Lainnya

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan server development (hot reload) |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan server production (setelah build) |
| `npm run lint` | Cek error kode dengan ESLint |

---

## 📁 Struktur Proyek

```
mbg-calculator/
├── src/
│   ├── app/
│   │   ├── page.tsx        ← Halaman utama + semua komponen
│   │   ├── layout.tsx      ← Root layout (metadata SEO)
│   │   └── globals.css     ← CSS global + animasi + tema
│   └── data/
│       └── menu.ts         ← Data menu (kalori, protein, harga, dll)
├── tailwind.config.ts      ← Konfigurasi Tailwind CSS
├── tsconfig.json           ← Konfigurasi TypeScript
├── package.json            ← Dependencies & scripts
└── README.md               ← Dokumentasi ini
```

---

## 🧩 Komponen Utama

```
MBGCalculator (page.tsx)
├── ChefAnimation         — Animasi koki masak (SVG animated)
├── KidEating             — Animasi anak sekolah makan (SVG + state)
├── OmprengSVG            — Visual ompreng 5 sekat stainless
├── MenuCard              — Kartu menu draggable + clickable
├── TraySlot              — Item di dalam ompreng (dapat dihapus)
├── NutritionBar          — Bar gizi animasi (protein/karbo/lemak)
└── Footer                — Footer gradient dengan kredit
```

---

## ⚙️ Konfigurasi

### Mengubah Biaya Operasional

Buka `src/data/menu.ts`, ubah nilai ini:

```ts
export const OPERATIONAL_COST = 5000; // ganti angka sesuai kebutuhan
```

### Menambah Menu Baru

Tambahkan objek baru di array `menuData` dalam `src/data/menu.ts`:

```ts
{
  id: "id-unik",
  name: "Nama Makanan",
  kalori: 100,
  protein: 5,
  karbo: 15,
  lemak: 3,
  harga: 2000,
  kategori: "Sayuran & Rebus", // sesuaikan kategori
  emoji: "🥗",
},
```

### Kategori yang Tersedia

```
"Sayuran & Rebus" | "Lauk & Karbo" | "Gorengan" | "Berbumbu" | "Buah"
```

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Next.js](https://nextjs.org/) | 15 | Framework React fullstack |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first styling |
| [Google Fonts](https://fonts.google.com/) | — | Fredoka One + Nunito |

> Tidak ada library animasi pihak ketiga — semua animasi dibuat dengan CSS keyframes murni! 💪

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Berikut caranya:

1. **Fork** repository ini
2. Buat branch baru: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m "Tambah: nama fitur"`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buat **Pull Request**

### Ide Kontribusi

- [ ] Tambah fitur simpan/export ke PDF
- [ ] Tambah lebih banyak menu
- [ ] Fitur rekomendasi menu seimbang
- [ ] Animasi lebih interaktif
- [ ] Versi PWA (bisa diinstall di HP)
- [ ] Dukungan bahasa Inggris

---

## 🐛 Menemukan Bug?

Buka [Issues](../../issues) dan sertakan:
- Deskripsi bug yang jelas
- Langkah untuk mereproduksi bug
- Screenshot jika memungkinkan
- OS dan browser yang digunakan

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **MIT** — bebas digunakan, dimodifikasi, dan didistribusikan.

---

## 🙏 Ucapan Terima Kasih

- 🇮🇩 Program **Makan Bergizi Gratis** Pemerintah Indonesia
- Seluruh anak sekolah Indonesia yang berhak mendapat gizi terbaik
- Komunitas open source Next.js & React

---

<div align="center">

Made with ❤️ by **amranskibidi**

*"Anak Indonesia sehat, Indonesia maju!"* 🍱

⭐ Kalau project ini berguna, jangan lupa kasih **Star** di GitHub ya! ⭐

</div>
