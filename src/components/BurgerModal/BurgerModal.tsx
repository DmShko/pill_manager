import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

const modalRoot = document.querySelector('#root-modal-burger') as HTMLElement;

import mom from './BurgerModal.module.scss'

const ModalMenu: FC<PropsWithChildren> = ({ children }) => {

  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  
    useEffect(() => {

        document.body.style.overflow = 'hidden'
        
        return () => {
          document.body.style.overflow = 'scroll'
        };
       // eslint-disable-next-line
    }, []);
   

return createPortal(

    <div className={mom.container} style={lightModeSelector === 'dark' ? {backgroundColor:'rgb(75, 81, 185)'} : {backgroundColor:'white'}}>
        { children }
    </div>, modalRoot

  )
};

export default ModalMenu