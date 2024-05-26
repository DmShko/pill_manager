import { useEffect, useState }from 'react';

import { useNavigate } from 'react-router-dom'; 

import { useFormik } from "formik"; 

import * as Yup from 'yup';

import { nanoid } from 'nanoid';

import addDescriptionAPI from '../../../API/addDescriptionAPI';
import allDescriptionAPI from '../../../API/allDescriptionAPI';
import deleteDescriptionAPI from '../../../API/deleteDescriptionAPI';
import putDescriptionAPI from '../../../API/putDescriptionAPI';

// images
import Add from '../../SvgComponents/Courses/Add'; 
import DeleteImg from '../../SvgComponents/Courses/Delete'; 
import Reload from '../../SvgComponents/Courses/Reload'; 
import ChangeImg from '../../SvgComponents/Courses/Edit'; 

import { changeDescription } from '../../../pmStore/getDescriptions'
import { changeSingIn } from "../../../pmStore/signInStore"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";

import pd from './DescriptionDashboard.module.scss';

const DescriptionDashboard = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const addDescriptionLoadSelector = useAppSelector(state => state.addDescription.isLoad);
  const deleteDescriptionSelector = useAppSelector(state => state.deleteDescription.isDelete);
  const descriptionSelector = useAppSelector(state => state.getDescriptions.description);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);

  const [ fresh, setFresh ] = useState(false);
  const [ allSelect, setAllSelect ] = useState(false);
  const [ change, setChange ] = useState(false);

  useEffect(() => {
  
    if(isLogOutSelector) {

      dispatch(changeSingIn({operation: 'clearToken', data: ''}));
      navigate('/signin');

    };
    
  },[isLogOutSelector]);

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

    if((addDescriptionLoadSelector && tokenSelector.length !== 0) || (fresh && tokenSelector.length !== 0)) {
      setFresh(false);
      dispatch(allDescriptionAPI({token: tokenSelector}));
    }

  },[addDescriptionLoadSelector, deleteDescriptionSelector, fresh]);

  useEffect(() => {

    if(change) {
      setChange(false);
      for(const s of descriptionSelector) {
        if(s.selected === true) dispatch(putDescriptionAPI({id: s._id, token: tokenSelector, data: { _id: s._id,
          descriptionName: formik.values.descriptionName,
          description: formik.values.description,
          selected: false},}));
      };
    }

  },[change]);

  // how many descriptions has 'selected' field as 'true'
  const detectSelected = () => {

    let countSelected = 0;

    descriptionSelector.forEach(element => {
      if(element.selected) countSelected += 1;
    });

    return countSelected;

  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
        descriptionName: Yup.string().required('DescriptionName field is required'),
        description: Yup.string().required('Description field is required'),
      }
    ),
    initialValues: {
      descriptionName: '',
      description: '',
    } ,
    onSubmit: (values, {resetForm}) => {

      if(tokenSelector !== '') dispatch(addDescriptionAPI({token: tokenSelector, data: {_id: nanoid(), descriptionName: values.descriptionName, description: values.description, selected: false}}));
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
      default:
        break;
    }

  };

  const selectDescription = (evt: React.MouseEvent<HTMLLIElement>) => {

    const itemId = evt.currentTarget.id;
    
    if(!descriptionSelector.find(element => element._id === itemId)?.selected) {
    
      dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: itemId, prop: true,}, key: 'selected',})); 

    }else {

      dispatch(changeDescription({mode: 'changeDescriptionFutures', data: {_id: itemId, prop: false,}, key: 'selected',})); 

    };

  };

  return (
    <div className={pd.container}>
  
        <form className={pd.form} onSubmit={formik.handleSubmit}>

          <div className={pd.drive}>
              <button className={pd.button} type='submit' disabled={detectSelected() !== 0 ? true : false}><Add width={'30px'} height={'30px'} stroke={detectSelected() !== 0 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='delete' onClick={descriptionActions} disabled={detectSelected() !== 0 ? false : true}><DeleteImg width={'25px'} height={'25px'} stroke={detectSelected() === 0 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='change' onClick={descriptionActions} disabled={detectSelected() !== 0 ? false : true}><ChangeImg width={'25px'} height={'25px'} stroke={detectSelected() === 0 ? 'lightgray' : '#646cff'}/></button>
              <button className={pd.button} type='button' id='reload' onClick={descriptionActions}><Reload width={'25px'} height={'25px'}/></button>
              <button className={pd.button} type='button' id='all' onClick={descriptionActions} disabled={descriptionSelector.length !== 0 ? false : true} style={descriptionSelector.length === 0 ? {stroke: 'lightgray'} : {stroke: '#646cff'}}>All</button>
          </div>

          <div className={pd.inputContainer}>
              <label htmlFor="descriptionName">Description Name (must be equal Course Name)</label>
              <input
              id="descriptionName"
              name="descriptionName"
              type="text"
              className={pd.nameInput}
              onChange={formik.handleChange}
              value={formik.values.descriptionName}
            />
          </div>

          <div className={pd.areaContainer}>

            <textarea  
                id="c"
                name="description"
                className={pd.area}
                onChange={formik.handleChange}
                value={formik.values.description}
            />

          </div>

        </form>

        <ul className={pd.list}>

          {descriptionSelector.map(element => {

            return <li className={pd.item} key={nanoid()} id={element._id} 
            onClick={selectDescription}><div className={pd.nameWrapper} style={element.selected ? {backgroundColor:'rgb(255, 179, 0, 0.8)'} : {backgroundColor:''}}><div className={pd.name}>{element.descriptionName}</div><p>Description</p></div><p className={pd.description}>{element.description}</p></li>;

          })}

        </ul>
        
    </div>
  )
};

export default DescriptionDashboard;