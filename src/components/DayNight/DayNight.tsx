import { FC, useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 

import dn from './DayNight.module.scss';

// images
import Day from '../SvgComponents/Courses/DayNight/Day';

import Night from '../SvgComponents/Courses/DayNight/Night';

import { changeLightMode } from '../../pmStore/pmSlice';

// types
import { LightModeType } from '../../types/types';

const DayNight: FC = () => {

  const dispatch = useDispatch();

  const [ lightMode, setLightMode ] = useState<LightModeType>(LightModeType.light);

  useEffect(() => {
    dispatch(changeLightMode({ data: lightMode}));
  },[lightMode])

  return (
    <div className={dn.container} style={lightMode === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'lightgray'}}>

        <div className={dn.day} onClick={() => setLightMode(LightModeType.light)} style={lightMode === 'light' ? {backgroundColor: 'rgb(253, 177, 45)', boxShadow: '1px 0 3px 3px #b2b2b3, -1px -1px 1px 3px #f4f4f5'}: {boxShadow: '1px 0 3px 3px #363b8d, -1px -1px 1px 3px #f4f4f5'}}><Day width={'15px'} height={'15px'} /></div>
        <div className={dn.night} onClick={() => setLightMode(LightModeType.dark)} style={lightMode === 'dark' ? {backgroundColor: 'rgb(253, 177, 45)', boxShadow: '1px 0 3px 3px #363b8d, -1px -1px 1px 3px #f4f4f5'}: {backgroundColor: ''}}><Night width={'15px'} height={'15px'} /></div>

    </div>
  )
}

export default DayNight