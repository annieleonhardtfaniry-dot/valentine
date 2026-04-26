import { useEffect, useMemo, useState } from "react";

const HERO_LINES = [
  "SPIDER-MAN",
  "Multiverse UI Experience",
  "3D Motion • Neon City • Dynamic Web",
];

const ACTIONS = [
  { label: "Lancer la toile", tone: "primary" },
  { label: "Mode Combat", tone: "danger" },
  { label: "Explorer NYC", tone: "ghost" },
];

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [energy, setEnergy] = useState(86);
  const [combo, setCombo] = useState(4);

  const webNodes = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({ id: i, delay: i * 0.08 })),
    [],
  );

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    const ticker = setInterval(() => {
      setEnergy((prev) => (prev > 98 ? 84 : prev + 1));
      setCombo((prev) => (prev > 11 ? 1 : prev + 1));
    }, 700);

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearInterval(ticker);
    };
  }, []);

  const rotateX = (-mouse.y * 12).toFixed(2);
  const rotateY = (mouse.x * 16).toFixed(2);

  return (
    <main className="scene">
      <div className="city-haze" />
      <div className="web-grid" />

      <section
        className="hero-shell"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <div className="spider-web-line" />
        <div className="spider-avatar" />

        <header className="hero-title">
          {HERO_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </header>

        <div className="hud-panel">
          <div>
            <span>Suit Energy</span>
            <strong>{energy}%</strong>
          </div>
          <div>
            <span>Combo</span>
            <strong>x{combo}</strong>
          </div>
          <div>
            <span>Threat</span>
            <strong>High</strong>
          </div>
        </div>

        <div className="actions">
          {ACTIONS.map((action) => (
            <button key={action.label} className={`btn ${action.tone}`}>
              {action.label}
            </button>
          ))}
        </div>
      </section>

      <aside className="floating-cards">
        {webNodes.map((node) => (
          <article
            key={node.id}
            className="card"
            style={{ animationDelay: `${node.delay}s` }}
          >
            <h3>Zone {node.id + 1}</h3>
            <p>Scan 3D actif • Liaisons de toiles stabilisées.</p>
          </article>
        ))}
      </aside>
    </main>
  );
}
