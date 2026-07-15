import { SOCIALS } from '../../data/constants';

export default function Header({ isLightTheme, setIsLightTheme, onSocialClick }) {
  return (
    <header className="header container">
      <div className="logo">Mesfin</div>
      <nav className="socials">
        {SOCIALS.map((s) => (
          <button
            key={s.aria}
            className="social-link"
            onClick={() => onSocialClick(s.aria, s.url)}
            aria-label={s.aria}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <i className={`bx ${s.icon}`}></i>
          </button>
        ))}
      </nav>
      <button
        className="theme-toggle"
        onClick={() => setIsLightTheme(prev => !prev)}
        aria-label="Toggle theme"
      >
        <i className={isLightTheme ? 'bx bx-moon' : 'bx bx-sun'}></i>
      </button>
    </header>
  );
}
