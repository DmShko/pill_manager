import { useState, useEffect } from 'react';

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

import lt from './LangToggle.module.scss';

import { changeLangMode } from '../../pmStore/pmSlice';

import { LangType } from '../../types/types';

const LangToggle = () => {

  const dispatch = useAppDispatch();

  const [langToggle, setLangToggle] = useState(LangType.en);

  useEffect(() => {
    dispatch(changeLangMode({ data: langToggle}));
  },[langToggle]);

  const langChange = () => {

    if(langToggle === LangType.en) {

        setLangToggle(LangType.ua);

    } else {
        setLangToggle(LangType.en);
    };
    

  };

  return (
    <div className={lt.comtainer} onClick={langChange}>
       
        <p>{langToggle}</p>
        
    </div>
  )
};

export default LangToggle