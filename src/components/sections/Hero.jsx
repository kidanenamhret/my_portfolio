export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-avatar-wrapper">
        <img src="/profile.png" alt="Mesfin" className="hero-avatar" />
      </div>
      <h1 className="hero-title">
        Hello, I'm <span className="hero-name">Mesfin</span>.
      </h1>
      <p className="hero-desc">
        Based in Ethiopia, I'm a full stack developer passionate about building highly interactive, scalable, and responsive web applications.
      </p>
      <a href="#contact" className="link-btn">
        Contact Me
      </a>
    </section>
  );
}
