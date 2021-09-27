import React from "react";
interface AddTodoButtonProps{
    onClick:Function;
};
function AddTodoButton(props: AddTodoButtonProps){
    function handleClick (event:any){
        props.onClick(event.target);
    }

    return(
        <button className="btn" id="addTodoButton" onClick={handleClick}>
            <i className="bi bi-plus"></i>
        </button>
    );
}
export default AddTodoButton;