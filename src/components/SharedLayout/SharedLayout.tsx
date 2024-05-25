import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

// styles
import sh from "./SharedLayout.module.scss";

import logoutAPI from "../../API/logoutAPI";

// own dispatch hook
import { useAppDispatch, useAppSelector  } from "../../app.hooks";

const SharedLayout: FC = () => {

  const dispatch = useAppDispatch();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);

  const logout = () => {
    dispatch(logoutAPI({token: tokenSelector,}));
  };

  return (
    <>
      <header>

        <div className={sh.headerContainer}>

            <nav className={sh.nav}>

              <div className={sh.logoContainer}>
                <NavLink className={sh.logo} to="/">MEDICINE</NavLink>
              </div>
              
              {tokenSelector && <ul className={sh.navList}>
                  <li className={sh.navLink}>
                  <NavLink to="/courses">Courses</NavLink>
                  </li>

                  <li className={sh.navLink}>
                  <NavLink to="/prescriptions">Prescriptions</NavLink>
                  </li>
              </ul>}

              {isLogOutSelector && <ul className={sh.authList}>
                  <li className={sh.authLink}>
                  <NavLink to="/signin">SignIn</NavLink>
                  </li>

                  <li className={sh.authLink}>
                  <NavLink to="/signup">SignUp</NavLink>
                  </li>
              </ul>}

              {!isLogOutSelector && <button onClick={logout}>Logout</button>}

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
