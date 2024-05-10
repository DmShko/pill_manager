import { FC, useState, useEffect, } from 'react';
import { nanoid } from 'nanoid';

import Select from 'react-dropdown-select';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";

import CourseItem from '../CourseItem/CourseItem';

// styles
import cd from "./CourseDashboard.module.scss";

// my components
import CourseAddBoard from '../CourseAddBoard/CourseAddBoard';

import { changeCourses, changeEditCourse, changeIsEdit, changeTempPills, changePressEdit, changeStatistic, changeStartDay } from '../../../pmStore/pmSlice';

import PillsModal from '../../PillsModal/PillsModal';

// images
import DeleteImg from '../../SvgComponents/Courses/Delete'; 

import ChangeImg from '../../SvgComponents/Courses/Edit'; 

import Reload from '../../SvgComponents/Courses/Reload'; 

import Details from '../../SvgComponents/Courses/Details'; 

import Calendar from '../../SvgComponents/Courses/pillItem/Calendar'; 

import PillImage from '../../SvgComponents/Courses/pillItem/PillImage'; 

// types
import { Content, Pill, PillDate, } from '../../../types/types';

const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const CourseDashboard: FC = () => {

  const dispatch = useAppDispatch();

  const coursesSelector = useAppSelector(state => state.courses);
  const startDateSelector = useAppSelector(state => state.startDate);
  const editCoursesSelector = useAppSelector(state => state.editCourse);
  const pressEditSelector = useAppSelector(state => state.pressEdit);
  const statisticSelector = useAppSelector(state => state.statistic);

  // search cours value
  const [isEdit, setIsEdit] = useState(false);
  
  // show/hidden 'add course' board
  const [isAddBoard, setIsAddBoard] = useState(false);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  // search cours value
  const [searchCourse, setSearchCourse] = useState('');

  // selected pillName 
  const [selectedPillName, setSelectedPillName] = useState('');

  // day name visible toggle 
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // set start day
  const [startPointDay, setStartPointDay] = useState(0);

  // set current month
  const [month, setMonth] = useState(new Date().getMonth().toString());

   // set current month
   const [pillDone, setPillDone] = useState(0);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCourse(evt.currentTarget.value);
  };

  // how many courses has 'selected' field as 'true'
  const detectSelected = () => {

    let countSelected = 0;

    coursesSelector.forEach(element => {
      if(element.selected) countSelected += 1;
    });

    return countSelected;

  };

  // get course has 'selected' field as 'true'
  const getSelectedCourse = () => {

    if(detectSelected() === 1) {

      const editCourse = coursesSelector.find(element => element.selected === true);

      if(editCourse !== undefined) return editCourse;
    };

  };

  useEffect(() => {

    // when only with edit mode
    if(detectSelected() != 1 && isEdit) {
      setIsEdit(false);
      // clear iEdit in storage
      dispatch(changeIsEdit({data: false}));
      dispatch(changePressEdit({ data: false}));
      dispatch(changeTempPills({mode: 'clearPills', data: '', key: ''}));
      setIsAddBoard(false);

      // clear edit course
      dispatch(changeEditCourse({mode: 'clearEditCourse', data: editCoursesSelector,}));
    } 

  },[coursesSelector]);

  useEffect(() => {

    // then rewrite 'Pills' in current course
    dispatch(changeCourses({mode: 'changeStartDay', data: {id: editCoursesSelector.id, prop: {name: selectedPillName, value: startPointDay.toString()},}, key: 'pills',})); 

    dispatch(changeCourses({mode: 'changeStartMounth', data: {id: editCoursesSelector.id, prop: {name: selectedPillName, value: month.toString()},}, key: 'pills',})); 
    
  },[startPointDay]);

  useEffect(() => {

    // get edit course
    const search = getSelectedCourse();
    // save edit course
    if(search !== undefined)  dispatch(changeEditCourse({mode: 'addEditCourse', data: search,}));
    
  },[isEdit]);

  useEffect(() => {

    if(!isAddBoard) {
      dispatch(changePressEdit({ data: false}));
      dispatch(changeStartDay({ data: '0'}));
      dispatch(changeTempPills({mode: 'clearPills', data: '', key: ''}));
    };
    
  },[isAddBoard]);

  useEffect(() => {

    // set current start date
    dispatch(changeStartDay({data: calcStart()[0].dateNumber}));
    
  },[statisticSelector]);

  useEffect(() => {

    setSelectedDay(Number(startDateSelector));
    
  },[startDateSelector]);

  useEffect(() => {

    if(pillDone !== 0)
    dispatch(changeStatistic({mode: 'changePillsFutures', data:{prop: {pillName: selectedPillName, futureName: 'done', dateNumber: selectedDay.toString(), value: pillDone},},}));
    
  },[pillDone]);

  useEffect(() => {

    // const getStart = getPillValue('startDay');
    // const getStart = calcStart()[0].dateNumber;
    // paint new month if search on

    // if start button click
    if(startPointDay !== 0) takePillDays();

    // if(selectedDay === 0) {

    //   setSelectedDay(0);
    //   setSelectedDay(new Date().getDate());

    // } else {
    //   setSelectedDay(Number(calcStart()));
    // };
 
    // if(getStart !== undefined && getStart != '0') {
      
    //   setSelectedDay(Number(getStart));

    // }
        
    // setStartMonth(month);
    // setStartPointDay(selectedDay);
    
  },[month]);

  const openAddBoard = () => {

    setIsAddBoard(state => !state);

  };

  const openModal = () => {
   
    // toggle modal window
    setModalToggle(state => !state);
     
  };

  const getPillValue = (data: string) => {
    
    const startDayValue = coursesSelector.find(element => element.id === editCoursesSelector.id);
 
    if(startDayValue !== undefined) {

      const startPills = startDayValue.pills.find(element => element.pillName === selectedPillName);
      
      if(startPills !== undefined){
        
        if(startPills.startDay !== '0') {
          return {status: true, value: startPills[data as keyof Pill]};
        } else {
          return {status: false, value: startPills[data as keyof Pill]};
        };

      }
    } 
  };

  const calcEnd = () => {
    const tempEnd = statisticSelector[selectedPillName];

    if(tempEnd !== undefined) {
    return tempEnd.days.filter(element => element.month === month).filter(element => element.dateNumber !== '').length;
    }
  };

  const calcStart = () => {

    const tempStart = statisticSelector[selectedPillName];
   
    let result: PillDate[] = [{position: '',
      dateNumber: '0',
      month: '', done: 0, status: false}];

    if(tempStart !== undefined) {
     
      const tempDay = tempStart.days.filter(element => element.dateNumber !== '');
     
      if(tempDay !== undefined && tempDay.length !== 0) {
       
        result = tempDay;
      }

    };
   
    return result;
    
  };

  const getDateDone = () => {
    
    const pillSelected = statisticSelector[selectedPillName];

    if(pillSelected !== undefined) {
      const day = pillSelected.days?.find(element => element.dateNumber === selectedDay.toString());

      if(day !== undefined) {
        return day.done;
      }
    }

  };

  const courseActions = (evt: React.MouseEvent<HTMLButtonElement>) => {

    // const getEnd = getPillValue('duration');
    // const getStart = getPillValue('startDay');
    
    const year = new Date().getFullYear();
    const pillMonth = month;
    const moLength = Number(new Date(year, monthes.indexOf(pillMonth), 0).toString().split(' ')[2]);

    switch(evt.currentTarget.id) {

      case 'delete':
        for(const c of coursesSelector){
          if(c.selected === true) dispatch(changeCourses({ mode: 'deleteCourse', data: c.id, key: '',}));
        }
        break;
      case 'edit':
        setIsAddBoard(true);
        dispatch(changePressEdit({ data: true}));
        break;
      case 'up':
      
        const getStartUp = calcStart()[0].dateNumber;
        const getEndUp = calcEnd();
        setPillDone(0);
        
        if(getStartUp !== '0') {

          if(getStartUp !== undefined && getEndUp !== undefined) {
            
            if(selectedDay >= Number(getStartUp) && selectedDay < (Number(getStartUp) + getEndUp) - 1) setSelectedDay(state => state += 1);
          };

        } else {
          
          if(getStartUp !== undefined && month !== undefined) {
           
            if(selectedDay >= Number(getStartUp) + 1 && selectedDay < Number(moLength)) setSelectedDay(state => state += 1);
          };
        };

        break;
      case 'down':

        const getStartDown = calcStart()[0].dateNumber;
        const getEndDown = calcEnd();
        setPillDone(0);

        if(getStartDown !== '0') {
          if(getStartDown !== undefined && getEndDown !== undefined) {
            
            if(selectedDay > Number(getStartDown) && selectedDay <= (Number(getStartDown) + getEndDown) - 1) setSelectedDay(state => state -= 1);
          };
        } else {

          if(getStartDown !== undefined && month !== undefined) {
          
            if(selectedDay > Number(getStartDown) + 1 && selectedDay <= Number(moLength)) {
             
              setSelectedDay(state => state -= 1);
            }
          };
          
        };

        break;
      case 'start':
    
        setStartPointDay(selectedDay);
        // setStartMonth(month);
        break;
      case 'reschedule':
        setStartPointDay(selectedDay);
        break;
      case 'count':
        const pillPerDay = coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay;
        const getDone = getDateDone();

        if(getDone !== undefined) {

          if(getDone< Number(pillPerDay) && pillPerDay !== undefined) {
              
            setPillDone(state => state += 1);
                
          };

        }
      
        break;
      default:
        break;
    }

  };

  const selectCourse = (evt: React.MouseEvent<HTMLLIElement>) => {

    const itemId = evt.currentTarget.id;
    
    if(!coursesSelector.find(element => element.id === itemId)?.selected) {
    
      // activated 'edit' mode
      setIsEdit(true);
      // set iEdit in storage
      dispatch(changeIsEdit({data: true}))
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: true,}, key: 'selected',})); 

    }else {
  
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: false,}, key: 'selected',})); 

    };

  };

  const messageCreator = () => {

    let message = '';

    if(pressEditSelector) message = 'EDIT mode ON';

    return message;

  };

  const takeContentCourse = () => {

    let content: Content[] = [];
    
    for(let p = 0; p < editCoursesSelector.pills.length; p += 1) {
      content = [...content, { value: p, label: editCoursesSelector.pills[p].pillName}]
    }

    return content;
  };

  const takeContentMonth = () => {

    let resultMonth: Content[] = [];
    
    for(let p = 0; p < monthes.length; p += 1) {
      resultMonth = [...resultMonth, { value: p, label: monthes[p]}]
    }

    return resultMonth;
  };

  const addDateLable = (data: PillDate[], dataFull: PillDate[], isFull: boolean) => {

    const year = new Date().getFullYear();
    let pillMonth = month;
    const startMonth = coursesSelector.find(element => element.courseName === editCoursesSelector.courseName)?.pills.
    find(element => element.pillName === selectedPillName)?.startMonth;

    let monthLength = Number(new Date(year, monthes.indexOf(pillMonth), 0).toString().split(' ')[2]);
    let counter = Number(getPillValue('startDay')?.value);
    let overCounter = 0;

    if(startMonth !== undefined) {

      if(isFull) {
        
        // load days array of full month 
        for(let dn = 0; dn < data.length; dn += 1) {

          if(data[dn].month === pillMonth && data[dn].dateNumber !== '0') {
            
            // write number of day
            dataFull[Number(data[dn].dateNumber) - 1].dateNumber = data[dn].dateNumber;
            // write month name
            dataFull[Number(data[dn].dateNumber) - 1].month = data[dn].month;
          } 
        
        };

      } else {

        for(let dn = 0; dn < data.length; dn += 1) {
          
            if(counter !== undefined && counter <= monthLength) {
              // write number of day
              data[dn].dateNumber = counter.toString();
              // write month name
              data[dn].month = startMonth.toString();
            } else {
              
              if(monthes.indexOf(startMonth) !== 12) {
          
                // rewrite month (data don't fit to previous month)
                pillMonth = monthes[(monthes.indexOf(startMonth) + 1)].toString();
                
                // get length for new month
                monthLength = Number(new Date(year, monthes.indexOf(startMonth), 0).toString().split(' ')[2]);

                // write number of day
                data[dn].dateNumber = overCounter.toString();
                // write month name
                data[dn].month = pillMonth.toString();

                if(counter !== data.length - 1) overCounter += 1;
              }
            };

            counter += 1;
        };
      }

    }

  };

  const takePillDays = () => {
    
    const year = new Date().getFullYear();
    let pillMonth = month;
    let monthLength = Number(new Date(year, monthes.indexOf(pillMonth), 0).toString().split(' ')[2]);

    const daysQuantity = editCoursesSelector.pills.find(element => element.pillName === selectedPillName)?.duration;
    
    let days: PillDate[] = [];
    let fullMonth: PillDate[] = [];

    // generate pill days array
    for(let f=0; f < Number(daysQuantity); f += 1) {
      days = [...days, {position: (f + 1).toString(), dateNumber: '', month: '', done: 0, status: false}];
    };

    // ...and fill his
    addDateLable(days, [], false);
    
    // generate full month days array
    for(let fm=0; fm < Number(monthLength); fm += 1) {
      fullMonth = [...fullMonth, {position: (fm + 1).toString(), dateNumber: '', month: pillMonth, done: 0, status: false}];
    };
    // ...and fill his
    addDateLable(days, fullMonth, true);

    // write days;
    dispatch(changeStatistic({mode: 'changePillsDay', data:{prop: {name: selectedPillName, value: fullMonth, start: startPointDay.toString()}},}));
    
  };

  const dayStyle = (data: string) => {

    let result = {};

    const getDone = getDateDone();
    const perDay = coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay;
    
    if(getDone !== undefined) {

      const gradientDone = 360 / Number(perDay) * getDone;

      if(gradientDone === 360) {
        if(selectedDay.toString() === data){
          if(data !== '') {
            result= {boxShadow: '1px 1px 4px 3px yellowgreen', backgroundColor: 'yellowgreen'};
          } else {
            result= {boxShadow: '1px 1px 4px 3px yellowgreen', backgroundColor: '#F0F0F0'};
          };
          
        } else {
          if(data !== '') {
            result= {boxShadow: 'lightgray'};
          } else {
            result= {backgroundColor: '#F0F0F0'};
          };
        };
    
      } else {
        if(selectedDay.toString() === data){
          if(data !== '') {
            result= {boxShadow: '1px 1px 4px 3px yellowgreen', backgroundColor: '#FDB12D'};
          } else {
            result= {boxShadow: '1px 1px 4px 3px yellowgreen', backgroundColor: '#F0F0F0'};
          };
          
        } else {
          if(data !== '') {
            result= {backgroundColor: 'lightgray'};
          } else {
            result= {backgroundColor: '#F0F0F0'};
          };
        };
    
      };

    };

    return result;
   
  };

  const doneStyle = () => {

    const getDone = getDateDone();
    const perDay = coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay;
    
    if(getDone !== undefined) {

      const gradientDone = 360 / Number(perDay) * getDone;
      var colorDone = '';

      if(gradientDone === 360) {
        colorDone = 'yellowgreen';
      } else {
        colorDone = '#FDB12D';
      };

      return {background: `conic-gradient(${colorDone}, ${gradientDone}deg, lightgray)`};
    };
    
  };

  return (
    <>
      
      <button type='button' onClick={openAddBoard}>{pressEditSelector ? 'Close' : isAddBoard ? 'Close' : 'New course'}</button>
     

      <div className={cd.courses}>

        {isAddBoard && <CourseAddBoard/>}

        <div className={cd.searchContainer}>

          <div className={cd.courseDashboard}>
              <label className={cd.search}>
                  <input 
                    value={searchCourse}
                    className={cd.in}
                    type="text"
                    name='search'              
                    onChange={handleChange}
                    autoComplete='false'
                    title="search"
                    placeholder='Courses...'
                  />
              </label>  

          </div>
            
          <div className={cd.coursesDrive}>
            <button className={cd.coursesButton} id='edit' onClick={courseActions} type='button' disabled={!isAddBoard ? detectSelected() > 0 && detectSelected() <= 1 ? false : true : true}><ChangeImg width={'25px'} height={'25px'} stroke={!isAddBoard ? detectSelected() > 0 && detectSelected() <= 1 ? '#646cff' : 'lightgray' : '#646cff'}/></button>
            <button className={cd.coursesButton} id='delete' onClick={courseActions} type='button' disabled={detectSelected() !== 0 ? false : true}><DeleteImg width={'25px'} height={'25px'} stroke={detectSelected() !== 0 ? '#646cff' : 'lightgray'}/></button>
            <button className={cd.coursesButton} id='reload' onClick={courseActions} type='button' disabled={detectSelected() !== 0 ? false : true}><Reload width={'25px'} height={'25px'}/></button>
            <button className={cd.coursesButton} id='details' onClick={openModal} type='button' disabled={detectSelected() !== 0 ? false : true}><Details width={'25px'} height={'25px'} fill={detectSelected() !== 0 ? '#646cff' : 'lightgray'}/></button>
          </div>

          <div className={cd.coursesInfo}>
            <p className={cd.text}>{`${messageCreator()}`}</p>
          </div>

        </div>

        {modalToggle && <PillsModal openClose={openModal} selectedDayDrive={setSelectedDay} pillNameReset={setSelectedPillName}>

          <div className={cd.modalContainer}>

            <div className={cd.dashContainer}>

              <div className={cd.dashSelect}>
                <PillImage width={'25px'} height={'25px'}/>
                <Select
                  options={takeContentCourse()}
                  className={cd.select}
                  style={{borderRadius: '8px'}}
                  name='course'
                  values={[]}
                  onChange={(value) => {               

                      setSelectedPillName(value[0].label)
                      
                    }
                  }
                />
              </div>

              <div className={cd.dashSelect}>
                <Calendar width={'25px'} height={'25px'}/>
                <Select
                  options={takeContentMonth()}
                  className={cd.select}
                  style={{borderRadius: '8px'}}
                  name='month'
                  values={[]} //only [[{}...]...] format
                  onChange={(value) => {
                      
                      setMonth(value[0].label);

                      // go to 153 row
                    }
                  }
                />
              </div>

              <div className={cd.currentDay}>
                <button type='button' className={cd.currentDayButton} id='down' onClick={courseActions}></button>
                <div>{selectedDay.toString()}</div>
                <button type='button' className={cd.currentDayButton} id='up' onClick={courseActions}></button>

                <div className={cd.modalDashbord}>
                  <button type='button' id='start' className={cd.startButton} onClick={courseActions} disabled={getPillValue('startDay')?.status ? true: false}><span>Start</span></button>
                </div>

              </div>

              <div className={cd.days}>

                <ul className={cd.modalList}>

                  {getPillValue('startDay')?.status && Object.keys(statisticSelector).includes(selectedPillName) ? statisticSelector[selectedPillName].days.map(element => {
                    return(
                      month === element.month ? <li className={cd.item} key={nanoid()} id={element.position} style={dayStyle(element.dateNumber)}>{element.position}</li> : ''
                    )
                  }): ''}

                </ul>
                
              </div>
     
            </div>

            <div className={cd.dayContainer}>

              <div className={cd.dayDone} style={doneStyle()}>

                <div className={cd.dayDoneContent}>
        
                  {getDateDone() !== undefined ? <p><span className={cd.doneDay}>{`${getDateDone()} /`}</span> <span className={cd.perDay}>{`${coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay}`}</span> </p> : ''}  

                </div>
               
              </div>

              <button type='button' id='count' className={cd.countButton} onClick={courseActions}><span>Count</span></button>
              <button type='button' id='reschedule' className={cd.rescheduleButton} onClick={courseActions}><span>Reschedule</span></button>

            </div>

          </div>
          
        </ PillsModal>}

        <ul className={cd.coursesList}>
          {coursesSelector.length !== 0 ? coursesSelector.map(element => 
            {
              return <li className={cd.courseItem} key={nanoid()} id={element.id} 
              style={element.selected ? {backgroundColor:'rgb(255, 179, 0, 0.8)'} : {backgroundColor:''}} onClick={selectCourse}><CourseItem courses={element}/></li> 
            }
          ) : 'There are no courses'}
        </ul> 
      </div>
    </>  
  )
};

export default CourseDashboard;