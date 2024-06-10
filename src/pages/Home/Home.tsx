import { FC, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

import PageContainer from '../../components/PageContainer/PageContainer';

// images
import MedicineCard from '../../components/SvgComponents/Courses/MedicineCard';
import Get from '../../components/SvgComponents/Courses/Medicine/Medicine-get';
import Create from '../../components/SvgComponents/Courses/Medicine/Medicine-create';
import Reschedule from '../../components/SvgComponents/Courses/Medicine/Medicine-reschedule';
import Correct from '../../components/SvgComponents/Courses/Medicine/Medicine-correct';
import Details from '../../components/SvgComponents/Courses/Medicine/Medicine-details';
import DontMiss from '../../components/SvgComponents/Courses/Medicine/Medicine-miss';
import Process from '../../components/SvgComponents/Courses/Medicine/Medicine-process';
import Memory from '../../components/SvgComponents/Courses/Medicine/Medicine-memory';

// styles
import ho from './Home.module.scss';

// types
import { Cards } from '../../types/types'; 

const etalon = ['p', 'i', 'l', 'l', 's'];
const plus = ['8', '12', '13', '14', '18'];

let buffer: string[] = [];

const Home: FC = () => {

  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

  const [ cards, setCards ] = useState<Cards[]>(genCard());
  const [ wordCount, setWordCount ] = useState(0);
  const [ final, setFinal ] = useState(false);
 
  useEffect(() => {

    if(wordCount === 4) {
      
      if(seccess()) {

        setFinal(false);

      } else {
        setFinal(true);
      };

      setWordCount(0);
      resetCards();
    };

  },[wordCount]);
 
  function genCard() {

    return [{value: 'P', status: false, id: '1',}, {value: 'I', status: false, id: '2',}, {value: 'L', status: false, id: '3',}, {value: 'L', status: false, id: '4',}, {value: 'S', status: false, id: '5',}, {value: 'I', status: false, id: '6',}, {value: 'P', status: false, id: '7',}, {value: 'L', status: false, id: '8',}, {value: 'S', status: false, id: '9',}, {value: 'L', status: false, id: '10',}, {value: 'L', status: false, id: '11',}, {value: 'L', status: false, id: '12',}, {value: 'P', status: false, id: '13',}, {value: 'L', status: false, id: '14',}, {value: 'L', status: false, id: '15',}, {value: 'L', status: false, id: '16',}, {value: 'S', status: false, id: '17',}, {value: 'L', status: false, id: '18',}, {value: 'P', status: false, id: '19',}, {value: 'I', status: false, id: '20',}, {value: 'S', status: false, id: '21',}, {value: 'L', status: false, id: '22',}, {value: 'L', status: false, id: '23',}, {value: 'I', status: false, id: '24',}, {value: 'P', status: false, id: '25',}]

  };

  const toBuffer = ( data: string) => {
     
      if(data.toLowerCase() === etalon[buffer.length].toLowerCase()) {

        if(buffer.length !== etalon.length - 1) {

          buffer = [...buffer, data];

        } else {
         
          buffer = [];
    
          setWordCount(state => state += 1);
    
        };

      } else {

        setWordCount(0);
        buffer = [];
        resetCards();

      };

  };

  const seccess = () => {

    let result = false;

    for(const p of plus) {

      let tempCard = cards.find(element => element.id === p);

      if(tempCard !== undefined && tempCard.status === true) {
        result = true;
        break;
      };
    };

    return result;

  };

  const resetCards = () => {

    // reset cards
    let temp = cards;

    for(const c of temp) {

      c.status = false;

    };

    setCards([...temp]);

  };

  const cardSearchHandler = (evt: React.MouseEvent<HTMLLIElement>) => {

    let temp = cards;

    let tempCard = temp.find(element => element.id === evt.currentTarget.id);

    if(tempCard !== undefined && tempCard.status !== true) {
      tempCard.status = true;
      
      setCards([...temp]);

      toBuffer(tempCard.value);
    }
 
  };

  return (
    <PageContainer>

      <div className={ho.container}>

        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
          
          <p className={ho.infoText}>{languageSelector === 'En' ? "Don't keep the recipe in your head" : 'Не тримайте рецепт в голові'}</p>
          <Memory  width={'70px'} height={'70px'}/>
        
        </div>

        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
        
          <p className={ho.infoText}>{languageSelector === 'En' ? 'Control what medicine you drank' : 'Контролюйте, які ліки ви пили'}</p>
          <Get  width={'70px'} height={'70px'}/>
        
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
          
          <p className={ho.infoText}>{languageSelector === 'En' ? 'Correct the prescription and list of medicines' : 'Відкоригувати рецепт та перелік ліків'}</p>
          <Correct  width={'70px'} height={'70px'}/>
        
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
          
          <p className={ho.infoText}>{languageSelector === 'En' ? 'Reschedule if you missed it' : 'Перенесіть, якщо ви його пропустили'}</p>
          <Reschedule width={'70px'} height={'70px'}/>

        </div>

        {!final ? <p>{languageSelector === 'En' ? "Match four words 'PILLS' to get a cross in the middle" : "Збери чотири слова 'PILLS', щоб отримати хрест посередині"}</p> : ''}

        <div className={ho.block} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'white'}}>
          
          {!final ? <ul className={ho.list}>
 
            {
              cards.map(element => { 
                return <li className={ho.item} key={nanoid()} id={element.id} onClick={cardSearchHandler} style={element.status ? {backgroundColor: 'rgb(253, 177, 45)'}: lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'white'}}>{element.value}</li>
              })
            }
            
          </ul> : <MedicineCard width={'130px'} height={'130px'}/>}
        
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
       
          <p className={ho.infoText}>{languageSelector === 'En' ? 'A convenient interface will help you better control the process' : 'Зручний інтерфейс допоможе краще контролювати процес'}</p>
          <Process width={'70px'} height={'70px'}/>
        
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
          
          <p className={ho.infoText}>{languageSelector === 'En' ? 'Create many courses, correct, delete' : 'Створювати багато курсів, виправляти, видаляти'}</p>
          <Create width={'70px'} height={'70px'}/>
        
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
          
          <p className={ho.infoText}>{languageSelector === 'En' ? "Don't miss anything" : 'Нічого не пропустіть'}</p>
          <DontMiss width={'70px'} height={'70px'}/>
          
        </div>
        
        <div className={ho.blockInfo} style={lightModeSelector === 'dark' ? !final ? {visibility: 'hidden', height: 0 } : {visibility: 'visible', backgroundColor: '#4b51b9'} : !final ? {visibility: 'hidden', height: 0} : {visibility: 'visible', backgroundColor: 'white'}}>
       
          <p className={ho.infoText}>{languageSelector === 'En' ? 'Note the important details' : 'Зверніть увагу на важливі деталі'}</p>
          <Details width={'70px'} height={'70px'}/>

        </div>

      </div>
     
    </PageContainer>
  )
}

export default Home