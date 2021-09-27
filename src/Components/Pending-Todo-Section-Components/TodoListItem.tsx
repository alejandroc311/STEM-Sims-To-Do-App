import React from "react";
import $, { event } from "jquery";

interface TodoListItemProps{
    todoString: string;
    onClick: Function;
    indexOfTodoListItem: string;
    onCheck: Function;
    
};

function TodoListItem(props: TodoListItemProps){
    function handleClick(event:any){
        event.preventDefault();
        props.onClick(event.target.name);
    }
    function handleCheck(event:any){
        props.onCheck(event.target.name, event.target.checked);  
    }
    return(
        <div>
            <div className="card">
                <div className="row d-flex align-items-center">
                    <div className="col-1">
                        <input className="form-check-input todoListItemCheckButton" type="checkbox" onChange={handleCheck} name={props.indexOfTodoListItem}/>   
                    </div>
                    <div className="col-8" id={props.indexOfTodoListItem}> 
                        {props.todoString} 
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <button className="btn" id="deleteTodoButton" onClick={handleClick}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TodoListItem;