import { createPortal } from "react-dom";
import { FC, KeyboardEvent, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

import pm from './PillsModal.module.scss'

import { PillsModalProps } from '../../types/types';

const PillsModal: FC<PropsWithChildren<PillsModalProps>> = ({ children, openClose }) => {

  // close modal window by click on backdrob
  const clickBackdrob = (evt: React.MouseEvent<HTMLDivElement>) => {

    if (evt.target === evt.currentTarget){
    
      //close modal window
      openClose();
    } 
  };

return createPortal(
    <div className={pm.backdrop} onClick={clickBackdrob}>

        <div className={pm.container}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default PillsModal