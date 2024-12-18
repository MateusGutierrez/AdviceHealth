import paths from '../routes/paths';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container d-flex justify-content-between">
        <a
          className="navbar-brand text-white"
          style={{ fontWeight: 'bold' }}
          href={paths.home}
        >
          AdviceHealth
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white " href={paths.dashboard}>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href={paths.scheduling}>
                Scheduling
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href={paths.schedulingView}>
                Scheduling View
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
