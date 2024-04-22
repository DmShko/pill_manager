import { useState } from "react"; 
import { useFormik } from "formik"; 
import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../../app.hooks";

// styles
import { AddPillsStyled } from "./addPills.styled";

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
    <AddPillsStyled>
        <div className='addpills-container'>

            <form className="pills" onSubmit={formik.handleSubmit}>
              
              <label htmlFor="pillName">Pill name</label>
                <input
                    id="pillName"
                    name="pillName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.pillName}
                />

                <div className="pills-info">
                    <div className="input-container">
                        <label htmlFor="perDay">Per day</label>
                        <input
                            id="perDay"
                            name="perDay"
                            type="text"
                            className="pill-input"
                            onChange={formik.handleChange}
                            value={formik.values.perDay}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            className="pill-input"
                            onChange={formik.handleChange}
                            value={formik.values.quantity}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            type="text"
                            className="pill-input"
                            onChange={formik.handleChange}
                            value={formik.values.duration}
                        />
                    </div>
                
                    <button className="pills-button">Add</button>
                </div>
            </form>

            <div className='pills-container'>
                {selectorTempPills.length !== 0 ? 
                    <ul className='pills-list'>
                        {selectorTempPills.map(value => {
                            return <li className='pills-item' key={nanoid()} id={value.id} onClick={itemClick}>
                               
                                { itemName ? <input className="item-input" type="text" id='corrName' value={formik.values.corrName} onChange={formik.handleChange}/> 
                                    : <p className='pills-text' id='itemName'> {value.pillName} </p>}

                                <p>per/day: </p> 
                                { itemPerDay ? <input className="item-input" type="text" id='corrPerDay' value={formik.values.corrPerDay} onChange={formik.handleChange}/> 
                                    : <p className='pills-text' id='itemPerDay'> {value.perDay} </p>}

                                <p>quan./day: </p> 
                                { itemQuantity ? <input className="item-input" type="text" id='corrQuantity' value={formik.values.corrQuantity} onChange={formik.handleChange}/> 
                                    : <p className='pills-text' id='itemQuantity'> {value.quantity} </p>}  

                                <p>durat.: </p> 
                                { itemDuration ? <input className="item-input" type="text" id='corrDuration' value={formik.values.corrDuration} onChange={formik.handleChange}/> 
                                    : <p className='pills-text' id='itemDuration'> {value.duration} </p>}
                               
                                {itemActiveSave && <button className='item-button' name='save'>Save</button>}
                                <button className='item-button' name='del'>Del</button>

                            </li>
                        })}
                    </ul>
                : 'There are no pills'}
            </div>
        
        </div>
    </AddPillsStyled>
  )
}

export default AddPills;