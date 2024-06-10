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

import LangToggle from '../LangToggle/LangToggle';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

import DayNight from "../DayNight/DayNight";

const SharedLayout: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let location = useLocation();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const isLogoutSelector = useAppSelector(state => state.logout.isLogout);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

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
        setMenuToggle(false);
        break;
      case 'prescriptions':
        navigate('/prescriptions');
        setMenuToggle(false);
        break;
      case 'logout':
        dispatch(logoutAPI({token: tokenSelector,}));
        setMenuToggle(false);
        break;
      default:
        break
    };

  };

  return (
    <>
      <header style={lightModeSelector === 'dark' ? {borderBottom: '2px solid lightgray'} : {borderBottom: '2px solid rgba(16, 16, 24, 0.2)'}}>

        <div className={sh.headerContainer}>

            <nav className={sh.nav}>

              <div className={sh.logoContainer}>
                <PillOfBubble />
              </div>

                {tokenSelector && <ul className={sh.navList}>
                    <li className={sh.navLink}>
                    <NavLink to="/courses" style={location.pathname === '/courses' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>{languageSelector === 'En' ? 'Courses' : 'Курси'}</NavLink>
                    </li>

                    <li className={sh.navLink}>
                    <NavLink to="/prescriptions" style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>{languageSelector === 'En' ? 'Prescriptions' : 'Рецепти'}</NavLink>
                    </li>
                </ul>}

                <div className={sh.settingsContainer}>

                <div className={sh.settingsToggle}>
                  <LangToggle />
                  <DayNight />
                </div>

                  {!tokenSelector && <ul className={sh.authList}>
                      <li className={sh.authLink} style={location.pathname === '/signin' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>
                      <NavLink to="/signin">{languageSelector === 'En' ? 'SignIn' : 'Увійти'}</NavLink>
                      </li>

                      <li className={sh.authLink} style={location.pathname === '/signup' ? {borderBottom: '2px solid #FDB12D'} : {borderBottom: '2px solid transparent'}}>
                      <NavLink to="/signup">{languageSelector === 'En' ? 'SignUp' : 'Створити'}</NavLink>
                      </li>
                  </ul>}
                </div>

              {tokenSelector && <button className={sh.burgerButton} type="button" onClick={menuOpenClose}><Burger width={'25px'} height={'25px'}/></button>}
              
              {tokenSelector && <button className={sh.logoutButton} type="button" onClick={logout} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'lightgray'}}><Logout width={'25px'} height={'25px'} /></button>}

            </nav>
        </div>
      </header>

      <main>
        <Suspense fallback={"..loading"}>
          <Outlet />
        </Suspense>
      </main>

      <footer>

        <div className={sh.footerContainer} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', borderTop: 'none'} : {backgroundColor: 'white'}}>

          <div className={sh.footerLogo} style={lightModeSelector === 'dark' ? {color: '#646cff'} : {color: ''}}>
            <p className={sh.title}>Medicine</p>
            <p className={sh.subTitle}>with MedicineServer</p>
          </div>
        
          <p className={sh.right}>&copy; 2024 Dmytro Shevchenko</p>
          
          <div className={sh.links}>

            <div className={sh.item}><p>Email: medicine2024.service@gmail.com</p></div>
            <div className={sh.item}><a className={sh.link} target='_blank' href="https://www.linkedin.com/in/dmitry-shevchenko-aa884613b">LinkedIn</a></div>
            <div className={sh.item}><a className={sh.link} target='_blank' href="https://github.com/DmShko?tab=overview&from=2024-06-01&to=2024-06-09">Github</a></div>
            
          </div>
            
        </div>

      </footer>

      {menuToggle && <ModalMenu >

        <p className={sh.coursesItem} id="courses" onClick={BurgerNavigate} style={location.pathname === '/courses' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>Courses</p>
        <p className={sh.descriptionItem} id="prescriptions" onClick={BurgerNavigate} style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid #FDB12D',} : {borderBottom: '2px solid transparent'}}>Prescriptions</p>
        <p className={sh.logoutItem} id="logout" onClick={BurgerNavigate}>Logout</p>
        
      </ModalMenu>}

    </>
  );
};

export default SharedLayout;
