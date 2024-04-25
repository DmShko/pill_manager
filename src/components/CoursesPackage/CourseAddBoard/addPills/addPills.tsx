import { useState } from "react"; 
import { useFormik } from "formik"; 
import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../../app.hooks";

// styles
import ap from "./addPills.module.scss";

// external funcions
import { changeTempPills } from '../../../../pmStore/pmSlice';

const AddPills = () => {

  const dispatch = useAppDispatch();
  const selectorTempPills = useAppSelector(state => state.tempPills);

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
            description: '',}, key: '',}));

    },
  });

  const itemClick = (evt: React.MouseEvent<HTMLElement>)=> {

    const currenElementId= (evt.currentTarget as HTMLLIElement).id

    if((evt.target as HTMLButtonElement).name === 'del') {

        dispatch(changeTempPills({mode: 'deletePill', data: currenElementId, key: ''}));

    };

    if((evt.target as HTMLButtonElement).name === 'save') {

    
       if(itemName) {
         dispatch(changeTempPills({mode: 'changePill', data: {id: currenElementId, prop: formik.values.corrName}, key: 'pillName'})); 
         setItemName(false);
       };
       if(itemPerDay) {
         dispatch(changeTempPills({mode: 'changePill', data: {id: currenElementId, prop: formik.values.corrPerDay}, key: 'perDay'})); 
         setItemPerDay(false);
       };
       if(itemQuantity) {
        dispatch(changeTempPills({mode: 'changePill', data: {id: currenElementId, prop: formik.values.corrQuantity}, key: 'quantity'})); 
        setItemQuantity(false);
       };
       if(itemDuration) {
        dispatch(changeTempPills({mode: 'changePill', data: {id: currenElementId, prop: formik.values.corrDuration}, key: 'duration'})); 
        setItemDuration(false);
       };
    
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
                
                    <button className={ap.pillsButton}>Add</button>
                </div>
            </form>

            <div className={ap.pillsContainer}>
                {selectorTempPills.length !== 0 ? 
                    <ul className={ap.pillsList}>
                        {selectorTempPills.map(value => {
                            return <li className={ap.pillsItem} key={nanoid()} id={value.id} onClick={itemClick}>
                               
                                { itemName ? <input className={ap.itemInput} type="text" id='corrName' value={formik.values.corrName} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemName'> {value.pillName} </p>}

                                <p>per/day: </p> 
                                { itemPerDay ? <input className={ap.itemInput} type="text" id='corrPerDay' value={formik.values.corrPerDay} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemPerDay'> {value.perDay} </p>}

                                <p>quan./day: </p> 
                                { itemQuantity ? <input className={ap.itemInput} type="text" id='corrQuantity' value={formik.values.corrQuantity} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemQuantity'> {value.quantity} </p>}  

                                <p>durat.: </p> 
                                { itemDuration ? <input className={ap.itemInput} type="text" id='corrDuration' value={formik.values.corrDuration} onChange={formik.handleChange}/> 
                                    : <p className={ap.pillsText} id='itemDuration'> {value.duration} </p>}
                               
                                {itemActiveSave && <button className={ap.itemButton} name='save'>Save</button>}
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