import React from "react";
import AddTodoButton from "./Add-Todo-Section-Components/Add-Todo-Button";
import AddTodoInput from "./Add-Todo-Section-Components/Add-Todo-Input";

interface AddTodoSectionProps{
    handleUserInput: Function;
    userInput: string;
    onClickAddButton: Function;
}


function AddTodoSection (props: AddTodoSectionProps){
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-xxl-8 offset-xxl-2">
                    <div className="input-group border border-dark border-3 rounded-pill" id="addTodoSection">
                        <AddTodoButton onClick={props.onClickAddButton}/>
                        <AddTodoInput onInputChange={props.handleUserInput} userInput={props.userInput}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTodoSection;