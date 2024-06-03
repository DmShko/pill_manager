import { FC, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate  } from "react-router-dom";
import { Suspense } from "react";

// styles
import sh from "./SharedLayout.module.scss";

import ModalMenu from "../BurgerModal/BurgerModal";

import logoutAPI from "../../API/logoutAPI";

import PillOfBubble from './PillOfBubble/PillOfBubble';

// images
import Logout from '../SvgComponents/Courses/Logout';

import Burger from '../SvgComponents/Courses/Burger';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

const SharedLayout: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let location = useLocation();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const isLogoutSelector = useAppSelector(state => state.logout.isLogout);

  const [ menuToggle, setMenuToggle ] = useState(false);

  useEffect(() => {

    if(isLogoutSelector) {
      setMenuToggle(false);
    };

  },[isLogoutSelector]);

  const logout = () => {
    dispatch(logoutAPI({token: tokenSelector,}));
  };

  const menuOpenClose = () => {
    setMenuToggle(state => !state);
  };

  const BurgerNavigate = (evt: React.MouseEvent<HTMLParagraphElement>) => {

    switch(evt.currentTarget.id) {

      case 'courses':
        navigate('/courses');
        break;
      case 'prescriptions':
        navigate('/prescriptions');
        break;
      case 'logout':
        dispatch(logoutAPI({token: tokenSelector,}));
        break;
      default:
        break
    };

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
                    <NavLink to="/courses" style={location.pathname === '/courses' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>Courses</NavLink>
                    </li>

                    <li className={sh.navLink}>
                    <NavLink to="/prescriptions" style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>Prescriptions</NavLink>
                    </li>
                </ul>}

                {!tokenSelector && <ul className={sh.authList}>
                    <li className={sh.authLink} style={location.pathname === '/signin' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>
                    <NavLink to="/signin">SignIn</NavLink>
                    </li>

                    <li className={sh.authLink} style={location.pathname === '/signup' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>
                    <NavLink to="/signup">SignUp</NavLink>
                    </li>
                </ul>}

              {tokenSelector && <button className={sh.burgerButton} type="button" onClick={menuOpenClose}><Burger width={'25px'} height={'25px'}/></button>}

              {tokenSelector && <button className={sh.logoutButton} type="button" onClick={logout}><Logout width={'25px'} height={'25px'} /></button>}

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

      {menuToggle && <ModalMenu openClose={menuOpenClose}>

        <p className={sh.coursesItem} id="courses" onClick={BurgerNavigate} style={location.pathname === '/courses' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>Courses</p>
        <p className={sh.descriptionItem} id="prescriptions" onClick={BurgerNavigate} style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>Prescriptions</p>
        <p className={sh.logoutItem} id="logout" onClick={BurgerNavigate}>Logout</p>
        
      </ModalMenu>}

    </>
  );
};

export default SharedLayout;
