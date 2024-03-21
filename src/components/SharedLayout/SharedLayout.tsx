import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

// styles
import { SharedLayoutStyles } from "./SharedLayout.styled.js";

const SharedLayout: FC = () => {
  return (
    <SharedLayoutStyles>
      <header>
        <div className="header-content">
            <nav>
            <NavLink className="logo" to="/">MEDICINE</NavLink>
            <ul className="nav-list">
                <li className="nav-link">
                <NavLink to="/courses">Courses</NavLink>
                </li>

                <li className="nav-link">
                <NavLink to="/prescriptions">Prescriptions</NavLink>
                </li>

            </ul>
            </nav>
        </div>
      </header>
      <main>
        <Suspense fallback={"..loading"}>
          <Outlet />
        </Suspense>
      </main>
      <footer>

      </footer>
    </SharedLayoutStyles>
  );
};

export default SharedLayout;
