const services = [
  ["Websites that land", "Portfolios, business sites and landing pages that load fast, look sharp and make the next step obvious."],
  ["Web apps", "Custom tools, dashboards and small products, built from the first sketch to a live link."],
  ["UI design", "Layouts, type and color systems that feel calm, clear and consistent on every screen."],
  ["Glow-ups", "Redesigns and speed fixes for sites that feel dated, slow or hard to use."],
];

export default function Services() {
  return (
    <section className="block">
      <div className="wrap">
        <h2>What I do</h2>
        <div className="services">
          {services.map(([t, d]) => (
            <div className="service" key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
