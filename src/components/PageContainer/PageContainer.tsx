import { FC } from 'react';

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

//styles
import pec from './PageContainer.module.scss';

const PageContainer: FC<any> = ({ children }) => {

  const lightModeSelector = useAppSelector(state => state.pm.lightMode);

  return (
   
    <section className={pec.container} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', border: '2px solid lightgray'} : {backgroundColor: 'white'}}>{children}</section>
    
  )
}

export default PageContainer