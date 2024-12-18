import paths from '../routes/paths';

const Footer = () => (
  <footer className="bg-dark text-white pt-4">
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-3">
          <h5>Where</h5>
          <p>
            Rod. José Carlos Daux, 8600 - Santo Antonio de Lisboa, Florianópolis
            - SC, 88050-001
          </p>
        </div>

        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <a
                href={paths.dashboard}
                className="text-white text-decoration-none"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href={paths.scheduling}
                className="text-white text-decoration-none"
              >
                Scheduling
              </a>
            </li>
            <li>
              <a
                href={paths.schedulingView}
                className="text-white text-decoration-none"
              >
                Scheduling View
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5>Contact</h5>
          <ul className="list-unstyled">
            <li>
              <i className="bi bi-telephone-fill"></i> (48) 3206-0265
            </li>
            <li>
              <i className="bi bi-envelope-fill"></i> rh@advicehealth.com.br
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <a
          href="https://www.instagram.com/advicehealth_/"
          className="text-white mx-2"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://br.linkedin.com/company/adviceh"
          className="text-white mx-2"
        >
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
      <div className="text-center mt-4">
        <p className="mb-0">&copy; 2024 AdviceHealth. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
export default Footer;
