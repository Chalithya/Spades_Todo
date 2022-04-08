import { useState } from "react";
import { TextField, Checkbox } from '@material-ui/core';


const divStyle = { display: 'inline', padding: '20px' }
const btnStyle = { margin: '10px' }

const TodoItem = ({ title, completed, removeTodoItemProp, editTodoItemProp }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);
    const [tempValue, setTempValue] = useState(title);
    const [completedState, setCompleted] = useState(completed);

    const handleDivDoubleClick = () => {
        setIsEditing(true);
    };

    //To close editing after pressing Enter or esc
    const handleInputKeyDown = (e) => {
        const key = e.keyCode;

        if (key === 13) {
            editTodoItemProp({ title: tempValue});
            setValue(tempValue);
            setIsEditing(false);
        } else if (key === 27) {
            setTempValue(value);
            setIsEditing(false);
        }
    };

    const handleInputOnChange = (e) => {
        setTempValue(e.target.value);
    };

  /*  //For the buttonclick event which is now commented
    const handleButtonClick = () => {
        setCompleted((oldCompleted) => {
            const newState = !oldCompleted;
            editTodoItemProp({completed: newState});
            return newState;
        });
    };
*/

    const handleCheckBox = (e) => {
        const checked = e.target.checked;
        setCompleted((oldCompleted) => {
            const newState = !oldCompleted;
            editTodoItemProp({completed: newState});
            return newState;
        });
    };

    return (
        isEditing ?
            <TextField
                // value={inputValue}
                onChange={handleInputOnChange}
                onKeyDown={handleInputKeyDown}
                value={tempValue}
                autoFocus={true}
                id="outlined-multiline-flexible"
                label="Enter Todo Item"
                multiline
                maxRows={4}
                fullWidth
            /> :

            <div className='row' >
                <Checkbox checked={completedState ? true : false } onClick={handleCheckBox} />

                <div onDoubleClick={handleDivDoubleClick} style={divStyle} className='column five wide'>
                    <h3 className={completedState ? "done" : ""} style={divStyle}> {value}</h3>
                </div>

                <div style={divStyle} className='column one wide'>

                    {/* This button is replaced with chekbox
                    
                    <button
                        onClick={handleButtonClick}
                        style={btnStyle}
                        className='success_btn'
                    >+</button> */}

                    <button 
                    onClick={removeTodoItemProp}
                    className='cancel_btn'
                    >-</button>

                </div>

                <div className='column one wide'>

                </div>

            </div>
    );
};

export default TodoItem;