import  { FC, useState, useEffect } from "react"; 
import { useFormik } from "formik"; 
import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../../app.hooks";

// styles
import ap from "./addPills.module.scss";

// external funcions
import { changeTempPills } from '../../../../pmStore/pmSlice';
import { changeStatistic } from '../../../../pmStore/pmSlice';

const AddPills: FC = () => {

  const dispatch = useAppDispatch();
  const selectorTempPills = useAppSelector(state => state.pm.tempPills);
  const editCourseSelector = useAppSelector(state => state.pm.editCourse);
  const isEditSelector = useAppSelector(state => state.pm.isEdit);
  const pressEditSelector = useAppSelector(state => state.pm.pressEdit);

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
        
        dispatch(changeTempPills({ mode: 'addPill', data: {id: nanoid(), pillName: values.pillName,
            perDay: values.perDay,
            quantity: values.quantity,
            duration: values.duration,
            description: '', selectedPill: false, startMonth: '', startDay: '0', }, key: '',}));

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
        if(formik.values.corrDuration !== '') dispatch(changeTempPills({mode: 'changePill', data: {_id: currenElementId, prop: formik.values.corrDuration}, key: 'duration'})); 
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
                <input
                    id="pillName"
                    name="pillName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.pillName}
                />

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
                                    : <p className={ap.pillsText} id='itemDuration'> {value.duration} </p>}
                               
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