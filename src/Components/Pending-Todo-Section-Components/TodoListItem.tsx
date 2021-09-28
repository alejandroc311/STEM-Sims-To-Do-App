import React from "react";
import $, { event } from "jquery";
import Draggable from 'react-draggable';

interface TodoListItemProps{
    todoString: string;
    onClick: Function;
    indexOfTodoListItem: string;
    onCheck: Function;
    handleDrag: Function;
    onDrop: Function;
    
};


function TodoListItem(this: any, props: TodoListItemProps){
    function handleClick(event:any){
        props.onClick(event.target.name);
    }
    function handleCheck(event:any){
        props.onCheck(event.target.name, event.target.checked);  
    }
    function handleDrop(event:any) {
        props.onDrop(event.currentTarget);
    }
    function handleDrag(event:any){
        props.handleDrag(event.currentTarget);
    }
    
    return(

        <div className="card" draggable={true}
        onDragOver={e => e.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop} >
                <div className="row d-flex align-items-center">
                    <div className="col-1">
                        <input className="form-check-input todoListItemCheckButton" type="checkbox" onChange={handleCheck} name={props.indexOfTodoListItem}/>   
                    </div>
                    <div className="col-8" id={props.indexOfTodoListItem}> 
                        {props.todoString} 
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <button className="btn bi bi-trash" name={props.indexOfTodoListItem} id="deleteTodoButton" type="button" onClick={handleClick}>
                        </button>
                    </div>
                </div>
            </div>
            
    );
}
export default TodoListItem;