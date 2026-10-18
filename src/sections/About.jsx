const facts = [["Focus", "Web development"], ["Also into", "UI design"], ["Currently", "Building and leveling up"]];

const petals = [0, 45, 90, 135, 180, 225, 270, 315];
const dots = [[0, -8], [7, -4], [8, 4], [0, 9], [-8, 4], [-7, -4], [0, 0]];

// Round badge: text on a circle around the hero flower
function FlowerBadge() {
  return (
    <svg className="badge" viewBox="0 0 200 200" role="img" aria-label="Available for worldwide clients">
      <defs>
        <radialGradient id="pg-badge" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#4a508a" /><stop offset="1" stopColor="#7a82c9" />
        </radialGradient>
        <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="#F8F7E2" stroke="#474C80" strokeOpacity="0.25" strokeWidth="1.5" />
      <g className="badge-text">
        <text fill="#474C80" fontSize="17" letterSpacing="2">
          <textPath href="#badge-circle" textLength="458" lengthAdjust="spacing">AVAILABLE FOR • WORLDWIDE CLIENTS •</textPath>
        </text>
      </g>
      <g transform="translate(100 100) scale(0.42)">
        {petals.map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path d="M0 0 C-30 -14 -34 -62 -6 -86 C0 -90 0 -90 6 -86 C34 -62 30 -14 0 0Z" fill="url(#pg-badge)" stroke="#363a66" strokeWidth="2.4" />
            <path d="M0 -20 V-70" stroke="#363a66" strokeWidth="2" opacity="0.5" fill="none" />
          </g>
        ))}
        <circle r="17" fill="#d4d6ea" stroke="#363a66" strokeWidth="3" />
        <g fill="#6c73bb">{dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 6 ? 2.4 : 2} />)}</g>
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section className="block">
      <div className="wrap">
        <h2>Meet me</h2>
        <div className="about-grid">
          <div className="portrait-wrap">
          
<div className="portrait">
  <img
    src="/projects/atiqua-about1.png"
    alt="Portrait of Atiqua"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center top",
      display: "block",
    }}
  />
</div>

            <FlowerBadge />
          </div>
          <div>
            <p>Hi, I'm Atiqua. I turn messy ideas into websites and apps that feel simple, look good and actually work.</p>
            <p>I care about clear structure, calm color and small details. Every project starts with one question: what does the person on the other end need to do here?</p>
            <ul className="facts">
              {facts.map(([k, v]) => <li key={k}><span>{k}</span><span>{v}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}