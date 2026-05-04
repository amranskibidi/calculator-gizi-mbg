"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { menuData, kategoriList, kategoriColor, OPERATIONAL_COST, MenuItem } from "@/data/menu";

type TrayItem = MenuItem & { trayId: string };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function ChefAnimation() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, userSelect:"none" }}>
      <style>{`
        .chef-body { animation: cookBounce 1.5s ease-in-out infinite; }
        .chef-arm-stir { animation: stirPot 1.2s linear infinite; transform-origin: 72px 108px; }
        .chef-arm-wave { animation: waveHand 1.4s ease-in-out infinite; transform-origin: 28px 96px; }
        .chef-head { animation: nod 2s ease-in-out infinite; transform-origin: 50px 55px; }
        .steam-a { animation: steam1 1.8s ease-out infinite; }
        .steam-b { animation: steam2 1.8s ease-out infinite 0.4s; }
        .steam-c { animation: steam1 1.8s ease-out infinite 0.9s; }
        .star-spin { animation: starSpin 3s linear infinite; transform-origin: 12px 12px; }
      `}</style>
      <svg width="110" height="140" viewBox="0 0 110 140" style={{ overflow:"visible" }}>
        {}
        <g style={{ transformBox:"fill-box" }}>
          <ellipse className="steam-a" cx="68" cy="116" rx="4" ry="3" fill="#93c5fd" opacity="0.7"/>
          <ellipse className="steam-b" cx="76" cy="114" rx="3" ry="2.5" fill="#bfdbfe" opacity="0.6"/>
          <ellipse className="steam-c" cx="60" cy="118" rx="3.5" ry="2.5" fill="#93c5fd" opacity="0.5"/>
        </g>

        <g className="chef-body">
          {}
          <rect x="30" y="10" width="44" height="28" rx="4" fill="white" stroke="#ddd" strokeWidth="1"/>
          <rect x="22" y="34" width="60" height="8" rx="4" fill="white" stroke="#ddd" strokeWidth="1"/>
          {}
          <g className="chef-head">
            <ellipse cx="52" cy="60" rx="24" ry="24" fill="#FBBF24"/>
            {}
            <path d="M42 56 Q45 52 48 56" fill="none" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M56 56 Q59 52 62 56" fill="none" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round"/>
            {}
            <ellipse cx="39" cy="61" rx="5" ry="3" fill="#fca5a5" opacity="0.7"/>
            <ellipse cx="65" cy="61" rx="5" ry="3" fill="#fca5a5" opacity="0.7"/>
            {}
            <path d="M43 67 Q52 76 61 67" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round"/>
            {}
            <path d="M44 64 Q52 68 60 64" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          {}
          <rect x="28" y="82" width="48" height="44" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
          {}
          <circle cx="52" cy="94" r="2.5" fill="#d1d5db"/>
          <circle cx="52" cy="104" r="2.5" fill="#d1d5db"/>
          <circle cx="52" cy="114" r="2.5" fill="#d1d5db"/>
          {}
          <rect x="38" y="90" width="28" height="36" rx="4" fill="#dc2626" opacity="0.85"/>
          <rect x="46" y="82" width="12" height="12" rx="3" fill="#dc2626" opacity="0.75"/>
          {}
          <rect x="34" y="122" width="14" height="16" rx="5" fill="#1e3a5f"/>
          <rect x="56" y="122" width="14" height="16" rx="5" fill="#1e3a5f"/>
          {}
          <ellipse cx="41" cy="138" rx="10" ry="5" fill="#111"/>
          <ellipse cx="63" cy="138" rx="10" ry="5" fill="#111"/>
          {}
          <g className="chef-arm-wave" style={{ transformBox:"fill-box" }}>
            <rect x="10" y="88" width="12" height="28" rx="5" fill="#FBBF24"/>
            <circle cx="16" cy="118" r="7" fill="#FBBF24"/>
          </g>
          {}
          <g className="chef-arm-stir" style={{ transformBox:"fill-box" }}>
            <rect x="74" y="90" width="12" height="22" rx="5" fill="#FBBF24"/>
            <circle cx="80" cy="114" r="7" fill="#FBBF24"/>
            {}
            <line x1="80" y1="108" x2="80" y2="90" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"/>
            <ellipse cx="80" cy="88" rx="5" ry="4" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1"/>
          </g>
        </g>

        {}
        <ellipse cx="76" cy="130" rx="22" ry="8" fill="#6b7280"/>
        <rect x="54" y="118" width="44" height="16" rx="5" fill="#9ca3af"/>
        <ellipse cx="76" cy="118" rx="22" ry="7" fill="#d1d5db"/>
        <ellipse cx="76" cy="118" rx="16" ry="5" fill="#f9fafb" opacity="0.6"/>
        {}
        <rect x="96" y="120" width="12" height="6" rx="3" fill="#6b7280"/>
        <rect x="43" y="120" width="12" height="6" rx="3" fill="#6b7280"/>

        {}
        <g className="star-spin" style={{ transformBox:"fill-box", transform:"translate(6px, 30px)" }}>
          <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z"
            fill="#fbbf24" opacity="0.9"/>
        </g>
      </svg>
      <div style={{
        background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
        color:"white", fontSize:10, fontWeight:800,
        padding:"3px 10px", borderRadius:20, marginTop:2,
        fontFamily:"'Fredoka One',cursive", letterSpacing:0.5,
      }}>Chef MBG</div>
    </div>
  );
}

function KidEating({ side, name, quote }: { side:"left"|"right"; name: string; quote: string }) {
  const [frame, setFrame] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f+1)%4), 400);
    setTimeout(() => setShowQuote(true), 800);
    return () => clearInterval(t);
  }, []);

  const isLeft = side === "left";
  const mouthOpen = frame % 2 === 0;

  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", gap:6,
      animation: "slideInLeft 0.6s ease forwards",
      animationName: isLeft ? "slideInLeft" : "slideInRight",
    }}>
      {}
      {showQuote && (
        <div className="animate-speak" style={{
          background:"white",
          border:"2px solid #3b82f6",
          borderRadius:14, padding:"6px 10px",
          fontSize:10, fontWeight:800, color:"#1e40af",
          maxWidth:140, textAlign:"center", lineHeight:1.4,
          boxShadow:"0 4px 12px rgba(59,130,246,0.2)",
          position:"relative",
          fontFamily:"'Nunito',sans-serif",
          animation:"popIn 0.4s ease forwards",
        }}>
          {quote}
          <div style={{
            position:"absolute", bottom:-10,
            left: isLeft ? 20 : "auto", right: isLeft ? "auto" : 20,
            width:0, height:0,
            borderLeft:"8px solid transparent",
            borderRight:"8px solid transparent",
            borderTop:"10px solid #3b82f6",
          }}/>
        </div>
      )}

      {}
      <svg width="90" height="130" viewBox="0 0 90 130" style={{ overflow:"visible" }}>
        <style>{`
          .kid-body-${side} { animation: happyBounce 1.3s ease-in-out infinite; }
          .spoon-${side} { animation: spoonUp 1.2s ease-in-out infinite; }
          .kid-head-${side} { animation: chew 0.8s ease-in-out infinite; }
        `}</style>
        <g className={`kid-body-${side}`}>
          {}
          <rect x="28" y="100" width="12" height="28" rx="5" fill={isLeft ? "#3b82f6" : "#7c3aed"}/>
          <rect x="50" y="100" width="12" height="28" rx="5" fill={isLeft ? "#3b82f6" : "#7c3aed"}/>
          <ellipse cx="34" cy="128" rx="10" ry="5" fill="#1a1a2e"/>
          <ellipse cx="56" cy="128" rx="10" ry="5" fill="#1a1a2e"/>
          {}
          <rect x="22" y="62" width="46" height="44" rx="8"
            fill={isLeft ? "white" : "white"} stroke="#e5e7eb" strokeWidth="1"/>
          {}
          <path d={isLeft
            ? "M42 62 L48 62 L45 80 Z"
            : "M42 62 L48 62 L45 80 Z"}
            fill={isLeft ? "#dc2626" : "#7c3aed"} opacity="0.9"/>
          {}
          {isLeft && (
            <rect x="64" y="68" width="16" height="22" rx="4" fill="#f97316" stroke="#ea580c" strokeWidth="0.5"/>
          )}
          {}
          <g className={`kid-head-${side}`}>
            <ellipse cx="45" cy="40" rx="22" ry="24"
              fill={isLeft ? "#FBBF24" : "#f9a8d4"}/>
            {}
            {isLeft ? (
              <path d="M23 36 Q24 16 45 14 Q66 16 67 36 Q60 24 45 22 Q30 24 23 36" fill="#1a0a00"/>
            ) : (
              <>
                <path d="M23 36 Q24 16 45 14 Q66 16 67 36 Q60 24 45 22 Q30 24 23 36" fill="#7c2d12"/>
                {}
                <path d="M24 30 Q45 22 66 30" fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="64" cy="30" r="5" fill="#f472b6"/>
              </>
            )}
            {}
            <path d="M34 38 Q37 34 40 38" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 38 Q53 34 56 38" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round"/>
            {}
            <ellipse cx="30" cy="43" rx="5" ry="3.5" fill="#fca5a5" opacity="0.7"/>
            <ellipse cx="60" cy="43" rx="5" ry="3.5" fill="#fca5a5" opacity="0.7"/>
            {}
            {mouthOpen ? (
              <ellipse cx="45" cy="50" rx="7" ry="5" fill="#b45309"/>
            ) : (
              <path d="M38 48 Q45 56 52 48" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round"/>
            )}
          </g>
          {}
          <g>
            <rect x="4" y="70" width="12" height="26" rx="5"
              fill={isLeft ? "#FBBF24" : "#f9a8d4"}
              transform={isLeft ? "rotate(15 10 70)" : "rotate(-15 16 70)"}/>
            {}
            <rect x={isLeft ? "-8" : "74"} y="80" width="28" height="20" rx="5"
              fill="#c8d8e8" stroke="#8899aa" strokeWidth="1.2"/>
            <line x1={isLeft ? "-3" : "79"} y1="90" x2={isLeft ? "15" : "97"} y2="90" stroke="#aabbcc" strokeWidth="0.8"/>
            <rect x={isLeft ? "-8" : "74"} y="80" width="28" height="4" rx="3" fill="#ddeeff" opacity="0.7"/>
          </g>
          {}
          <g className={`spoon-${side}`} style={{ transformBox:"fill-box" }}>
            <rect x={isLeft ? "68" : "12"} y="65" width="11" height="26" rx="5"
              fill={isLeft ? "#FBBF24" : "#f9a8d4"}/>
            {}
            <line x1={isLeft ? "73" : "17"} y1="62" x2={isLeft ? "73" : "17"} y2="48"
              stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx={isLeft ? "73" : "17"} cy="46" rx="4" ry="3.5"
              fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.8"/>
            {}
            <ellipse cx={isLeft ? "73" : "17"} cy="46" rx="3" ry="2.5" fill="#fef3c7"/>
          </g>
        </g>
        {}
        <circle cx={isLeft ? "12" : "78"} cy="20" r="3" fill="#fbbf24"
          style={{ animation:"pulse 1.5s ease infinite" }}/>
        <circle cx={isLeft ? "6" : "84"} cy="35" r="2" fill="#a78bfa"
          style={{ animation:"pulse 2s ease infinite 0.5s" }}/>
      </svg>
      <div style={{
        fontSize:11, fontWeight:800, color:"var(--accent-blue)",
        fontFamily:"'Fredoka One',cursive",
      }}>{name}</div>
    </div>
  );
}

function OmprengSVG({ tray }: { tray: TrayItem[] }) {
  const isEmpty = tray.length === 0;
  const slots = [
    tray.find(i => i.kategori === "Lauk & Karbo" && i.name.toLowerCase().includes("nasi")),
    tray.find(i => ["Gorengan","Berbumbu","Lauk & Karbo"].includes(i.kategori) && !i.name.toLowerCase().includes("nasi")),
    tray.find(i => i.kategori === "Sayuran & Rebus"),
    tray.find(i => ["Gorengan","Berbumbu"].includes(i.kategori)),
    tray.find(i => i.kategori === "Buah"),
  ];

  const slotColors = ["#f5f0dc","#d4a574","#a8e6a8","#f0d090","#f8b4b4"];
  const slotLabels = ["Karbohidrat","Lauk Utama","Sayuran","Lauk Tambahan","Buah"];

  return (
    <div className="animate-ompreng-fly" style={{ width:"100%" }}>
      <svg viewBox="0 0 340 220" width="100%" style={{ display:"block" }}>
        {}
        <ellipse cx="170" cy="215" rx="150" ry="8" fill="#8899aa" opacity="0.18"/>
        {}
        <rect x="10" y="18" width="320" height="192" rx="16" fill="url(#tray-g)" stroke="#7a8fa0" strokeWidth="2.5"/>
        <defs>
          <linearGradient id="tray-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2ecf6"/>
            <stop offset="50%" stopColor="#c8d8ea"/>
            <stop offset="100%" stopColor="#a8b8c8"/>
          </linearGradient>
          <pattern id="steel-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#b8c8d8" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        <rect x="10" y="18" width="320" height="192" rx="16" fill="url(#steel-hatch)" opacity="0.5"/>

        {}
        <path d="M28 21 Q170 16 312 21" fill="none" stroke="white" strokeWidth="1.8" opacity="0.7"/>
        <rect x="10" y="18" width="320" height="7" rx="7" fill="white" opacity="0.6"/>
        <rect x="10" y="18" width="7" height="192" rx="7" fill="white" opacity="0.4"/>

        {}
        <rect x="18" y="124" width="304" height="4" rx="2" fill="#9aabb8" opacity="0.7"/>
        <rect x="18" y="126" width="304" height="1.5" rx="1" fill="white" opacity="0.4"/>

        {}
        <rect x="163" y="24" width="4" height="100" rx="2" fill="#9aabb8" opacity="0.7"/>
        <rect x="165" y="24" width="1.5" height="100" rx="1" fill="white" opacity="0.4"/>

        {}
        <rect x="114" y="128" width="4" height="78" rx="2" fill="#9aabb8" opacity="0.7"/>
        <rect x="116" y="128" width="1.5" height="78" rx="1" fill="white" opacity="0.4"/>
        <rect x="223" y="128" width="4" height="78" rx="2" fill="#9aabb8" opacity="0.7"/>
        <rect x="225" y="128" width="1.5" height="78" rx="1" fill="white" opacity="0.4"/>

        {}
        {}
        <rect x="18" y="24" width="143" height="100" rx="4"
          fill={slots[0] ? "#f5f0dc" : "transparent"} opacity={slots[0] ? 0.75 : 0}/>
        {slots[0] && (
          <>
            <ellipse cx="89" cy="74" rx="52" ry="28" fill="#fffce8" opacity="0.7"/>
            <text x="89" y="78" textAnchor="middle" fontSize="20">{slots[0].emoji}</text>
          </>
        )}
        <text x="89" y="36" textAnchor="middle" fontSize="8" fill={slots[0] ? "#446688" : "#8899aa"} fontWeight="700">{slotLabels[0]}</text>
        {!slots[0] && <text x="89" y="78" textAnchor="middle" fontSize="8" fill="#aabbcc" fontStyle="italic">kosong</text>}

        {}
        <rect x="169" y="24" width="153" height="100" rx="4"
          fill={slots[1] ? "#ffe4c4" : "transparent"} opacity={slots[1] ? 0.5 : 0}/>
        {slots[1] && (
          <text x="245" y="82" textAnchor="middle" fontSize="28">{slots[1].emoji}</text>
        )}
        <text x="245" y="36" textAnchor="middle" fontSize="8" fill={slots[1] ? "#446688" : "#8899aa"} fontWeight="700">{slotLabels[1]}</text>
        {!slots[1] && <text x="245" y="82" textAnchor="middle" fontSize="8" fill="#aabbcc" fontStyle="italic">kosong</text>}

        {}
        <rect x="18" y="130" width="94" height="76" rx="4"
          fill={slots[2] ? "#c8f0c0" : "transparent"} opacity={slots[2] ? 0.55 : 0}/>
        {slots[2] && (
          <text x="65" y="175" textAnchor="middle" fontSize="22">{slots[2].emoji}</text>
        )}
        <text x="65" y="142" textAnchor="middle" fontSize="7.5" fill={slots[2] ? "#446688" : "#8899aa"} fontWeight="700">{slotLabels[2]}</text>
        {!slots[2] && <text x="65" y="175" textAnchor="middle" fontSize="8" fill="#aabbcc" fontStyle="italic">kosong</text>}

        {}
        <rect x="120" y="130" width="101" height="76" rx="4"
          fill={slots[3] ? "#fde8a0" : "transparent"} opacity={slots[3] ? 0.5 : 0}/>
        {slots[3] && (
          <text x="170" y="175" textAnchor="middle" fontSize="22">{slots[3].emoji}</text>
        )}
        <text x="170" y="142" textAnchor="middle" fontSize="7.5" fill={slots[3] ? "#446688" : "#8899aa"} fontWeight="700">{slotLabels[3]}</text>
        {!slots[3] && <text x="170" y="175" textAnchor="middle" fontSize="8" fill="#aabbcc" fontStyle="italic">kosong</text>}

        {}
        <rect x="229" y="130" width="93" height="76" rx="4"
          fill={slots[4] ? "#ffd0e8" : "transparent"} opacity={slots[4] ? 0.55 : 0}/>
        {slots[4] && (
          <text x="275" y="175" textAnchor="middle" fontSize="22">{slots[4].emoji}</text>
        )}
        <text x="275" y="142" textAnchor="middle" fontSize="7.5" fill={slots[4] ? "#446688" : "#8899aa"} fontWeight="700">{slotLabels[4]}</text>
        {!slots[4] && <text x="275" y="175" textAnchor="middle" fontSize="8" fill="#aabbcc" fontStyle="italic">kosong</text>}

        {}
        <rect x="10" y="18" width="320" height="192" rx="16"
          fill="none" stroke="#6a7f90" strokeWidth="2.5"/>

        {}
        {isEmpty && (
          <text x="170" y="116" textAnchor="middle" fontSize="11" fill="#aabbcc" fontStyle="italic">
            ← Drag & drop makanan ke sini →
          </text>
        )}
      </svg>
    </div>
  );
}

function NutritionBar({ label, value, unit, color, max }: {
  label:string; value:number; unit:string; color:string; max:number;
}) {
  const pct = Math.min((value/max)*100, 100);
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", fontFamily:"'Nunito',sans-serif" }}>{label}</span>
        <span style={{ fontSize:12, fontWeight:900, color, fontFamily:"'Fredoka One',cursive" }}>{value}{unit}</span>
      </div>
      <div style={{ height:8, background:"var(--bg-primary)", borderRadius:4, overflow:"hidden" }}>
        <div style={{
          height:"100%", width:`${pct}%`, background:color, borderRadius:4,
          transition:"width 0.7s cubic-bezier(.4,0,.2,1)",
          boxShadow:`0 0 8px ${color}66`,
        }}/>
      </div>
    </div>
  );
}

function MenuCard({ item, onDragStart, onAdd }: {
  item: MenuItem;
  onDragStart: (e: React.DragEvent, i: MenuItem) => void;
  onAdd: (i: MenuItem) => void;
}) {
  const [hov, setHov] = useState(false);
  const col = kategoriColor[item.kategori] || "#2563eb";
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, item)}
      onClick={() => onAdd(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--accent-blue-pale)" : "var(--bg-primary)",
        border:`1.5px solid ${hov ? "var(--accent-blue)" : "var(--border-light)"}`,
        borderRadius:14, padding:"10px 10px 8px", cursor:"grab",
        transition:"all 0.2s ease",
        transform: hov ? "translateY(-3px) scale(1.02)" : "none",
        boxShadow: hov ? "var(--shadow-md)" : "none",
        userSelect:"none", position:"relative",
        display:"flex", flexDirection:"column", gap:6,
      }}
    >
      <div style={{ fontSize:26, lineHeight:1 }}>{item.emoji}</div>
      <div style={{ fontSize:11, fontWeight:800, color:"var(--text-primary)", lineHeight:1.3, fontFamily:"'Nunito',sans-serif" }}>
        {item.name}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700 }}>
        <span style={{ color: col, fontFamily:"'Fredoka One',cursive" }}>{item.kalori} kal</span>
        <span style={{ color:"var(--text-muted)" }}>·</span>
        <span style={{ color:"var(--text-muted)" }}>{formatRp(item.harga)}</span>
      </div>
      <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
        {[
          { t:`P ${item.protein}g`, bg:"rgba(34,197,94,0.15)", c:"#16a34a" },
          { t:`K ${item.karbo}g`, bg:"rgba(245,158,11,0.15)", c:"#d97706" },
          { t:`L ${item.lemak}g`, bg:"rgba(239,68,68,0.15)", c:"#dc2626" },
        ].map(m => (
          <span key={m.t} style={{ fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:4, background:m.bg, color:m.c }}>
            {m.t}
          </span>
        ))}
      </div>
      {hov && (
        <div style={{
          position:"absolute", top:7, right:7, width:22, height:22, borderRadius:7,
          background:"var(--accent-blue)", color:"white",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:15, fontWeight:900, boxShadow:"0 2px 8px rgba(37,99,235,0.4)",
        }}>+</div>
      )}
    </div>
  );
}

function TraySlot({ item, onRemove }: { item: TrayItem; onRemove:(id:string)=>void }) {
  const col = kategoriColor[item.kategori] || "#2563eb";
  return (
    <div className="animate-bounce-in" style={{
      display:"flex", alignItems:"center", gap:8,
      background:"var(--bg-primary)", border:"1.5px solid var(--border-light)",
      borderRadius:10, padding:"7px 10px",
    }}>
      <span style={{ fontSize:17, flexShrink:0 }}>{item.emoji}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--text-primary)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontFamily:"'Nunito',sans-serif" }}>
          {item.name}
        </div>
        <div style={{ fontSize:10, fontWeight:800, color:col, fontFamily:"'Fredoka One',cursive" }}>{item.kalori} kal</div>
      </div>
      <button onClick={() => onRemove(item.trayId)} style={{
        width:22, height:22, borderRadius:6, flexShrink:0,
        background:"none", border:"none", cursor:"pointer",
        color:"var(--text-muted)", fontSize:16, fontWeight:900,
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"all 0.15s",
      }}
        onMouseEnter={e => { e.currentTarget.style.color="#ef4444"; e.currentTarget.style.background="rgba(239,68,68,.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.color="var(--text-muted)"; e.currentTarget.style.background="none"; }}
      >×</button>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop:40,
      background:"linear-gradient(135deg,#0a1628,#1a2e4a,#0a1628)",
      backgroundSize:"200% 200%",
      animation:"gradShift 6s ease infinite",
      borderRadius:"20px 20px 0 0",
      padding:"28px 24px 20px",
      textAlign:"center",
      borderTop:"3px solid #2563eb",
      position:"relative",
      overflow:"hidden",
    }}>
      {}
      {[...Array(12)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${8 + i*8}%`, top:`${15 + (i%4)*20}%`,
          width: i%3===0 ? 3 : 2, height: i%3===0 ? 3 : 2,
          borderRadius:"50%",
          background: i%2===0 ? "#60a5fa" : "#34d399",
          opacity:0.5,
          animation:`pulse ${1.5 + i*0.2}s ease-in-out infinite`,
        }}/>
      ))}

      <div style={{ position:"relative", zIndex:1 }}>
        {}
        <div style={{ marginBottom:14 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:10,
            background:"rgba(37,99,235,0.2)",
            border:"1px solid rgba(59,130,246,0.3)",
            borderRadius:20, padding:"8px 20px",
          }}>
            <span style={{ fontSize:22 }}>🍱</span>
            <span style={{
              fontSize:20, fontFamily:"'Fredoka One',cursive",
              color:"white", letterSpacing:1,
            }}>MBG Calculator</span>
          </div>
        </div>

        <div style={{ fontSize:12, color:"#7aaedd", marginBottom:6, letterSpacing:2, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>
          MAKAN BERGIZI GRATIS — INDONESIA SEHAT
        </div>

        {}
        <div style={{ display:"flex", alignItems:"center", gap:12, margin:"14px auto", maxWidth:320 }}>
          <div style={{ flex:1, height:1, background:"linear-gradient(to right, transparent, #3b82f6)" }}/>
          <span style={{ fontSize:16 }}>🇮🇩</span>
          <div style={{ flex:1, height:1, background:"linear-gradient(to left, transparent, #3b82f6)" }}/>
        </div>

        <div style={{ fontSize:13, color:"#93c5fd", marginBottom:6, fontFamily:"'Nunito',sans-serif" }}>
          Made with{" "}
          <span className="animate-heartbeat" style={{ display:"inline-block", color:"#f87171" }}>❤</span>
          {" "}untuk anak Indonesia
        </div>

        <div style={{
          fontSize:17, fontFamily:"'Fredoka One',cursive",
          letterSpacing:1, marginBottom:4,
        }}>
          <span style={{ color:"#94a3b8" }}>by</span>{" "}
          <span style={{
            background:"linear-gradient(135deg,#60a5fa,#34d399,#60a5fa)",
            backgroundSize:"200% 100%",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            animation:"gradShift 3s ease infinite",
          }}>amranskibidi</span>
        </div>

        <div style={{ fontSize:10, color:"#475569", marginTop:10, fontFamily:"'Nunito',sans-serif" }}>
          © 2025 amranskibidi · Program MBG Pak Prabowo 🫡
        </div>
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
  const dragItem = useRef<MenuItem|null>(null);
  const counter = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filtered = menuData.filter(m => {
    const matchK = kategori === "Semua" || m.kategori === kategori;
    const matchS = m.name.toLowerCase().includes(search.toLowerCase());
    return matchK && matchS;
  });

  const totKalori = tray.reduce((s,i)=>s+i.kalori,0);
  const totProtein = tray.reduce((s,i)=>s+i.protein,0);
  const totKarbo = tray.reduce((s,i)=>s+i.karbo,0);
  const totLemak = tray.reduce((s,i)=>s+i.lemak,0);
  const totHarga = tray.reduce((s,i)=>s+i.harga,0);

  const addItem = useCallback((item: MenuItem) => {
    setTray(p => [...p, { ...item, trayId:`${item.id}-${++counter.current}` }]);
  }, []);

  const removeItem = useCallback((trayId: string) => {
    setTray(p => p.filter(i => i.trayId !== trayId));
  }, []);

  const S: Record<string,React.CSSProperties> = {
    root: { minHeight:"100vh", background:"var(--bg-primary)", transition:"background 0.4s" },
    inner: { maxWidth:1400, margin:"0 auto", padding:"0 16px" },
    header: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 0 22px", gap:12 },
    brand: { display:"flex", alignItems:"center", gap:14 },
    logo: {
      width:50, height:50, borderRadius:15,
      background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:26, boxShadow:"0 4px 20px rgba(37,99,235,0.4)",
    },
    title: {
      fontFamily:"'Fredoka One',cursive",
      fontSize:"clamp(20px,4vw,28px)", letterSpacing:0.5,
      color:"var(--text-primary)", lineHeight:1,
    },
    badge: {
      display:"inline-flex", alignItems:"center", gap:4,
      padding:"3px 10px", borderRadius:20,
      background:"var(--accent-blue-pale)", color:"var(--accent-blue-light)",
      fontSize:10, fontWeight:800, fontFamily:"'Nunito',sans-serif",
    },
    toggle: {
      width:46, height:46, borderRadius:14, fontSize:22,
      background:"var(--bg-card)", border:"1.5px solid var(--border)",
      cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
      boxShadow:"var(--shadow-sm)", transition:"all .2s ease", flexShrink:0,
    },
    grid: { display:"grid", gridTemplateColumns:"1fr 390px", gap:20, alignItems:"start" },
    panel: {
      background:"var(--bg-card)", border:"1.5px solid var(--border-light)",
      borderRadius:22, overflow:"hidden", boxShadow:"var(--shadow-card)",
      transition:"background .4s",
    },
    panelHead: { padding:"18px 20px 0" },
    panelTitle: {
      fontFamily:"'Fredoka One',cursive",
      fontSize:15, color:"var(--text-primary)",
      marginBottom:12, display:"flex", alignItems:"center", gap:8,
    },
    searchWrap: { position:"relative", marginBottom:10 },
    searchInput: {
      width:"100%", padding:"9px 12px 9px 34px", borderRadius:10,
      background:"var(--bg-primary)", border:"1.5px solid var(--border-light)",
      color:"var(--text-primary)", fontSize:13, fontFamily:"'Nunito',sans-serif",
      outline:"none", transition:"border .2s",
    },
    catTabs: { display:"flex", gap:6, overflowX:"auto" as const, paddingBottom:14, scrollbarWidth:"none" as const },
    menuGrid: {
      display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",
      gap:8, padding:"8px 20px 20px", maxHeight:500, overflowY:"auto" as const,
    },
    rightCol: { position:"sticky" as const, top:20, display:"flex", flexDirection:"column" as const, gap:12 },
    dropZone: {
      background:"var(--bg-card)", border:"2px dashed var(--border)",
      borderRadius:22, padding:"14px 14px 18px", transition:"all .3s ease",
      boxShadow:"var(--shadow-card)",
    },
    trayHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 },
    trayTitle: {
      fontFamily:"'Fredoka One',cursive",
      fontSize:16, color:"var(--text-primary)",
      display:"flex", alignItems:"center", gap:8,
    },
    trayCount: {
      background:"var(--accent-blue)", color:"white",
      fontSize:10, fontWeight:800, width:22, height:22,
      borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
    },
    summaryCard: {
      background:"var(--bg-card)", border:"1.5px solid var(--border-light)",
      borderRadius:22, padding:18, boxShadow:"var(--shadow-card)", transition:"background .4s",
    },
    summaryTitle: {
      fontFamily:"'Fredoka One',cursive",
      fontSize:14, color:"var(--text-primary)",
      marginBottom:14, display:"flex", alignItems:"center", gap:6,
    },
    kaloriNum: {
      fontFamily:"'Fredoka One',cursive",
      fontSize:40, lineHeight:1,
      background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      backgroundClip:"text",
    },
    priceRow: { display:"flex", justifyContent:"space-between", alignItems:"center" },
    priceTotalRow: {
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"10px 14px", borderRadius:14,
      background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
      marginTop:6,
    },
  };

  return (
    <>
      <style>{`
        @media(max-width:900px){.main-grid{grid-template-columns:1fr!important}}
        @media(max-width:600px){.menu-grid-inner{grid-template-columns:1fr 1fr!important}}
        .cat-tab::-webkit-scrollbar{display:none}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes popIn{0%{transform:scale(0);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes happyBounce{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-5px) rotate(-2deg)}75%{transform:translateY(-3px) rotate(2deg)}}
        @keyframes omprengFly{0%{transform:translateY(0) rotate(0deg)}30%{transform:translateY(-12px) rotate(-5deg)}60%{transform:translateY(-8px) rotate(3deg)}100%{transform:translateY(0) rotate(0deg)}}
        @keyframes chew{0%,100%{transform:scaleY(1) translateY(0)}25%{transform:scaleY(.92) translateY(1px)}50%{transform:scaleY(1.04) translateY(-1px)}75%{transform:scaleY(.96) translateY(.5px)}}
        @keyframes spoonUp{0%,100%{transform:rotate(-20deg) translateY(0)}50%{transform:rotate(10deg) translateY(-8px)}}
        @keyframes heartBeat{0%,100%{transform:scale(1)}14%{transform:scale(1.25)}28%{transform:scale(1)}42%{transform:scale(1.18)}70%{transform:scale(1)}}
        @keyframes cookBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes stirPot{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes waveHand{0%,100%{transform:rotate(0deg)}33%{transform:rotate(20deg)}66%{transform:rotate(-15deg)}}
        @keyframes nod{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-8deg)}}
        @keyframes starSpin{from{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.3)}to{transform:rotate(360deg) scale(1)}}
        @keyframes speak{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes steam1{0%{opacity:0;transform:translateY(0) scaleX(1)}40%{opacity:.8}100%{opacity:0;transform:translateY(-22px) scaleX(1.4)}}
        @keyframes steam2{0%{opacity:0;transform:translateY(0) scaleX(1)}40%{opacity:.6}100%{opacity:0;transform:translateY(-18px) scaleX(.8)}}
        @keyframes bounceIn{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.08)}70%{transform:scale(.95)}100%{transform:scale(1);opacity:1}}
        .animate-bounce-in{animation:bounceIn .4s cubic-bezier(.175,.885,.32,1.275) forwards}
        .animate-happy{animation:happyBounce 1.2s ease-in-out infinite}
        .animate-cook{animation:cookBounce 1.5s ease-in-out infinite}
        .animate-ompreng-fly{animation:omprengFly 4s ease-in-out infinite}
        .animate-heartbeat{animation:heartBeat 1.5s ease infinite}
        .animate-speak{animation:speak .8s ease-in-out infinite}
        input::placeholder{color:var(--text-muted)}
      `}</style>

      <div style={S.root}>
        {}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-180, right:-80, width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)" }}/>
          <div style={{ position:"absolute", bottom:-180, left:-100, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)" }}/>
          <div style={{ position:"absolute", inset:0, opacity:.3, backgroundImage:"radial-gradient(circle,var(--border) 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>
        </div>

        <div style={{ ...S.inner, position:"relative", zIndex:1 }}>
          {}
          <header style={S.header}>
            <div style={S.brand}>
              <div className="animate-float" style={S.logo}>🍱</div>
              <div>
                <div style={S.title}>MBG Calculator</div>
                <div style={{ marginTop:4 }}>
                  <span style={S.badge}>🏫 Makan Bergizi Gratis</span>
                </div>
              </div>
            </div>
            <button style={S.toggle} onClick={() => setDark(d=>!d)}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent-blue-pale)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--bg-card)"; }}
            >{dark ? "☀️" : "🌙"}</button>
          </header>

          {}
          <div style={{
            display:"flex", alignItems:"flex-end", justifyContent:"center",
            gap: "clamp(12px,3vw,40px)", padding:"10px 0 4px",
            flexWrap:"wrap" as const,
          }}>
            <KidEating side="left" name="Budi 🧒" quote="Enak banget! Makasih Pak Prabowo! 🙏"/>
            <ChefAnimation />
            <KidEating side="right" name="Siti 👧" quote="Ini enak! Terima kasih MBG! ❤️"/>
          </div>

          {}
          <div className="main-grid" style={{ ...S.grid, paddingBottom:0 }}>
            {}
            <div style={S.panel}>
              <div style={S.panelHead}>
                <div style={S.panelTitle}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg,#2563eb,#0ea5e9)", display:"inline-block" }}/>
                  Pilih Menu — Drag atau Klik
                </div>
                <div style={S.searchWrap}>
                  <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"var(--text-muted)" }}>🔍</span>
                  <input
                    style={S.searchInput}
                    placeholder="Cari makanan..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor="var(--accent-blue)"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(37,99,235,.1)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor="var(--border-light)"; e.currentTarget.style.boxShadow="none"; }}
                  />
                </div>
                <div style={S.catTabs}>
                  {kategoriList.map(k => (
                    <button key={k} onClick={() => setKategori(k)} style={{
                      flexShrink:0, padding:"5px 12px", borderRadius:20,
                      fontSize:11, fontWeight:800, cursor:"pointer", border:"1.5px solid",
                      whiteSpace:"nowrap" as const, transition:"all .2s ease",
                      fontFamily:"'Nunito',sans-serif",
                      background: kategori===k ? "var(--accent-blue)" : "var(--bg-primary)",
                      color: kategori===k ? "white" : "var(--text-muted)",
                      borderColor: kategori===k ? "var(--accent-blue)" : "var(--border-light)",
                      boxShadow: kategori===k ? "0 2px 12px rgba(37,99,235,.3)" : "none",
                    }}>{k}</button>
                  ))}
                </div>
              </div>
              <div className="menu-grid-inner" style={S.menuGrid}>
                {filtered.length === 0
                  ? <div style={{ gridColumn:"1/-1", padding:32, textAlign:"center", color:"var(--text-muted)" }}>
                      <div style={{ fontSize:28, marginBottom:8 }}>🔍</div>
                      <div style={{ fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>Tidak ada menu ditemukan</div>
                    </div>
                  : filtered.map(item => (
                    <MenuCard key={item.id} item={item}
                      onDragStart={(e,i) => { dragItem.current=i; e.dataTransfer.effectAllowed="copy"; }}
                      onAdd={addItem}
                    />
                  ))
                }
              </div>
            </div>

            {}
            <div style={S.rightCol}>
              {}
              <div style={{ ...S.panel, padding:"14px 14px 8px" }}>
                <div style={{ fontSize:13, fontWeight:800, color:"var(--text-primary)", fontFamily:"'Fredoka One',cursive", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"linear-gradient(135deg,#2563eb,#0ea5e9)", display:"inline-block" }}/>
                  Omprengmu
                </div>
                <OmprengSVG tray={tray} />
              </div>

              {}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); if(dragItem.current){ addItem(dragItem.current); dragItem.current=null; } }}
                style={{
                  ...S.dropZone,
                  background: dragOver ? "var(--accent-blue-pale)" : "var(--bg-card)",
                  borderColor: dragOver ? "var(--accent-blue)" : "var(--border)",
                  animation: dragOver ? "dropPulse 1s ease infinite" : "none",
                }}
              >
                <div style={S.trayHeader}>
                  <div style={S.trayTitle}>
                    🥡 Isi Ompreng
                    <div style={S.trayCount}>{tray.length}</div>
                  </div>
                  {tray.length > 0 && (
                    <button onClick={() => setTray([])} style={{
                      fontSize:11, fontWeight:700, color:"var(--text-muted)",
                      cursor:"pointer", padding:"4px 8px", borderRadius:6,
                      border:"none", background:"none", fontFamily:"'Nunito',sans-serif",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color="#ef4444"; e.currentTarget.style.background="rgba(239,68,68,.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color="var(--text-muted)"; e.currentTarget.style.background="none"; }}
                    >Kosongkan</button>
                  )}
                </div>
                {tray.length === 0
                  ? <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"16px", gap:6, color:"var(--text-muted)", textAlign:"center" }}>
                      <div className="animate-float" style={{ fontSize:32, opacity:0.4 }}>🍽️</div>
                      <div style={{ fontSize:12, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>Drag atau klik menu di kiri</div>
                    </div>
                  : <div style={{ display:"flex", flexDirection:"column", gap:5, maxHeight:200, overflowY:"auto" }}>
                      {tray.map(item => <TraySlot key={item.trayId} item={item} onRemove={removeItem}/>)}
                    </div>
                }
                {dragOver && (
                  <div style={{ textAlign:"center", padding:6, color:"var(--accent-blue)", fontSize:12, fontWeight:800, fontFamily:"'Fredoka One',cursive" }}>
                    ✨ Lepaskan di sini!
                  </div>
                )}
              </div>

              {}
              <div style={S.summaryCard}>
                <div style={S.summaryTitle}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"linear-gradient(135deg,#2563eb,#0ea5e9)", display:"inline-block" }}/>
                  Ringkasan Gizi
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:14 }}>
                  <span style={S.kaloriNum}>{totKalori}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"var(--text-muted)", fontFamily:"'Nunito',sans-serif" }}>kkal</span>
                </div>
                <NutritionBar label="Protein" value={totProtein} unit="g" color="#22c55e" max={60}/>
                <NutritionBar label="Karbohidrat" value={totKarbo} unit="g" color="#f59e0b" max={150}/>
                <NutritionBar label="Lemak" value={totLemak} unit="g" color="#ef4444" max={70}/>
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1.5px solid var(--border-light)", display:"flex", flexDirection:"column", gap:6 }}>
                  <div style={S.priceRow}>
                    <span style={{ fontSize:12, color:"var(--text-muted)", fontFamily:"'Nunito',sans-serif" }}>🍽️ Harga Makanan</span>
                    <span style={{ fontSize:12, fontWeight:800, color:"var(--text-primary)", fontFamily:"'Fredoka One',cursive" }}>{formatRp(totHarga)}</span>
                  </div>
                  <div style={S.priceRow}>
                    <span style={{ fontSize:12, color:"var(--text-muted)", fontFamily:"'Nunito',sans-serif" }}>⚙️ Biaya Operasional</span>
                    <span style={{ fontSize:12, fontWeight:800, color:"var(--text-primary)", fontFamily:"'Fredoka One',cursive" }}>{formatRp(OPERATIONAL_COST)}</span>
                  </div>
                  <div style={S.priceTotalRow}>
                    <span style={{ fontSize:13, fontWeight:800, color:"white", fontFamily:"'Fredoka One',cursive" }}>💳 Total</span>
                    <span style={{ fontSize:16, fontWeight:800, color:"white", fontFamily:"'Fredoka One',cursive" }}>{formatRp(totHarga + OPERATIONAL_COST)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {}
          <Footer />
        </div>
      </div>
    </>
  );
}
