"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { menuData, kategoriList, kategoriColor, OPERATIONAL_COST, MenuItem } from "@/data/menu";

type TrayItem = MenuItem & { trayId: string };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function NutritionBar({ label, value, unit, color, max }: {
  label: string; value: number; unit: string; color: string; max: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="nutrition-bar-wrap">
      <div className="nutrition-bar-header">
        <span className="nutrition-label">{label}</span>
        <span className="nutrition-value" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="nutrition-bar-track">
        <div
          className="nutrition-bar-fill"
          style={{ width: `${pct}%`, background: color, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }}
        />
      </div>
    </div>
  );
}

function MenuCard({ item, onDragStart, onAdd }: {
  item: MenuItem;
  onDragStart: (e: React.DragEvent, item: MenuItem) => void;
  onAdd: (item: MenuItem) => void;
}) {
  const color = kategoriColor[item.kategori] || "#2563eb";
  return (
    <div
      className="menu-card"
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onClick={() => onAdd(item)}
      title="Drag atau klik untuk tambah ke ompreng"
    >
      <div className="menu-card-emoji">{item.emoji}</div>
      <div className="menu-card-info">
        <div className="menu-card-name">{item.name}</div>
        <div className="menu-card-meta">
          <span style={{ color }}>{item.kalori} kal</span>
          <span className="meta-dot">·</span>
          <span className="menu-card-price">{formatRp(item.harga)}</span>
        </div>
        <div className="menu-card-macros">
          <span className="macro-tag protein">P {item.protein}g</span>
          <span className="macro-tag karbo">K {item.karbo}g</span>
          <span className="macro-tag lemak">L {item.lemak}g</span>
        </div>
      </div>
      <div className="menu-card-add">+</div>
    </div>
  );
}

function TraySlot({ item, onRemove, index }: {
  item: TrayItem; onRemove: (trayId: string) => void; index: number;
})
 {
  const color = kategoriColor[item.kategori] || "#2563eb";
  return (
    <div
      className="tray-slot animate-bounce-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span className="tray-slot-emoji">{item.emoji}</span>
      <div className="tray-slot-info">
        <span className="tray-slot-name">{item.name}</span>
        <span className="tray-slot-kal" style={{ color }}>{item.kalori} kal</span>
      </div>
      <button
        className="tray-slot-remove"
        onClick={() => onRemove(item.trayId)}
        title="Hapus"
      >×</button>
    </div>

  );
}

function TrayVisual({ isEmpty }: { isEmpty: boolean }) {
  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ display: "block", marginBottom: 12 }}>
      {}
      <rect x="10" y="20" width="300" height="165" rx="14"
        fill={isEmpty ? "#d0dce8" : "#c8d8e8"} stroke="#8899aa" strokeWidth="2.5"/>
      {}
      <rect x="10" y="20" width="300" height="8" rx="8" fill="#edf2f8" opacity="0.9"/>
      {}
      <rect x="18" y="115" width="284" height="4" rx="2" fill="#aabbcc" opacity="0.7"/>
      {}
      <rect x="160" y="28" width="4" height="90" rx="2" fill="#aabbcc" opacity="0.7"/>
      {}
      <rect x="113" y="119" width="4" height="62" rx="2" fill="#aabbcc" opacity="0.7"/>
      <rect x="207" y="119" width="4" height="62" rx="2" fill="#aabbcc" opacity="0.7"/>
      {}
      <rect x="10" y="20" width="300" height="165" rx="14"
        fill="none" stroke="#6a7f90" strokeWidth="3"/>
      {}
      <path d="M28 23 Q160 18 292 23" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      {}
      {isEmpty ? (
        <text x="160" y="108" textAnchor="middle" fontSize="11" fill="#8899aa" fontStyle="italic">
          Drag makanan ke sini...
        </text>
      ) : null}
      <text x="85" y="74" textAnchor="middle" fontSize="9" fill="#5577aa" opacity="0.7">Karbohidrat</text>
      <text x="235" y="74" textAnchor="middle" fontSize="9" fill="#5577aa" opacity="0.7">Lauk</text>
      <text x="60" y="150" textAnchor="middle" fontSize="8" fill="#5577aa" opacity="0.7">Sayur</text>
      <text x="157" y="150" textAnchor="middle" fontSize="8" fill="#5577aa" opacity="0.7">Tempe/Tahu</text>
      <text x="254" y="150" textAnchor="middle" fontSize="8" fill="#5577aa" opacity="0.7">Buah</text>
    </svg>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: 32, padding: "16px 0 8px",
      borderTop: "2px solid var(--accent-blue)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: 2, marginBottom: 4, fontWeight: 700 }}>
        MBG CALCULATOR
      </div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        Made with <span style={{ color: "#ff6688" }}>❤</span> by{" "}
        <span style={{ color: "var(--accent-cyan)", fontWeight: 800, letterSpacing: 0.5 }}>
          amranskibidi
        </span>
      </div>
    </footer>
  );
}

export default function MBGCalculator() {
  const [dark, setDark] = useState(false);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [kategori, setKategori] = useState("Semua");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const dragItem = useRef<MenuItem | null>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filtered = menuData.filter((m) => {
    const matchKat = kategori === "Semua" || m.kategori === kategori;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchKat && matchSearch;
  });

  const totKalori = tray.reduce((s, i) => s + i.kalori, 0);
  const totProtein = tray.reduce((s, i) => s + i.protein, 0);
  const totKarbo = tray.reduce((s, i) => s + i.karbo, 0);
  const totLemak = tray.reduce((s, i) => s + i.lemak, 0);
  const totHarga = tray.reduce((s, i) => s + i.harga, 0);
  const totalBayar = totHarga + OPERATIONAL_COST;

  const addItem = useCallback((item: MenuItem) => {
    setTray((prev) => [...prev, { ...item, trayId: `${item.id}-${++counterRef.current}` }]);
  }, []);

  const removeItem = useCallback((trayId: string) => {
    setTray((prev) => prev.filter((i) => i.trayId !== trayId));
  }, []);

  const clearTray = () => setTray([]);

  const handleDragStart = (e: React.DragEvent, item: MenuItem) => {
    dragItem.current = item;
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (dragItem.current) {
      addItem(dragItem.current);
      dragItem.current = null;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };

  return (
    <>
      <style>{`
        /* ── Layout ── */
        .app-root {
          min-height: 100vh;
          background: var(--bg-primary);
          transition: background 0.4s ease;
          position: relative;
        }

        .bg-decor {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        }
        .bg-decor-circle1 {
          position: absolute; top: -200px; right: -100px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
        }
        .bg-decor-circle2 {
          position: absolute; bottom: -200px; left: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
        }
        .bg-grid {
          position: absolute; inset: 0; opacity: 0.4;
          background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .app-inner {
          position: relative; z-index: 1;
          max-width: 1400px; margin: 0 auto;
          padding: 0 16px 40px;
        }

        /* ── Header ── */
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0 24px;
          gap: 12px;
        }
        .header-brand {
          display: flex; align-items: center; gap: 14px;
        }
        .header-logo {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #0ea5e9);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 20px rgba(37,99,235,0.4);
          animation: float 4s ease-in-out infinite;
        }
        .header-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 800; letter-spacing: -0.5px;
          color: var(--text-primary);
          line-height: 1;
        }
        .header-sub {
          font-size: 12px; color: var(--text-muted);
          font-weight: 500; margin-top: 3px;
        }
        .header-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: 20px;
          background: var(--accent-blue-pale);
          color: var(--accent-blue-light);
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .dark-toggle {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--bg-card); border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 20px;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .dark-toggle:hover {
          background: var(--accent-blue-pale);
          border-color: var(--accent-blue);
          transform: scale(1.05);
        }

        /* ── Main Grid ── */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr; }
        }

        /* ── Left Panel ── */
        .panel {
          background: var(--bg-card);
          border: 1.5px solid var(--border-light);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .panel-header {
          padding: 18px 20px 0;
        }
        .panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800;
          color: var(--text-primary); margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .panel-title-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #0ea5e9);
        }

        /* Search */
        .search-wrap {
          position: relative; margin-bottom: 12px;
        }
        .search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          font-size: 14px; color: var(--text-muted);
        }
        .search-input {
          width: 100%; padding: 9px 12px 9px 34px;
          border-radius: 10px;
          background: var(--bg-primary);
          border: 1.5px solid var(--border-light);
          color: var(--text-primary); font-size: 13px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s ease; outline: none;
        }
        .search-input:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .search-input::placeholder { color: var(--text-muted); }

        /* Category tabs */
        .cat-tabs {
          display: flex; gap: 6px; overflow-x: auto; padding-bottom: 14px;
          scrollbar-width: none;
        }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab {
          flex-shrink: 0; padding: 6px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 700;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all 0.2s ease; white-space: nowrap;
          background: var(--bg-primary);
          color: var(--text-muted);
          border-color: var(--border-light);
        }
        .cat-tab.active {
          background: var(--accent-blue);
          color: white; border-color: var(--accent-blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.3);
        }
        .cat-tab:hover:not(.active) {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }

        /* Menu grid */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
          padding: 16px 20px 20px;
          max-height: 520px;
          overflow-y: auto;
        }
        @media (max-width: 600px) {
          .menu-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Menu card */
        .menu-card {
          background: var(--bg-primary);
          border: 1.5px solid var(--border-light);
          border-radius: 14px; padding: 12px;
          cursor: grab;
          transition: all 0.2s ease;
          display: flex; flex-direction: column; gap: 8px;
          position: relative; overflow: hidden;
          user-select: none;
        }
        .menu-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.05), transparent);
          opacity: 0; transition: opacity 0.2s ease;
          border-radius: 12px;
        }
        .menu-card:hover {
          border-color: var(--accent-blue);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .menu-card:hover::before { opacity: 1; }
        .menu-card:active { transform: translateY(0) scale(0.98); cursor: grabbing; }

        .menu-card-emoji { font-size: 28px; line-height: 1; }
        .menu-card-info { flex: 1; }
        .menu-card-name { font-size: 12px; font-weight: 700; color: var(--text-primary); line-height: 1.3; margin-bottom: 4px; }
        .menu-card-meta { font-size: 11px; display: flex; align-items: center; gap: 4px; margin-bottom: 5px; font-weight: 600; }
        .meta-dot { color: var(--text-muted); }
        .menu-card-price { color: var(--text-muted); }
        .menu-card-macros { display: flex; gap: 3px; flex-wrap: wrap; }
        .macro-tag { font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 4px; }
        .macro-tag.protein { background: rgba(34,197,94,0.15); color: #16a34a; }
        .macro-tag.karbo { background: rgba(245,158,11,0.15); color: #d97706; }
        .macro-tag.lemak { background: rgba(239,68,68,0.15); color: #dc2626; }
        .dark .macro-tag.protein { background: rgba(34,197,94,0.2); color: #4ade80; }
        .dark .macro-tag.karbo { background: rgba(245,158,11,0.2); color: #fbbf24; }
        .dark .macro-tag.lemak { background: rgba(239,68,68,0.2); color: #f87171; }

        .menu-card-add {
          position: absolute; top: 8px; right: 8px;
          width: 20px; height: 20px; border-radius: 6px;
          background: var(--accent-blue-pale);
          color: var(--accent-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; opacity: 0;
          transition: opacity 0.2s ease;
        }
        .menu-card:hover .menu-card-add { opacity: 1; }

        /* ── Tray Panel ── */
        .tray-panel {
          position: sticky; top: 20px;
        }

        /* Drop zone */
        .drop-zone {
          background: var(--bg-card);
          border: 2px dashed var(--border);
          border-radius: 20px;
          padding: 16px;
          min-height: 200px;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-card);
        }
        .drop-zone.active {
          border-color: var(--accent-blue);
          background: var(--accent-blue-pale);
          animation: drop-pulse 1s ease infinite;
        }

        .tray-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .tray-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px; font-weight: 800;
          color: var(--text-primary);
          display: flex; align-items: center; gap: 8px;
        }
        .tray-count {
          background: var(--accent-blue);
          color: white; font-size: 10px; font-weight: 800;
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .tray-clear {
          font-size: 11px; font-weight: 700;
          color: var(--text-muted); cursor: pointer;
          padding: 4px 8px; border-radius: 6px;
          transition: all 0.2s ease; border: none; background: none;
        }
        .tray-clear:hover { color: #ef4444; background: rgba(239,68,68,0.1); }

        .tray-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 32px 16px; gap: 10px;
          color: var(--text-muted); text-align: center;
        }
        .tray-empty-icon { font-size: 40px; opacity: 0.4; animation: float 3s ease-in-out infinite; }
        .tray-empty-text { font-size: 13px; font-weight: 600; }
        .tray-empty-sub { font-size: 11px; opacity: 0.7; }

        .tray-items { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; max-height: 260px; overflow-y: auto; }

        /* Tray slot */
        .tray-slot {
          display: flex; align-items: center; gap: 8px;
          background: var(--bg-primary);
          border: 1.5px solid var(--border-light);
          border-radius: 10px; padding: 8px 10px;
          transition: all 0.2s ease;
          animation: slide-in-up 0.3s ease;
        }
        .tray-slot:hover { border-color: var(--accent-blue); }
        .tray-slot-emoji { font-size: 18px; flex-shrink: 0; }
        .tray-slot-info { flex: 1; min-width: 0; }
        .tray-slot-name { font-size: 11px; font-weight: 700; color: var(--text-primary); display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tray-slot-kal { font-size: 10px; font-weight: 700; }
        .tray-slot-remove {
          width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
          background: none; border: none; cursor: pointer;
          color: var(--text-muted); font-size: 16px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease;
        }
        .tray-slot-remove:hover { background: rgba(239,68,68,0.15); color: #ef4444; }

        /* Summary card */
        .summary-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-light);
          border-radius: 20px; padding: 18px;
          margin-top: 12px;
          box-shadow: var(--shadow-card);
          transition: background 0.4s ease;
        }
        .summary-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 800;
          color: var(--text-primary); margin-bottom: 14px;
          display: flex; align-items: center; gap: 6px;
        }
        .summary-title-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #0ea5e9);
        }

        /* Nutrition bars */
        .nutrition-bar-wrap { margin-bottom: 10px; }
        .nutrition-bar-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .nutrition-label { font-size: 11px; font-weight: 600; color: var(--text-muted); }
        .nutrition-value { font-size: 11px; font-weight: 800; }
        .nutrition-bar-track {
          height: 6px; background: var(--bg-primary);
          border-radius: 3px; overflow: hidden;
        }
        .nutrition-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s cubic-bezier(.4,0,.2,1); }

        /* Price breakdown */
        .price-breakdown {
          margin-top: 14px; padding-top: 14px;
          border-top: 1.5px solid var(--border-light);
          display: flex; flex-direction: column; gap: 6px;
        }
        .price-row {
          display: flex; justify-content: space-between; align-items: center;
        }
        .price-label { font-size: 12px; color: var(--text-muted); font-weight: 500; }
        .price-value { font-size: 12px; font-weight: 700; color: var(--text-primary); }
        .price-total-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; border-radius: 12px;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
          margin-top: 6px;
        }
        .price-total-label { font-size: 13px; font-weight: 800; color: white; }
        .price-total-value { font-size: 15px; font-weight: 800; color: white; }

        .kalori-big {
          display: flex; align-items: baseline; gap: 4px;
          margin-bottom: 12px;
        }
        .kalori-num {
          font-family: 'Syne', sans-serif;
          font-size: 36px; font-weight: 800;
          background: linear-gradient(135deg, #2563eb, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .kalori-unit { font-size: 14px; font-weight: 700; color: var(--text-muted); }

        /* Empty result */
        .empty-search {
          grid-column: 1 / -1; padding: 40px;
          text-align: center; color: var(--text-muted);
        }
        .empty-search-icon { font-size: 32px; margin-bottom: 10px; }
        .empty-search-text { font-size: 14px; font-weight: 600; }
      `}</style>

      <div className="app-root">
        <div className="bg-decor">
          <div className="bg-grid" />
          <div className="bg-decor-circle1" />
          <div className="bg-decor-circle2" />
        </div>

        <div className="app-inner">
          {}
          <header className="header">
            <div className="header-brand">
              <div className="header-logo">🍱</div>
              <div>
                <div className="header-title">MBG Calculator</div>
                <div className="header-sub">
                  <span className="header-badge">🏫 Makan Bergizi Gratis</span>
                </div>
              </div>
            </div>
            <button className="dark-toggle" onClick={() => setDark((d) => !d)}>
              {dark ? "☀️" : "🌙"}
            </button>
          </header>

          {}
          <div className="main-grid">
            {}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">
                  <span className="panel-title-dot" />
                  Pilih Menu — Drag atau Klik ke Ompreng
                </div>

                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    placeholder="Cari makanan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setActiveSearch(true)}
                    onBlur={() => setActiveSearch(false)}
                  />
                </div>

                <div className="cat-tabs">
                  {kategoriList.map((k) => (
                    <button
                      key={k}
                      className={`cat-tab ${kategori === k ? "active" : ""}`}
                      onClick={() => setKategori(k)}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="menu-grid">
                {filtered.length === 0 ? (
                  <div className="empty-search">
                    <div className="empty-search-icon">🔍</div>
                    <div className="empty-search-text">Tidak ada menu ditemukan</div>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onDragStart={handleDragStart}
                      onAdd={addItem}
                    />
                  ))
                )}
              </div>
            </div>

            {}
            <div className="tray-panel">
              {}
              <div
                className={`drop-zone ${dragOver ? "active" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div className="tray-header">
                  <div className="tray-title">
                    🥡 Omprengmu
                    <div className="tray-count">{tray.length}</div>
                  </div>
                  {tray.length > 0 && (
                    <button className="tray-clear" onClick={clearTray}>Kosongkan</button>
                  )}
                </div>

                {tray.length === 0 ? (
                  <div className="tray-empty">
                    <div className="tray-empty-icon">🍽️</div>
                    <div className="tray-empty-text">Ompreng masih kosong</div>
                    <div className="tray-empty-sub">Drag atau klik menu untuk menambah</div>
                  </div>
                ) : (
                  <div className="tray-items">
                    {tray.map((item, i) => (
                      <TraySlot key={item.trayId} item={item} onRemove={removeItem} index={i} />
                    ))}
                  </div>
                )}

                {dragOver && (
                  <div style={{ textAlign: "center", padding: "8px", color: "var(--accent-blue)", fontSize: 13, fontWeight: 700 }}>
                    ✨ Lepaskan untuk tambah!
                  </div>
                )}
              </div>

              {}
              <div className="summary-card">
                <div className="summary-title">
                  <span className="summary-title-dot" />
                  Ringkasan Gizi
                </div>

                <div className="kalori-big">
                  <span className="kalori-num">{totKalori}</span>
                  <span className="kalori-unit">kkal total</span>
                </div>

                <NutritionBar label="Protein" value={totProtein} unit="g" color="#22c55e" max={60} />
                <NutritionBar label="Karbohidrat" value={totKarbo} unit="g" color="#f59e0b" max={150} />
                <NutritionBar label="Lemak" value={totLemak} unit="g" color="#ef4444" max={70} />

                <div className="price-breakdown">
                  <div className="price-row">
                    <span className="price-label">🍽️ Harga Makanan</span>
                    <span className="price-value">{formatRp(totHarga)}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">⚙️ Biaya Operasional</span>
                    <span className="price-value">{formatRp(OPERATIONAL_COST)}</span>
                  </div>
                  <div className="price-total-row">
                    <span className="price-total-label">💳 Total Bayar</span>
                    <span className="price-total-value">{formatRp(totalBayar)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
