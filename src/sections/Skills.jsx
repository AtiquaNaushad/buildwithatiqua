import { siHtml5, siCss, siJavascript, siReact, siVite, siPython, siGit, siGithub, siNetlify } from "simple-icons";

// Add or remove icons here. Browse names at https://simpleicons.org (si + Name)
const tools = [siHtml5, siCss, siJavascript, siReact, siVite, siPython, siGit, siGithub, siNetlify];

function Row({ hidden }) {
  return (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {tools.map((t) => (<li key={t.slug} title={t.title} style={{ color: `#${t.hex}` }}>
          <svg viewBox="0 0 24 24" fill="currentColor" role={hidden ? undefined : "img"} aria-label={hidden ? undefined : t.title}>
            <path d={t.path} />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  return (
    <section className="block drip-section">
      <div className="wrap drip">
        <h2>Built With</h2>
        <div className="marquee-wrap">
          <div className="marquee">
            <div className="marquee-track">
              <Row />
              <Row hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


