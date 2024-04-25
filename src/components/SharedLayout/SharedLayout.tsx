import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

// styles
import sh from "./SharedLayout.module.scss";

const SharedLayout: FC = () => {
  return (
    <>
      <header>
        <div className={sh.headerContainer}>
            <nav>

              <div className={sh.logoContainer}>
                <NavLink className={sh.logo} to="/">MEDICINE</NavLink>
              </div>
            
            <ul className={sh.navList}>
                <li className={sh.navLink}>
                <NavLink to="/courses">Courses</NavLink>
                </li>

                <li className={sh.navLink}>
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
    </>
  );
};

export default SharedLayout;
