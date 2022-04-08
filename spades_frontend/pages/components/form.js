import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';

const btnStyle = { margin: '8px 0' }


const Form = ({addTodo}) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim() === "") return;
        addTodo({title: inputValue, completed: false});
        setInputValue("");
    };

    return (
        <>
            <form classs='ui form' onSubmit={handleFormSubmit}>
                <div className='ui grid'>
                    <div className='column'>

                        <TextField
                            value={inputValue}
                            onChange={handleInputChange}
                            id="outlined-multiline-flexible"
                            label="Enter Todo Item"
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <Button type='submit' variant='contained' style={btnStyle} color='secondary' fullWidth>  + </Button>


                    </div>
                </div>
            </form>

        </>
    )
}


export default Form