const projects = [
  {
    title: "EduGenie: AI-Powered EdTech Platform",
    desc: "A learning platform with curated resources and roadmaps for BTech exams, GATE preparation and campus placements. A built-in GenAI chatbot gives personalised study guidance, answers questions and suggests resources that adapt to each student.",
    chips: ["HTML", "CSS", "JavaScript", "React.js", "GenAI", "Python"],
    link: "https://edu-genie.netlify.app/",
    domain: "edu-genie.netlify.app",
    image: "/projects/edugenie.webp", w: 1200, h: 574,
    alt: "EduGenie home page: Explore your personal educational companion",
  },
    {
    title: "Maa Laxmi Constructions: Business Website",
    desc: "A website for a construction and real estate company that builds independent houses, residential and commercial projects, and develops plots. The page puts the company's services up front, with clear Call Now and Enquire Now buttons and a floating WhatsApp shortcut, so visitors can reach the team in one tap.",
    chips: ["Business website", "Responsive design", "UI design"],
    link: "https://maalaxmicontructions.com/",
    domain: "maalaxmiconstructions.com",
    image: "/projects/maalaxmi.webp", w: 1200, h: 556,
    alt: "Maa Laxmi Constructions home page: Building Your Dreams With Trust",
  },
  {
    title: "Finance Dashboard",
    desc: "An interactive dashboard that turns financial data into clear charts and summaries, so you can see income, spending and trends at a glance. Built with a clean layout that stays easy to read on any screen.",
    chips: ["Dashboard", "Data visualization", "UI design"],
    link: "https://financedashbord.netlify.app",
    domain: "financedashbord.netlify.app",
    image: "/projects/finance-dashboard.webp", w: 1200, h: 567,
    alt: "Finance Dashboard showing balance, income, expenses, a balance trend chart and a spending breakdown",
  },
];

export default function Projects() {
  return (
    <section className="block on-blue">
      <div className="wrap">
        <h2>The work</h2>
        <div className="projects">
          {projects.map((p) => (
            <article className="project" key={p.title}>
              <a className="thumb" href={p.link} target="_blank" rel="noreferrer" tabIndex={-1} aria-label={`Open ${p.title}`}>
                <div className="shot">
                  <div className="shot-bar"><i /><i /><i /><span>{p.domain}</span></div>
                  <img src={p.image} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
                </div>
              </a>
              <div className="info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
                <a className="link" href={p.link} target="_blank" rel="noreferrer">View live site</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}