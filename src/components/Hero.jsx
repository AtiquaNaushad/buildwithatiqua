const petals = [0, 45, 90, 135, 180, 225, 270, 315];
const dots = [[0,-8],[7,-4],[8,4],[0,9],[-8,4],[-7,-4],[0,0]];

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="half top">
        <p className="sub">I build websites that turn visitors into clients</p>
        <h1>Atiqua</h1>
      </div>
      <svg className="flower" viewBox="0 0 200 200" role="img" aria-label="Blue cosmos flower">
        <defs>
          <radialGradient id="pg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#4a508a" /><stop offset="1" stopColor="#7a82c9" />
          </radialGradient>
        </defs>
        <g transform="translate(100 100)">
          {petals.map((r) => (
            <g key={r} transform={`rotate(${r})`}>
              <path d="M0 0 C-30 -14 -34 -62 -6 -86 C0 -90 0 -90 6 -86 C34 -62 30 -14 0 0Z" fill="url(#pg)" stroke="#363a66" strokeWidth="1.2" />
              <path d="M0 -20 V-70" stroke="#363a66" strokeWidth="1" opacity="0.5" fill="none" />
            </g>
          ))}
          <circle r="17" fill="#d4d6ea" stroke="#363a66" strokeWidth="1.5" />
          <g fill="#6c73bb">{dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 6 ? 2.4 : 2} />)}</g>
        </g>
      </svg>
      <div className="half bottom">
        <h1>Naushad</h1>
        <p className="tag">Clean code, calm design, zero clutter.</p>
        <div className="btns">
          <a className="btn" href="#projects">See the work</a>
          <a className="btn ghost" href="#contact">Say hi</a>
        </div>
      </div>
    </header>
  );
}
