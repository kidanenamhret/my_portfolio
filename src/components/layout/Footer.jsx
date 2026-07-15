import { SOCIALS } from '../../data/constants';

export default function Footer({ onSocialClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <hr className="footer-divider" />
        <div className="footer-content">
          <div className="logo">Mesfin</div>
          <div className="socials">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
