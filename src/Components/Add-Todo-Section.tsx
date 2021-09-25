import React from "react";
import AddTodoButton from "./Add-Todo-Section-Components/Add-Todo-Button";
import AddTodoInput from "./Add-Todo-Section-Components/Add-Todo-Input";

function AddTodoSection (){

    return(
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-xxl-8 offset-xxl-2">
                    <AddTodoButton />
                    <AddTodoInput userInput={"string"}/>
                </div>
            </div>
        </div>
    );
}

export default AddTodoSection;