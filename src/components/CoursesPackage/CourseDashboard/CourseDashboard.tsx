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

import getCoursesAPI from '../../../API/getCoursesAPI';
import updateByIdAPI from '../../../API/deleteCourseAPI';
import allStatisticAPI from '../../../API/allStatisticAPI';
import addStatisticAPI from '../../../API/addStatisticAPI';
import patchStatisticAPI from '../../../API/patchStatisticAPI';
import patchCourseAPI from '../../../API/patchCourseAPI';

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

  const coursesSelector = useAppSelector(state => state.pm.courses);
  const startDateSelector = useAppSelector(state => state.pm.startDate);
  const editCoursesSelector = useAppSelector(state => state.pm.editCourse);
  const pressEditSelector = useAppSelector(state => state.pm.pressEdit);
  const statisticSelector = useAppSelector(state => state.pm.statistic);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const reloadCourseSelector = useAppSelector(state => state.getCourses.freshCourses);
  const statisticsSelector = useAppSelector(state => state.getStatistic.statistics);
  const isAddStatistic = useAppSelector(state => state.addStatistic.isLoad);
  const isGetStatistic = useAppSelector(state => state.getStatistic.isLoad);
  const isPatchStatistic = useAppSelector(state => state.patchStatistic.isLoad);

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

  // set start day
  const [countPress, setCountPress] = useState(false);

  // set current month
  const [month, setMonth] = useState(monthes[new Date().getMonth()]);

  // set done future
  const [pillDone, setPillDone] = useState(0);

  // set reload month
  const [reload, setReload] = useState(false);

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
  
    if((modalToggle && isAddStatistic) || (modalToggle && isPatchStatistic)) dispatch(allStatisticAPI({token: tokenSelector}));
    
  },[isAddStatistic, isPatchStatistic, month]);

  useEffect(() => {
   
    if(isGetStatistic) {
      
      // refresh calendar days
      const calendarStatDays = statisticSelector[selectedPillName];
        
      if(calendarStatDays !== undefined && statisticsSelector.length !== 0) {

        for(const e of statisticsSelector) {
          
          for(const d of calendarStatDays.days) {
            
            if(d.dateNumber === e.dateNumber && e.pillName === selectedPillName)
            
            // change future 'done' in statistic day
            dispatch(changeStatistic({mode: 'changePillsFutures', data:{prop: {pillName: selectedPillName, futureName: 'done', dateNumber: d.dateNumber, value: e.done},},}));
          };
        
        };

      }; 
    };
    
  },[isGetStatistic]);
  
  useEffect(() => {
   
    let getPill = statisticSelector[selectedPillName];

    if(getPill !== undefined) {

      const getDay = getPill.days.find(element => element.dateNumber === selectedDay.toString());

      if(getDay !== undefined) {

        setPillDone(getDay.done);
        
      }
     
    }

  },[selectedDay]);

  useEffect(() => {

    dispatch(changeCourses({mode: 'reloadCourses', data: reloadCourseSelector, key: ''}));
    
  },[reloadCourseSelector]);

  useEffect(() => {

    if(tokenSelector !== '') dispatch(getCoursesAPI({token: tokenSelector,}));
   
  },[reload]);

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
    dispatch(changeCourses({mode: 'changeStartDay', data: {_id: editCoursesSelector._id, prop: {name: selectedPillName, value: startPointDay.toString()},}, key: 'pills',})); 

    dispatch(changeCourses({mode: 'changeStartMounth', data: {_id: editCoursesSelector._id, prop: {name: selectedPillName, value: month.toString()},}, key: 'pills',})); 
    
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
    
    if(pillDone !== 0 && countPress) {
  
    setCountPress(false);
    // change future 'done' in statistic day
    // dispatch(changeStatistic({mode: 'changePillsFutures', data:{prop: {pillName: selectedPillName, futureName: 'done', dateNumber: selectedDay.toString(), value: pillDone},},}));

    // search 'pill' in current course statistic
    const statisticPill = statisticSelector[selectedPillName];

    // is day with id of current already pill present in statistics
    let isPillDay = false;
    let pillId = '';

    let doneDay: PillDate = {position: '',
      dateNumber: '',
      month: '',
      done: 0,
      status: false,};

    const pillInStatistic = statisticsSelector.find(element => element.dateNumber === selectedDay.toString());

    if(pillInStatistic !== undefined && pillInStatistic.pillName === selectedPillName) {
      isPillDay = true;
      pillId = pillInStatistic._id;
    } 
  
    if(statisticPill !== undefined) {
     
      const dayStatistic = statisticPill.days.find(element => element.dateNumber === selectedDay.toString());
      if(dayStatistic !== undefined)
      doneDay = dayStatistic;
    };
   
    // after load all statistic, check all statistic length does't equal 0
    if(statisticsSelector.length === 0 && doneDay != undefined || !isPillDay) {
     
      // write change Pill statistic to DB
      dispatch(addStatisticAPI({token: tokenSelector, data: {_id: nanoid(), pillName: selectedPillName, dateNumber: doneDay.dateNumber,
        month: doneDay.month,
        done: pillDone,
        status: doneDay.status}}));
    } else {

      // write change Pill statistic to DB
      dispatch(patchStatisticAPI({token: tokenSelector, data: {id: pillId, prop: {key: 'done', value: pillDone,}}}));
    };

  }

  },[pillDone]);
  //         ^, countPress
  
  useEffect(() => {

    // first start load start point day for selected month
    const searchCours = coursesSelector.find(element => element._id === editCoursesSelector._id);
    
    if(searchCours !== undefined) {
      const pill = searchCours.pills.find(element => element.pillName === selectedPillName);

      if(pill !== undefined) {

        setStartPointDay(0);

        if(Number(pill.startDay) !== 0) {
          setStartPointDay(Number(pill.startDay));

          // auto set after reselevt 'pillName'
          setSelectedDay(Number(pill.startDay));
        } 

      }

    }

    // first start load statistic
    dispatch(allStatisticAPI({token: tokenSelector}));
    
  },[selectedPillName]);

  useEffect(() => {

    // first start load statistic
    if(statisticsSelector.length === 0) dispatch(allStatisticAPI({token: tokenSelector}));

    // if start button click
    if(startPointDay !== 0) takePillDays();
    
  },[month]);

  const openAddBoard = () => {

    setIsAddBoard(state => !state);

  };

  const openModal = () => {
   
    // toggle modal window
    setModalToggle(state => !state);
     
  };

  const getPillValue = (data: string) => {
    
    const startDayValue = coursesSelector.find(element => element._id === editCoursesSelector._id);
 
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
     
      const tempDay = tempStart.days.filter(element => element.dateNumber !== '').filter(element => element.month === month);
     
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

  const getDoneVisible = () => {
    
    const pillSelected = statisticSelector[selectedPillName];

    if(pillSelected !== undefined) {
      const day = pillSelected.days?.find(element=> element.dateNumber === selectedDay.toString());

      if(day !== undefined && day.month === month) {
        
        return day.done;

      }
    }

  };

  const courseActions = (evt: React.MouseEvent<HTMLButtonElement>) => {

    const year = new Date().getFullYear();
    const pillMonth = month;
    const moLength = Number(new Date(year, monthes.indexOf(pillMonth), 0).toString().split(' ')[2]);

    switch(evt.currentTarget.id) {

      case 'delete':
        for(const c of coursesSelector){
          if(c.selected === true) {
            dispatch(changeCourses({ mode: 'deleteCourse', data: c._id, key: '',}));
            dispatch(updateByIdAPI({ token: tokenSelector,  id: c._id,}));
          }
        }
        break;
      case 'edit':
        setIsAddBoard(true);
        dispatch(changePressEdit({ data: true}));
        break;
      case 'reload':
        setReload(state => !state);  
        break;
      case 'up':
      
        const getStartUp = calcStart()[0].dateNumber;
        const getEndUp = calcEnd();

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

        setCountPress(true);
        const pillPerDay = coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay;
        const getDone = getDateDone();
      
        if(getDone !== undefined) {
           
          if(getDone < Number(pillPerDay) && pillPerDay !== undefined) {
            
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
    
    if(!coursesSelector.find(element => element._id === itemId)?.selected) {
    
      // activated 'edit' mode
      setIsEdit(true);
      // set iEdit in storage
      dispatch(changeIsEdit({data: true}))
      dispatch(changeCourses({mode: 'changeCourse', data: {_id: itemId, prop: true,}, key: 'selected',})); 

    }else {
  
      dispatch(changeCourses({mode: 'changeCourse', data: {_id: itemId, prop: false,}, key: 'selected',})); 

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

          if(data[dn].dateNumber !== '0') {

            for(const f of dataFull) {
              if(f.month === data[dn].month && Number(f.position) === Number(data[dn].dateNumber)) {
              
                // write number of day
                f.dateNumber = data[dn].dateNumber;
                // write month name
                f.month = data[dn].month;
                
              }
            };
         
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

  const howMonthsInDays = async (value: PillDate []) => {

    let howMonth: string [] = [];
       
    for(const e of value) {
      if(monthes.includes(e.month) && !howMonth.includes(e.month)) howMonth = [...howMonth, e.month];
    };
   
    // howMonth contain only month name from 'days' months name set
    return howMonth;

  };

  const takePillDays = () => {

    const searchCours = coursesSelector.find(element => element._id === editCoursesSelector._id);
    let pills: Pill[] = [];
    if(searchCours !== undefined) pills = searchCours.pills;
    
    const year = new Date().getFullYear();

    const daysQuantity = editCoursesSelector.pills.find(element => element.pillName === selectedPillName)?.duration;
    
    let days: PillDate[] = [];
    let fullMonth: PillDate[] = [];

    // generate pill days array
    for(let f=0; f < Number(daysQuantity); f += 1) {
      days = [...days, {position: (f + 1).toString(), dateNumber: '', month: '', done: 0, status: false}];
    };

    // ...and fill his
    addDateLable(days, [], false);
   
    /**How months contain 'days' */

      howMonthsInDays(days).then(value => {

        for(let m=0; m < value.length; m += 1) {

          // generate length for current month from value (howMonth -> see 523 row)
          const monthLength = Number(new Date(year, monthes.indexOf(value[m]), 0).toString().split(' ')[2]);
          
          // generate full month days array
          for(let fm=0; fm < Number(monthLength); fm += 1) {
           
            fullMonth = [...fullMonth, {position: (fm + 1).toString(), dateNumber: '', month: value[m], done: 0, status: false}];
          
          };
        
        };

        // ...and fill his
        addDateLable(days, fullMonth, true);
 
        // write days;
        dispatch(changeStatistic({mode: 'changePillsDay', data:{prop: {name: selectedPillName, value: fullMonth, start: getPillValue('startDay')?.value as string}},}));

        // write change row 678 to DB refresh 'pills' (save startDay value)
        dispatch(patchCourseAPI({token: tokenSelector, id: editCoursesSelector._id, prop: pills, key: 'pills',}));

      });  
    /** */
    
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
            result= {outlineStyle: 'solid', outlineWidth: '2px', outlineColor: '#646cff', backgroundColor: 'yellowgreen'};
          } else {
            result= {outlineStyle: 'solid', outlineWidth: '2px', outlineColor: '#646cff', backgroundColor: '#F0F0F0'};
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
            result= {outlineStyle: 'solid', outlineWidth: '2px', outlineColor: '#646cff', backgroundColor: '#FDB12D'};
          } else {
            result= {outlineStyle: 'solid', outlineWidth: '2px', outlineColor: '#646cff', backgroundColor: '#F0F0F0'};
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
      
      <button className={cd.newButton} type='button' onClick={openAddBoard}>{pressEditSelector ? 'Close' : isAddBoard ? 'Close' : 'New course'}</button>
     

      <div className={cd.courses}>

        {isAddBoard && <CourseAddBoard openClose={openAddBoard}/>}

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
                <div className={cd.currentDayData}>{selectedDay.toString()}</div>
                <button type='button' className={cd.currentDayButton} id='up' onClick={courseActions}></button>

                <div className={cd.modalDashbord}>
                  {startPointDay === 0 ? <button type='button' id='start' className={cd.startButton} onClick={courseActions} disabled={getPillValue('startDay')?.status ? true: false}><span>Start</span></button> : ''}
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
        
                  {getDoneVisible() !== undefined ? <p><span className={cd.doneDay}>{`${getDoneVisible()} /`}</span> <span className={cd.perDay}>{`${coursesSelector.find(element => element.selected === true)?.pills.find(element => element.pillName === selectedPillName)?.perDay}`}</span> </p> : ''}  

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
              return <li className={cd.courseItem} key={nanoid()} id={element._id} 
              style={element.selected ? {backgroundColor:'rgb(255, 179, 0, 0.8)'} : {backgroundColor:''}} onClick={selectCourse}><CourseItem courses={element}/></li> 
            }
          ) : 'There are no courses'}
        </ul> 
      </div>
    </>  
  )
};

export default CourseDashboard;