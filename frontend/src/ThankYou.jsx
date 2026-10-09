export default function ThankYou({ visit, logo }) {
  return (
    <div className="site thank-you-page">
      <header className="thank-you-header">
        <a className="brand" href="#home"><img src={logo} alt="Hanco Fort Heights" /><div className="brand-name"><span>HANCO</span><strong>FORT HEIGHTS</strong></div></a>
        <a className="header-phone" href="tel:+918129053222">+91 812 905 3222</a>
      </header>
      <main className="thank-you-main">
        <div className="thank-you-card">
          <div className="thank-you-check" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="m12 24 8 8 16-17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <p className="thank-you-eyebrow">HANCO FORT HEIGHTS · PALAKKAD</p>
          <h1>Thank you for your interest.</h1>
          <p>{visit ? "Your site visit request has been received. Our team will call you to confirm your visit." : "Your enquiry has been received. Our team will contact you with the brochure and price details."}</p>
          <div className="thank-you-actions"><a className="gold-button" href="#home">Back to home <span aria-hidden="true">→</span></a><a className="thank-you-call" href="tel:+918129053222">Call our team</a></div>
          <p className="thank-you-location">Stadium Bypass Road, Palakkad, Kerala</p>
        </div>
      </main>
      <footer className="site-footer"><p>© 2026 Hanco Property Developers Pvt. Ltd.</p></footer>
    </div>
  );
}
