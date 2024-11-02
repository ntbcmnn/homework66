import { NavLink } from 'react-router-dom';

const ToolBar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-3">
        <NavLink to="/" className="nav-link navbar-brand text-light">
          Calories Counter
        </NavLink>

        <div className="d-flex ms-auto gap-2 align-items-center">
          <NavLink
            to="/"
            className="nav-item nav-link text-light px-3"
          >
            Home
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default ToolBar;