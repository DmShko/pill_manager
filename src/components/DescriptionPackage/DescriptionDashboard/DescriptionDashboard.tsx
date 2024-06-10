import { useEffect, useState }from 'react';

import { useNavigate } from 'react-router-dom'; 

import { useFormik } from "formik"; 

import Select from 'react-dropdown-select';

import * as Yup from 'yup';

import { nanoid } from 'nanoid';

import addDescriptionAPI from '../../../API/addDescriptionAPI';
import allDescriptionAPI from '../../../API/allDescriptionAPI';
import deleteDescriptionAPI from '../../../API/deleteDescriptionAPI';
import putDescriptionAPI from '../../../API/putDescriptionAPI';

// types
import { Content, } from '../../../types/types';

// images
import Add from '../../SvgComponents/Courses/Add'; 
import DeleteImg from '../../SvgComponents/Courses/Delete'; 
import Reload from '../../SvgComponents/Courses/Reload'; 
import ChangeImg from '../../SvgComponents/Courses/Edit'; 
import Horn from '../../SvgComponents/Courses/Modal/Horn'; 

import { changePutDescription } from '../../../pmStore/putDescriptionStore';
import { changeDeleteDescription } from '../../../pmStore/deleteDescription';
import { changeAddDescription } from '../../../pmStore/addDescription';
import { changeDescription } from '../../../pmStore/getDescriptions';
import { changeSingIn } from "../../../pmStore/signInStore"; 

import PillsModalAlert from '../../PillsModalAlert/PillsModalAlert';
import Loading from '../../SvgComponents/Courses/Loading/Loading';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";

import pd from './DescriptionDashboard.module.scss';

const DescriptionDashboard = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const coursesSelector = useAppSelector(state => state.pm.courses);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const addDescriptionLoadSelector = useAppSelector(state => state.addDescription.isLoad);
  const deleteDescriptionSelector = useAppSelector(state => state.deleteDescription.isDelete);
  const putDescriptionSelector = useAppSelector(state => state.putDescription.isChange);
  const descriptionSelector = useAppSelector(state => state.getDescriptions.description);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);
  const putMessageSelector = useAppSelector(state => state.putDescription.message);
  const deleteMessageSelector = useAppSelector(state => state.deleteDescription.message);
  const addMessageSelector = useAppSelector(state => state.addDescription.message);
  const addLoadingSelector = useAppSelector(state => state.addDescription.isLoading);
  const logOutMessageSelector = useAppSelector(state => state.logout.message);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

  const [ fresh, setFresh ] = useState(false);
  const [ allSelect, setAllSelect ] = useState(false);
  const [ areaContext, setAreaContext ] = useState<string[]>([]);
  const [ change, setChange ] = useState(false);
  const [ courseName, setSelectedCourseName ] = useState('');
  const [ alertModalToggle, setAlertModalToggle] = useState(false);

  useEffect(() => {

    dispatch(allDescriptionAPI({token: tokenSelector}));

  },[]);

  useEffect(() => {
  
    if(isLogOutSelector || logOutMessageSelector === 'Unauthorized' || logOutMessageSelector === 'Network Error') {

      dispatch(changeSingIn({operation: 'clearToken', data: ''}));
      navigate('/signin');

    };
    
  },[isLogOutSelector, logOutMessageSelector]);

  useEffect(() => {
  
    if(courseName !== '' && detectSelected() === 0) {
      
      const currentCourse = coursesSelector.find(element => element.courseName === courseName);
      
      if(currentCourse !== undefined && currentCourse.courseName !== undefined) {

        let desc = '';

        for(let p = 0; p < currentCourse?.pills.length; p += 1) {

          desc += `${p + 1}. ${currentCourse?.pills[p].pillName.toUpperCase()} приймати ${currentCourse?.pills[p].perDay} рази на день, по ${currentCourse?.pills[p].quantity} одній таблетці ${currentCourse?.pills[p].duration} днів;\n`

        };
      
        formik.values.descriptionName =  currentCourse.courseName;
        formik.values.descriptionPillName = '';
        formik.values.descriptionPer = '';
        formik.values.descriptionQuan = '';
        formik.values.descriptionDur = '';
        setAreaContext(desc.split('\n'));

      };
      
    };
    
  },[courseName]);

  useEffect(() => {
  
    if(isLogOutSelector) {

      dispatch(changeSingIn({operation: 'clearToken', data: ''}));
      navigate('/signin');

    };
    
  },[isLogOutSelector]);

  useEffect(() => {
    
    if(detectSelected() === 1) {
      const currentSelected = descriptionSelector.find(element => element.selected === true);

      if(currentSelected !== undefined && currentSelected.selected) {
        formik.values.descriptionName =  currentSelected.descriptionName;
        formik.values.descriptionPillName =  currentSelected.descriptionPillName;
        formik.values.descriptionPer =  currentSelected.descriptionPer;
        formik.values.descriptionQuan =  currentSelected.descriptionQuan;
        formik.values.descriptionDur =  currentSelected.descriptionDur;
        setAreaContext(currentSelected.description.split('\n'));
      };
    }

  },[descriptionSelector]);

  useEffect(() => {

    descriptionSelector.forEach(element => {

      if(allSelect) {

        dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: element._id, prop: true,}, key: 'selected',})); 

      } else {

        dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: element._id, prop: false,}, key: 'selected',})); 

      };
      
    });

  },[allSelect]);

  useEffect(() => {

    if((addDescriptionLoadSelector && tokenSelector.length !== 0) || (fresh && tokenSelector.length !== 0)
    || (deleteDescriptionSelector && tokenSelector.length !== 0) || (putDescriptionSelector && tokenSelector.length !== 0)) {
      setFresh(false);
      dispatch(allDescriptionAPI({token: tokenSelector}));
    }

  },[addDescriptionLoadSelector, deleteDescriptionSelector, putDescriptionSelector, fresh]);

  useEffect(() => {

    if(putMessageSelector !== '' || deleteMessageSelector !== '' || addMessageSelector !== '') {

      setAlertModalToggle(true);

      // clear timer and close modalAlert window
      const alertHandler = () => {

        // close modalAlert window 
        setAlertModalToggle(false);

        clearTimeout(timout);

        dispatch(changePutDescription({operation: 'clearMessage', data: ''}));
        dispatch(changeDeleteDescription({operation: 'clearMessage', data: ''}));
        dispatch(changeAddDescription({operation: 'clearMessage', data: ''}));

      };

      // start timer and open modalAlert window
      const timout = window.setTimeout(alertHandler, 3000);

    };
  
  },[putMessageSelector, deleteMessageSelector, addMessageSelector]);
  
  useEffect(() => {

    if(change) {
      setChange(false);

        for(const s of descriptionSelector) {
          if(s.selected === true) dispatch(putDescriptionAPI({id: s._id, token: tokenSelector, data: { _id: s._id,
            descriptionPillName: formik.values.descriptionPillName,
            descriptionName: formik.values.descriptionName,
            descriptionPer: formik.values.descriptionPer,
            descriptionQuan: formik.values.descriptionQuan, 
            descriptionDur: formik.values.descriptionDur,
            description: areaContext.join('\n'),
            selected: false},}));
        };
      
    };

  },[change]);

  // how many descriptions has 'selected' field as 'true'
  const detectSelected = () => {

    let countSelected = 0;

    descriptionSelector.forEach(element => {
      if(element.selected) countSelected += 1;
    });

    return countSelected;

  };

  const unique = (data: string) => {

    let result = false;

    const currentDescription = descriptionSelector.find(element => element.descriptionName === data);

    if(currentDescription === undefined) result = true;

    return result;

  };

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'descriptionPillName':
        languageSelector === 'En' ? message = 'PillName field is required' : message = "Ліки - обов'язкові";
      break;

      case 'maxDescriptionPillName':
        languageSelector === 'En' ? message = 'Max 16 simbols!' : message = "Максимум 16 символів";
      break;

      case 'descriptionName':
        languageSelector === 'En' ? message = 'PillName field is required' : message = "Ліки - обов'язкові";
      break;

      case 'maxDescriptionName':
        languageSelector === 'En' ? message = 'Max 16 simbols!' : message = 'Максимум 16 символів';
      break;

      case 'descriptionQuan':
        languageSelector === 'En' ? message = 'Quantity should be number' : message = "Кільк. - число";
      break;

      case 'descriptionQuanReq':
        languageSelector === 'En' ? message = 'Quan. field is required' : message = "Кільк. - обов'язковий";
      break;

      case 'maxDescriptionQuan':
        languageSelector === 'En' ? message = 'Max 2 simbols!' : message = 'Максимум 2 символи';
      break;

      case 'descriptionDur':
        languageSelector === 'En' ? message = 'Duration should be number' : message = "Протягом - число";
      break;

      case 'descriptionDurReq':
        languageSelector === 'En' ? message = 'Duration. field is required' : message = "Протягом - обов'язковий";
      break;

      case 'maxDescriptionDur':
        languageSelector === 'En' ? message = 'Max 3 simbols!' : message = 'Максимум 3 символи';
      break;

      case 'descriptionPer':
        languageSelector === 'En' ? message = 'Per/day should be number' : message = "На день - число";
      break;

      case 'descriptionPerReq':
        languageSelector === 'En' ? message = 'Per/day field is required' : message = "На день - обов'язковий";
      break;

      case 'maxDescriptionPer':
        languageSelector === 'En' ? message = 'Max 2 simbols!' : message = 'Максимум 2 символи';
      break;


      default:
        break;
    }

    return message;
    
  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
        descriptionSearch: Yup.string().notRequired(),
        descriptionPillName: Yup.string().required(errorMessagesTrans('descriptionPillName')).max(16, errorMessagesTrans('maxDescriptionPillName')),
        descriptionName: Yup.string().required(errorMessagesTrans('descriptionName')).max(16, errorMessagesTrans('maxDescriptionName')),
        descriptionQuan: Yup.string().required(errorMessagesTrans('descriptionQuanReq')).max(2, errorMessagesTrans('maxDescriptionQuan')).matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('descriptionQuan') }
        ),
        descriptionDur: Yup.string().required(errorMessagesTrans('descriptionDurReq')).max(3, errorMessagesTrans('maxDescriptionDur')).matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('descriptionDur')}
        ),
        descriptionPer: Yup.string().required(errorMessagesTrans('descriptionPerReq')).max(2, errorMessagesTrans('maxDescriptionPer')).matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('descriptionPer')}
        ),
        description: Yup.string(),
      }
    ),
    initialValues: {
      descriptionSearch: '',
      descriptionPillName: '',
      descriptionName: '',
      descriptionPer: '',
      descriptionQuan: '',
      descriptionDur: '',
      description: '',
    } ,
    onSubmit: (values, {resetForm}) => {

      if(unique(values.descriptionName)) {
        if(tokenSelector !== '') dispatch(addDescriptionAPI({token: tokenSelector, data: {_id: nanoid(), descriptionName: values.descriptionName, descriptionPer: values.descriptionPer, descriptionPillName: values.descriptionPillName,  descriptionQuan: values.descriptionQuan, descriptionDur: values.descriptionDur, description: areaContext.join('\n'), selected: false}}));
      }else {
        dispatch(changeAddDescription({operation: 'changeMessage', data: 'Such a course name already exists'}));
      };

      resetForm();

    },
  });

  const descriptionActions = (evt: React.MouseEvent<HTMLButtonElement>) => {

    switch(evt.currentTarget.id) {
  
      case 'delete':
        
        for(const s of descriptionSelector) {
          if(s.selected === true) dispatch(deleteDescriptionAPI({token: tokenSelector, id: s._id,}));
        };
        break;
      case 'reload':
        setFresh(true);
        break;
      case 'change':
        setChange(true);
        break;
      case 'all':
        setAllSelect(state => !state);
        break;
      case 'clear':
        formik.values.descriptionName = '';
        formik.values.descriptionPillName = '';
        formik.values.descriptionPer = '';
        formik.values.descriptionQuan = '';
        formik.values.descriptionDur = '';
        setAreaContext([]);
        break;
      case 'write':

        if(Object.keys(formik.errors).length === 0) {
        
          setAreaContext(state => state = [... state, `${state.length + 1}. ${formik.values.descriptionPillName.toUpperCase()} приймати ${formik.values.descriptionPer} рази на день, по ${formik.values.descriptionQuan} одній таблетці ${formik.values.descriptionDur} днів;`]);  
          
        };
        break;
      default:
        break;
    }

  };

  const selectDescription = (evt: React.MouseEvent<HTMLLIElement>) => {

    const itemId = evt.currentTarget.id;
    
    if(!descriptionSelector.find(element => element._id === itemId)?.selected) {
    
      dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: itemId, prop: true,}, key: 'selected',})); 

    }else {

      setSelectedCourseName('');
      dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: itemId, prop: false,}, key: 'selected',})); 

    };

  };

  const takeContentCourse = () => {

    let content: Content[] = [];
    
    for(let p = 0; p < coursesSelector.length; p += 1) {

      const currentCours = coursesSelector[p].courseName;
      if(currentCours !== undefined) content = [...content, { value: p, label: currentCours}]
    }

    return content;
  };

  return (
    <div className={pd.container}>
      <div className={pd.dashboard}>
        <form className={pd.form} onSubmit={formik.handleSubmit}>

          <div className={pd.drive}>
              <button className={pd.button} type='submit' id='submit' title='Add description' disabled={detectSelected() !== 0 ? true : false}><Add width={'30px'} height={'30px'} stroke={detectSelected() !== 0 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='change' title='Change description' onClick={descriptionActions} disabled={detectSelected() === 1 ? false : true}><ChangeImg width={'25px'} height={'25px'} stroke={detectSelected() !== 1 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='delete' title='Delete description' onClick={descriptionActions} disabled={detectSelected() !== 0 ? false : true}><DeleteImg width={'25px'} height={'25px'} stroke={detectSelected() === 0 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='reload' title='Reload description' onClick={descriptionActions}><Reload width={'25px'} height={'25px'}/></button>
              <button className={pd.button} type='button' id='all' title='Selected all description' onClick={descriptionActions} disabled={descriptionSelector.length !== 0 ? false : true} style={descriptionSelector.length === 0 ? {stroke: 'lightgray', color: 'lightgray'} : {stroke: '#646cff', color: '#646cff'}}>All</button>
          </div>

          <div className={pd.messageContainer} style={formik.errors.descriptionPillName || formik.errors.descriptionPer || formik.errors.descriptionQuan || formik.errors.descriptionDur ? {width: '230px', } : {width: '0'}}>

            <div className={pd.curtain} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', color:'lightgray'} : {backgroundColor: 'white'}}>

              <p>{formik.errors.descriptionPillName ? formik.errors.descriptionPillName : formik.errors.descriptionPer ? formik.errors.descriptionPer
               : formik.errors.descriptionQuan ? formik.errors.descriptionQuan : formik.errors.descriptionDur ? formik.errors.descriptionDur : ''}</p>

            </div>

          </div>

          <div className={pd.inputs}>
            <div className={pd.inputContainer}>

                <div className={pd.descriptionSearch}>
                  <label htmlFor="descriptionSearch" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'Search' : 'Пошук'}</label>
                  <input
                  id="descriptionSearch"
                  name="descriptionSearch"
                  type="text"
                  className={pd.searchInput}
                  placeholder={languageSelector === 'En' ? 'Descriptions...' : 'Рецепт...'}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionSearch}
                  style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                  />
                </div>
             
                <Select
                  options={takeContentCourse()}
                  className={pd.select}
                  style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray', borderRadius: '8px'} : {backgroundColor: 'white', borderRadius: '8px'}}
                  name='course'
                  values={[]}
                  onChange={(value) => {               

                      if(value[0] !== undefined) setSelectedCourseName(value[0].label)
                        
                    }
                  }
          
                  disabled={detectSelected() === 0 ? false : true}
                />

                <div className={pd.descriptionName}>
                  <label htmlFor="descriptionName" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'Description' : 'Рецепт'}</label>
                  <input
                  id="descriptionName"
                  name="descriptionName"
                  type="text"
                  className={pd.nameInput}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionName}
                  style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                  />
                </div>

                <div className={pd.descriptionPillName}>
                    <label htmlFor="descriptionPillName" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'PillName' : 'Назва ліків'}</label>
                    <input
                    id="descriptionPillName"
                    name="descriptionPillName"
                    type="text"
                    className={pd.nameInput}
                    onChange={formik.handleChange}
                    value={formik.values.descriptionPillName}
                    style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                    />
                </div>

                <div className={pd.descriptionDetails}>

                  <div className={pd.descriptionPer}>
                    <label htmlFor="descriptionPer" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'Per day' : 'На день'}</label>
                    <input
                    id="descriptionPer"
                    name="descriptionPer"
                    type="text"
                    className={pd.nameInput}
                    onChange={formik.handleChange}
                    value={formik.values.descriptionPer}
                    style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                    />
                  </div>

                  <div className={pd.descriptionQuan}>
                    <label htmlFor="descriptionQuan" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'Quantity' : 'Кількість'}</label>
                    <input
                    id="descriptionQuan"
                    name="descriptionQuan"
                    type="text"
                    className={pd.nameInput}
                    onChange={formik.handleChange}
                    value={formik.values.descriptionQuan}
                    style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                    />
                  </div>

                  <div className={pd.descriptionDur}>
                    <label htmlFor="descriptionDur" style={lightModeSelector === 'dark' ? {color: '#4b51b9'} : {color: 'black'}}>{languageSelector === 'En' ? 'Duration' : 'Протягом'}</label>
                    <input
                    id="descriptionDur"
                    name="descriptionDur"
                    type="text"
                    className={pd.nameInput}
                    onChange={formik.handleChange}
                    value={formik.values.descriptionDur}
                    style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}
                    />
                  </div>
                </div>
            </div>

            <div className={pd.addButton}>
              <button className={pd.clearToArea} title='Clear description body' type='button' id='clear' onClick={descriptionActions}
              style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: '#f9f9f9'}}>{languageSelector === 'En' ? 'Clear' : 'Очист.'}</button>
              <button className={pd.writeToArea} title='Write to description body' type='button' id='write' onClick={descriptionActions}
              style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: '#f9f9f9'}}>{languageSelector === 'En' ? 'Write' : 'Запис'}</button>
            </div>

          </div>

        </form>

        <div className={pd.areaContainer}>

          <textarea  
            id="area"
            name="description"
            className={pd.area}
            onChange={(e) => {if(e.target.value !== '') {
                setAreaContext((e.target.value).split('\n'));
              }else {
                setAreaContext([]);
              };}}
            value={areaContext.join('\n')}
            style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray', borderRadius: '8px'} : {backgroundColor: 'white', borderRadius: '8px'}}
          />

        </div>
        </div>
        
        <ul className={pd.list} style={addLoadingSelector ? {justifyContent: 'center'} : {justifyContent: 'unset'}}>

          {!addLoadingSelector ? descriptionSelector.map(element => {

            return element.descriptionName.toLocaleUpperCase().includes(formik.values.descriptionSearch.toLocaleUpperCase()) ? <li className={pd.item} key={nanoid()} id={element._id} 
            onClick={selectDescription} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', borderRadius: '8px'} : {backgroundColor: 'white', borderRadius: '8px'}}>
              <div className={pd.nameWrapper} style={element.selected ? {backgroundColor:'rgb(255, 179, 0, 0.8)'} : {backgroundColor:''}}>
              <div className={pd.name}>{element.descriptionName}</div><p>{languageSelector === 'En' ? 'Description' : 'Рецепт'}</p></div><p className={pd.description} style={lightModeSelector === 'dark' ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white' }}>{element.description}</p></li> : '';

          }) : <Loading width={'100px'} height={'100px'}/>}

        </ul>

        {alertModalToggle && <PillsModalAlert>

          <div className={pd.alertMessageContainer}> <Horn width={'35px'} height={'35px'}/> <p>{putMessageSelector ? putMessageSelector: deleteMessageSelector ? deleteMessageSelector : addMessageSelector ? addMessageSelector : ''}</p></div>
              
        </ PillsModalAlert>}
        
    </div>
  )
};

export default DescriptionDashboard;