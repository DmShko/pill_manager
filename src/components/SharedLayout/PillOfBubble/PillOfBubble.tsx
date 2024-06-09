import { FC, useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTransition, animated } from '@react-spring/web';
import Booble  from './Booble';

// own dispatch hook
import { useAppSelector } from "../../../app.hooks";

// types
import { parameterItem } from '../../../types/animaTypes';

import bu from './PillOfBubble.module.scss'

const PillOfBubble: FC = () => {

  const lightModeSelector = useAppSelector(state => state.pm.lightMode);

  const [parameters, setParameters] = useState<parameterItem[]>([]);
  const [logoStartY, setLogoStartY] = useState(0);
  const [animaStart, setAnimaStart] = useState(true);

  const logoRef = useRef<HTMLDivElement>(null);

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
            logoCenterX = logoRef.current.offsetWidth / 2;
            
            setLogoStartY(logoRef.current.offsetHeight);

            let tempX =  Math.round(randomGenerator(logoCenterX + logoRef.current.offsetWidth / 2.5, logoCenterX - logoRef.current.offsetWidth / 2.5));

            /* ###### Logic description ######
              .c
              |
              | 
              R        .y
              |        |
              |        |
              a.<--b-->|----.b1 

              c - centr of circle;
              a - circle touch point;
              b1 - tempX
              b - newTempX: b1 - (sqrt(pow(R, 2) + pow(b1, 2)) - R) / sqrt(pow(R, 2) + pow(b1, 2)) * b1
                  newY or b-y:     (sqrt(pow(R, 2) + pow(b1, 2)) - R) / sqrt(pow(R, 2) + pow(b1, 2)) * R
              y = newTempX + newY
            */

            // let newTempX = 0;
            let newY = 0;

            let Y = -60;

            if(tempX > logoCenterX) {
                // newTempX = logoCenterX + ((tempX - logoCenterX) - (Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(tempX - logoCenterX, 2)) - logoRef.current.offsetWidth / 2) / Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(tempX - logoCenterX, 2)) * (tempX - logoCenterX));
                newY = Math.round((Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(tempX - logoCenterX, 2)) - logoRef.current.offsetWidth / 2) / Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(tempX - logoCenterX, 2)) * logoRef.current.offsetWidth / 2);
        
            }else {
                
                // newTempX = logoRef.current.offsetLeft + ((logoCenterX - tempX) - (Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(logoCenterX - tempX, 2)) - logoRef.current.offsetWidth / 2) / Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(logoCenterX - tempX, 2)) * (logoCenterX - tempX));
                newY = Math.round((Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(logoCenterX - tempX, 2)) - logoRef.current.offsetWidth / 2) / Math.sqrt(Math.pow(logoRef.current.offsetWidth / 2, 2) + Math.pow(logoCenterX - tempX, 2)) * logoRef.current.offsetWidth / 2);
          
            };

            // 'size' for mobile and tab and desk
            return {
              size: logoRef.current && logoRef.current.offsetWidth < 100 
              ? randomGenerator(8, 3) : randomGenerator(15, 5),
              x: tempX,
              y: Y - newY,
            };
          }
      };
      
      // random generation interval
      const timer = setInterval(() => {

        const newItem = random();

        // 'random' can be undefined, because it's need to verify
        if(newItem !== undefined) {

          parameters.length >= 40 
                  ? setParameters(parameters.filter(element => element.size !== randomGenerator(15, 3)))
                  : setParameters([...parameters, newItem]);
        };
      
      }, randomGenerator(25, 5));

      return () => {
        clearInterval(timer);
        window.removeEventListener('resize', handleWindowResize);
      };
    
  }, [parameters]);

  const randomGenerator = (max: number, min: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const transitions = useTransition(parameters, {
    from: { transform: `translateY(${logoStartY}px)`, opacity: '1' },
    enter: { transform: `translateY(${logoRef.current ? -logoRef.current.offsetHeight : 0}px)`,},
    config: {
      duration: randomGenerator(4000, 2000),
      friction: randomGenerator(300, 5) * 10,
    },
  });

  const onAnimaOver = () => {
    setAnimaStart(true);
  };

  const onAnimaOut = () => {
    setAnimaStart(false);
  };

  return (
      <div className={bu.container} ref={logoRef} onMouseOver={onAnimaOut} onMouseOut={onAnimaOver}
      style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', boxShadow: '1px 1px 4px 1px #A1A1A1, inset 1px 1px 2px 1px #c9b8b8, inset 1px 1px 3px 4px #4b51b9'}: {backgroundColor: 'rgb(253, 242, 90)', 
      boxShadow: '1px 1px 4px 1px #A1A1A1, inset 1px 1px 2px 1px #c9b8b8, inset 1px 1px 3px 4px rgba(253, 177, 45, 0.7)'}}>
        
        <NavLink to="/" style={lightModeSelector === 'dark' ? {color: 'rgb(253, 177, 45)', borderBottom:'2px solid lightgray', 
          borderRadius: '8px', borderTop:'2px solid lightgray', backgroundColor: 'gray'} :
          {color: 'rgb(201, 189, 20)', borderBottom:'2px solid white', 
          borderRadius: '8px', borderTop:'2px solid white', backgroundColor: 'white'}}><p className={bu.logoTitle}>Medicine</p></NavLink>
          { animaStart && transitions((style, item) => (
              <animated.div style={style} className={bu.anima}>
                  <Booble
                      styleProps={{
                        position: 'absolute',
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        border: '1px solid white',
                        borderRadius: '50px',
                        backgroundColor: 'rgb(173, 216, 230, 0.5)',
                      }}
                  />
              </animated.div>
          ))}
        
      </div>
  )
}

export default PillOfBubble;