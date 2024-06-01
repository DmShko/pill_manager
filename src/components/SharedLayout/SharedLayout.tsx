import { FC } from "react";
import { NavLink, Outlet, useLocation  } from "react-router-dom";
import { Suspense } from "react";

// styles
import sh from "./SharedLayout.module.scss";

import logoutAPI from "../../API/logoutAPI";

import PillOfBubble from './PillOfBubble/PillOfBubble';

import Logout from '../SvgComponents/Courses/Logout';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

const SharedLayout: FC = () => {

  const dispatch = useAppDispatch();

  let location = useLocation();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  // const isLogOutSelector = useAppSelector(state => state.logout.isLogout);

  const logout = () => {
    dispatch(logoutAPI({token: tokenSelector,}));
  };

  return (
    <>
      <header>

        <div className={sh.headerContainer}>

            <nav className={sh.nav}>

              <div className={sh.logoContainer}>
                <PillOfBubble />
              </div>

                {tokenSelector && <ul className={sh.navList}>
                    <li className={sh.navLink}>
                    <NavLink to="/courses" style={location.pathname === '/courses' ? {borderBottom: '2px solid rgb(253, 242, 90)'} : {borderBottom: 'none'}}>Courses</NavLink>
                    </li>

                    <li className={sh.navLink}>
                    <NavLink to="/prescriptions" style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid rgb(253, 242, 90)'} : {borderBottom: 'none'}}>Prescriptions</NavLink>
                    </li>
                </ul>}

                {!tokenSelector && <ul className={sh.authList}>
                    <li className={sh.authLink} style={location.pathname === '/signin' ? {borderBottom: '2px solid rgb(253, 242, 90)',} : {borderBottom: 'none'}}>
                    <NavLink to="/signin">SignIn</NavLink>
                    </li>

                    <li className={sh.authLink} style={location.pathname === '/signup' ? {borderBottom: '2px solid rgb(253, 242, 90)'} : {borderBottom: 'none'}}>
                    <NavLink to="/signup">SignUp</NavLink>
                    </li>
                </ul>}

              {tokenSelector && <button onClick={logout}><Logout width={'25px'} height={'25px'} /></button>}

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
