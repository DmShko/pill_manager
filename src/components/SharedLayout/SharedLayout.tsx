import { useState, useRef, useEffect } from "react";
import { FC } from "react";
import { NavLink, Outlet, useLocation  } from "react-router-dom";
import { Suspense } from "react";
import { useTransition, animated } from '@react-spring/web';
// styles
import sh from "./SharedLayout.module.scss";

import logoutAPI from "../../API/logoutAPI";

import Booble from './Booble';

// own dispatch hook
import { useAppDispatch, useAppSelector  } from "../../app.hooks";

// types
import { parameterItem } from '../../types/animaTypes';

const SharedLayout: FC = () => {

  const dispatch = useAppDispatch();

  let location = useLocation();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  // const isLogOutSelector = useAppSelector(state => state.logout.isLogout);

  const [parameters, setParameters] = useState<parameterItem[]>([]);
  const [logoStartY, setLogoStartY] = useState(0);

  const logoRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    dispatch(logoutAPI({token: tokenSelector,}));
  };

  // delete old bubble, when page is chenge
  useEffect(() => {

    // reset 
    function handleWindowResize() {
      setParameters([]);
    }

    window.addEventListener('resize', handleWindowResize);

    // generate random parameter of bubble
    const random = () => {

      let logoCenterX = 0;

      if (logoRef.current !== null) {

        // start coordinate of logo for bubble 
        logoCenterX = logoRef.current.offsetLeft + logoRef.current.offsetWidth / 2;
        setLogoStartY(logoRef.current.offsetHeight + logoRef.current.offsetTop);

        let tempX =  Math.round(randomGenerator(logoCenterX + logoRef.current.offsetWidth / 2, logoCenterX - logoRef.current.offsetWidth / 2));
        let tempY = 0;
   
        if(tempX > logoCenterX) {
          tempY = logoStartY -  (tempX - logoCenterX);
        } else {
          tempY = logoStartY -  (logoCenterX - tempX);
        };

        // 'size' for mobile and tab and desk
        return {
          size: logoRef.current && logoRef.current.offsetWidth < 100 
          ? randomGenerator(8, 3) : randomGenerator(15, 5),
          x: tempX,
          y: tempY,
        };
      }
    };
    
    // random generation interval
    const timer = setInterval(() => {

      const newItem = random();

      // 'random' can be undefined, because it's need to verify
      if(newItem !== undefined) {

        parameters.length >= 10 
                ? setParameters(parameters.filter(element => element.size !== randomGenerator(15, 5)))
                : setParameters([...parameters, newItem]);
      };
     
    }, randomGenerator(15, 5) * 10);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleWindowResize);
    };
    
  }, [dispatch, parameters]);

  const randomGenerator = (max: number, min: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const transitions = useTransition(parameters, {
    from: { transform: `translateY(${logoStartY}px)`, opacity: '1' },
    enter: { transform: `translateY(${logoRef.current ? logoRef.current.offsetHeight / 5 : 0})`,},
    config: {
      duration: randomGenerator(4000, 2000),
      friction: randomGenerator(300, 5) * 10,
    },
  });

  return (
    <>
      <header>

        <div className={sh.headerContainer}>

            <nav className={sh.nav}>

              <div className={sh.logoContainer} ref={logoRef}>

                {transitions((style, item) => (
                  <animated.div style={style}>
                    <Booble
                      styleProps={{
                        position: 'absolute',
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        border: '1px solid gray',
                        borderRadius: '50px',
                      }}
                    />
                  </animated.div>
                ))}

                <NavLink className={sh.logo} to="/">MEDICINE</NavLink>
              </div>
              
              {tokenSelector && <ul className={sh.navList}>
                  <li className={sh.navLink}>
                  <NavLink to="/courses" style={location.pathname === '/courses' ? {borderBottom: '2px solid gray'} : {borderBottom: 'none'}}>Courses</NavLink>
                  </li>

                  <li className={sh.navLink}>
                  <NavLink to="/prescriptions" style={location.pathname === '/prescriptions' ? {borderBottom: '2px solid gray'} : {borderBottom: 'none'}}>Prescriptions</NavLink>
                  </li>
              </ul>}

              {!tokenSelector && <ul className={sh.authList}>
                  <li className={sh.authLink} style={location.pathname === '/signin' ? {borderBottom: '2px solid gray'} : {borderBottom: 'none'}}>
                  <NavLink to="/signin">SignIn</NavLink>
                  </li>

                  <li className={sh.authLink} style={location.pathname === '/signup' ? {borderBottom: '2px solid gray'} : {borderBottom: 'none'}}>
                  <NavLink to="/signup">SignUp</NavLink>
                  </li>
              </ul>}

              {tokenSelector && <button onClick={logout}>Logout</button>}

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
