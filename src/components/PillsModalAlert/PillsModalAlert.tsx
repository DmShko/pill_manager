import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

import pma from './PillsModalAlert.module.scss'

const PillsModalAlert: FC<PropsWithChildren> = ({ children }) => {

return createPortal(

    <div className={pma.backdrop} style={{top: `${window.scrollY}px`}}>

        <div className={pma.container}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default PillsModalAlert