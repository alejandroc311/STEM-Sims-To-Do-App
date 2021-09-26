import React from "react";

interface AddTodoInputProps {
    userInput: string;
    onInputChange: Function;
}

function AddTodoInput(props: AddTodoInputProps){
    function handleUserInput(event:any){
        props.onInputChange(event.target.name, event.target.value);
    }
    return(
        <div>
            <input type="text" name="addTodoInput" onChange={handleUserInput} value={props.userInput} className="form-control border-0 shadow-none" id="addTodoInput" placeholder="Add a task" aria-describedby="addTodoButton"/>
        </div>
            
    );
}
export default AddTodoInput;