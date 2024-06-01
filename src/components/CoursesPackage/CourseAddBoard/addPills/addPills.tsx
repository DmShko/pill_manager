import  { FC, useState, useEffect } from "react"; 
import { useFormik } from "formik"; 
import * as Yup from 'yup';

import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../../app.hooks";

// styles
import ap from "./addPills.module.scss";

import { deleteStatisticAPI } from '../../../../API/deleteStatisticAPI'

// external funcions
import { changeTempPills } from '../../../../pmStore/pmSlice';
import { changeStatistic } from '../../../../pmStore/pmSlice';

const AddPills: FC = () => {

  const dispatch = useAppDispatch();

  const coursesSelector = useAppSelector(state => state.pm.courses);
  const selectorTempPills = useAppSelector(state => state.pm.tempPills);
  const editCourseSelector = useAppSelector(state => state.pm.editCourse);
  const isEditSelector = useAppSelector(state => state.pm.isEdit);
  const pressEditSelector = useAppSelector(state => state.pm.pressEdit);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const statisticsSelector = useAppSelector(state => state.getStatistic.statistics);

  useEffect(() => {
    if(isEditSelector && pressEditSelector) dispatch(changeTempPills({ mode: 'freshTempPills', data: editCourseSelector.pills, key: '',}));
  },[editCourseSelector]);

  // Pill item field values
  const [itemPerDay, setItemPerDay ] = useState<Boolean>();
  const [itemName, setItemName ] = useState<Boolean>();
  const [itemQuantity, setItemQuantity ] = useState<Boolean>();
  const [itemDuration, setItemDuration ] = useState<Boolean>();

  // save button toggle
  const [itemActiveSave, setItemActiveSave ] = useState<Boolean>(false);

  const formik = useFormik({

    validationSchema: Yup.object({

            pillName: Yup.string().required('PillName field is required').max(20, 'Max 20 simbols!').matches(
                /\w{0}[aA-zZаА-яЯ]/,
                { message: 'PillName should be string' }),
                
            corrName: Yup.string().notRequired().max(2, 'Max 2 simbols!').matches(
                /\w{0}[aA-zZаА-яЯ]/,
                { message: 'CorrName should be string' }),

            perDay: Yup.string().required('PerDay field is required').max(2, 'Max 2 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'PerDay should be number' }),

            corrPerDay: Yup.string().notRequired().max(2, 'Max 2 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'CorrPerDay should be number' }), 
                
            quantity: Yup.string().required('Quantity field is required').max(2, 'Max 2 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'Quantity should be number' }),  

            corrQuantity: Yup.string().notRequired().max(2, 'Max 2 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'CorrQuantity should be number' }),  

            duration: Yup.string().required('Duration field is required').max(3, 'Max 3 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'Duration should be number' }),  

            corrDuration: Yup.string().notRequired().max(3, 'Max 3 simbols!').matches(
                /\w{0}[0-9]/,
                { message: 'CorrDuration should be number' }),   
        }
    ),
    initialValues: {
      pillName: '',
      corrName: '',
      perDay: '',
      corrPerDay: '',
      quantity: '',
      corrQuantity: '',
      duration: '',
      corrDuration: '',
    },
    onSubmit: values => {

        const id = nanoid();
        
        if(Object.keys(formik.errors).length === 0) {

            dispatch(changeTempPills({ mode: 'addPill', data: {id: id, pillName: values.pillName,
                perDay: values.perDay,
                quantity: values.quantity,
                duration: values.duration,
                frozyDuration: values.duration,
                description: '', selectedPill: false, startMonth: '', startDay: '0', }, key: '',}));

        };

    },
    
  });

  const itemClick = (evt: React.MouseEvent<HTMLElement>)=> {

    const currenElementId = (evt.currentTarget as HTMLLIElement).id

    // set "selectedPill" (true) of edit pill
    dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: true}, key: 'selectedPill'})); 

    if((evt.target as HTMLButtonElement).id === (evt.currentTarget as HTMLLIElement).id) {

       // reset "selectedPill" (false) of edit pill
       dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: false}, key: 'selectedPill'})); 
       setItemName(false);
       setItemPerDay(false);
       setItemQuantity(false);
       setItemDuration(false);
       
    };

    if((evt.target as HTMLButtonElement).name === 'del') {

        dispatch(changeTempPills({mode: 'deletePill', data: currenElementId, key: ''}));

        // delete pill from 'statistic'
        dispatch(changeStatistic({mode: 'deletePillsDay', data: currenElementId}));

        let currentPillName = '';
        const currentPill = selectorTempPills.find(element => element.id === evt.currentTarget.id);

        if(currentPill !== undefined) currentPillName = currentPill.pillName;

        for(const st of statisticsSelector) {
            if(st.pillName === currentPillName) 
                // delete pill from DB statistic
                dispatch(deleteStatisticAPI({token: tokenSelector, id: st._id}));
        };
        
    };

    if((evt.target as HTMLButtonElement).name === 'save') {

        // reset "selectedPill" (false) of edit pill
        dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: false}, key: 'selectedPill'})); 
    
       if(itemName) {
         // write changes and reset itemName
         if(formik.values.corrName !== '') dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: formik.values.corrName}, key: 'pillName'})); 
         setItemName(false);
       };
       if(itemPerDay) {
         // write changes and reset itemPerDay
         if(formik.values.corrPerDay !== '') dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: formik.values.corrPerDay}, key: 'perDay'})); 
         setItemPerDay(false);
       };
       if(itemQuantity) {
        // write changes and reset itemQuantity
        if(formik.values.corrQuantity !== '') dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: formik.values.corrQuantity}, key: 'quantity'})); 
        setItemQuantity(false);
       };

       if(itemDuration) {
        // write changes and reset itemDuration

        let diff = '';
        const currentPill = coursesSelector.find(element => element.selected === true)?.pills.find(element => element.id === currenElementId);
        let currentDuration = '';
        let currentFrozyDuration = '';

        if(currentPill !== undefined) {
            currentDuration = currentPill.duration;
            currentFrozyDuration = currentPill.frozyDuration;
        };

        if(currentFrozyDuration !== undefined) {
       
            if(formik.values.corrDuration > currentFrozyDuration) {
                diff = (Number(currentDuration) + (Number(formik.values.corrDuration) - Number(currentFrozyDuration))).toString();
            }
        
            if(formik.values.corrDuration < currentFrozyDuration) {
                diff = (Number(currentDuration) - (Number(currentFrozyDuration) - Number(formik.values.corrDuration))).toString();    
            }

        };
  
        if(formik.values.corrDuration !== '') {

            dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: diff}, key: 'duration'}));
            dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: formik.values.corrDuration}, key: 'frozyDuration'}));  
        }
        
        setItemDuration(false);
       };

       // hidden 'save' button
       setItemActiveSave(false);
    
    };

    if((evt.target as HTMLParagraphElement).id === 'itemName') {

        if(!itemActiveSave) setItemActiveSave(true);
        
        setItemName(true);
        
    }

    if((evt.target as HTMLParagraphElement).id === 'itemPerDay') {

        if(!itemActiveSave) setItemActiveSave(true);
      
        setItemPerDay(true);
      
    }

    if((evt.target as HTMLParagraphElement).id === 'itemQuantity') {

        if(!itemActiveSave) setItemActiveSave(true);
    
        setItemQuantity(true);
      
    }

    if((evt.target as HTMLParagraphElement).id === 'itemDuration') {

        if(!itemActiveSave) setItemActiveSave(true);
     
        setItemDuration(true);
    }

  };

  return (
   
        <div className={ap.addPillsContainer}>

            <form className={ap.pills} onSubmit={formik.handleSubmit}>
              <label htmlFor='pillName'>Pill name</label>
              <div className={ap.pillNameContainer}>
                
                    <input       
                        id="pillName"
                        name="pillName"
                        type="text"
                        className={ap.pillInput}
                        onChange={formik.handleChange}
                        value={formik.values.pillName}
                    />

                
                <div className={ap.messageContainer} style={formik.errors.pillName || formik.errors.perDay || formik.errors.quantity || formik.errors.duration ? {opacity: '1', } : {opacity: '0'}}>

                    <div className={ap.curtain}>

                        <p>{formik.errors.pillName ? formik.errors.pillName : formik.errors.perDay ? formik.errors.perDay : formik.errors.quantity ? formik.errors.quantity : formik.errors.duration ? formik.errors.duration : ''}</p>

                    </div>

                </div>

              </div>

                <div className={ap.pillsInfo}>
                    <div className={ap.inputContainer}>
                        <label htmlFor="perDay">Per day</label>
                        <input
                            id="perDay"
                            name="perDay"
                            type="text"
                            className={ap.pillInput}
                            onChange={formik.handleChange}
                            value={formik.values.perDay}
                        />
                    </div>

                    <div className={ap.inputContainer}>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            className={ap.pillInput}
                            onChange={formik.handleChange}
                            value={formik.values.quantity}
                        />
                    </div>

                    <div className={ap.inputContainer}>
                        <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            type="text"
                            className={ap.pillInput}
                            onChange={formik.handleChange}
                            value={formik.values.duration}
                        />
                    </div>
                
                    <button type="submit" className={ap.pillsButton}>Add</button>
                </div>
            </form>

            <div className={ap.pillsContainer}>
                {selectorTempPills.length !== 0 ? 
                    <ul className={ap.pillsList}>
                        {selectorTempPills.map(value => {
                            return <li className={ap.pillsItem} key={nanoid()} id={value.id} onClick={itemClick}>
                               
                                { itemName && value.selectedPill ? <input className={ap.itemInput} type="text" id='corrName' value={formik.values.corrName} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemName'> {value.pillName} </p>}

                                <p>per/day: </p> 
                                { itemPerDay && value.selectedPill ? <input className={ap.itemInput} type="text" id='corrPerDay' value={formik.values.corrPerDay} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemPerDay'> {value.perDay} </p>}

                                <p>quan./day: </p> 
                                { itemQuantity && value.selectedPill ? <input className={ap.itemInput} type="text" id='corrQuantity' value={formik.values.corrQuantity} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemQuantity'> {value.quantity} </p>}  

                                <p>durat.: </p> 
                                { itemDuration && value.selectedPill ? <input className={ap.itemInput} type="text" id='corrDuration' value={formik.values.corrDuration} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemDuration'> {value.frozyDuration} </p>}
                               
                                {itemActiveSave && value.selectedPill ? <button className={ap.itemButton} name='save'>Save</button> : ''}
                                <button className={ap.itemButton} name='del'>Del</button>

                            </li>
                        })}
                    </ul>
                : 'There are no pills'}
            </div>
        
        </div>
 
  )
}

export default AddPills;