import React from "react";
import AddTodoButton from "./Add-Todo-Section-Components/Add-Todo-Button";
import AddTodoInput from "./Add-Todo-Section-Components/Add-Todo-Input";

interface AddTodoSectionProps{
    handleUserInput: Function;
    userInput: string;
    onSubmit: Function;
}


function AddTodoSection (props: AddTodoSectionProps){
  function onSubmit(event:any){
    event.preventDefault();
    props.onSubmit(props.userInput);
  }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <form className="input-group d-flex align-items-center border border-dark border-3 rounded-pill" onSubmit={onSubmit} id="addTodoSection">
                        <AddTodoButton/>
                        <AddTodoInput onInputChange={props.handleUserInput} userInput={props.userInput}/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTodoSection;
