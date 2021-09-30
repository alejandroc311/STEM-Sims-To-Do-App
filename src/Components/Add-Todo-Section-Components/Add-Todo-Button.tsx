import React from "react";
interface AddTodoButtonProps{
    
};
function AddTodoButton(props: AddTodoButtonProps){


    return(
        <button className="btn" id="addTodoButton">
            <i className="bi bi-plus"></i>
        </button>
    );
}
export default AddTodoButton;
