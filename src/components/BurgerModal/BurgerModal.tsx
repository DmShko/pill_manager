import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal-burger') as HTMLElement;

import { MenuModalProps } from '../../types/types';

import mom from './BurgerModal.module.scss'

const ModalMenu: FC<PropsWithChildren<MenuModalProps>> = ({ children }) => {

    useEffect(() => {

        document.body.style.overflow = 'hidden'
        
        return () => {
          document.body.style.overflow = 'scroll'
        };
       // eslint-disable-next-line
    }, []);
   

return createPortal(

    <div className={mom.container}>
        { children }
    </div>, modalRoot

  )
};

export default ModalMenu