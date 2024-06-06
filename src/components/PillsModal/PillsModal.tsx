import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

import pm from './PillsModal.module.scss'

import { PillsModalProps } from '../../types/types';

const PillsModal: FC<PropsWithChildren<PillsModalProps>> = ({ children, openClose, selectedDayDrive, pillNameReset }) => {

  const lightModeSelector = useAppSelector(state => state.pm.lightMode);

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    // reset to current date after open modal window
    selectedDayDrive(new Date().getDate());
    
    return () => {
      document.body.style.overflow = 'scroll'

      // reset to current date before close modal window
      selectedDayDrive(new Date().getDate());

      // reset pill name before close modal window
      pillNameReset('');
    };
   // eslint-disable-next-line
  }, []);

  // close modal window by click on backdrob
  const clickBackdrob = (evt: React.MouseEvent<HTMLDivElement>) => {

    if (evt.target === evt.currentTarget){
    
      //close modal window
      openClose();
    } 
  };

return createPortal(
    <div className={pm.backdrop} onClick={clickBackdrob} style={{top: `${window.scrollY}px`}}>

        <div className={pm.container} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', border: '2px solid lightgray'} : {backgroundColor: 'white'}}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default PillsModal