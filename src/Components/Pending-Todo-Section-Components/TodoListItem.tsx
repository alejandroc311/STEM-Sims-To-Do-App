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
    editItem: Function;
    handleEditSubmit: Function;
    modalName: string;
    editbuttonname: string;
    modalcontainername: string;
    formName: string;


};


function TodoListItem(this: any, props: TodoListItemProps){
  function editItem(event:any){
    props.editItem(event.target.name, event.target.value);
  }
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
    function handleEditSubmit(event:any){
      event.preventDefault();
      props.handleEditSubmit(event.currentTarget.id)
    }

    return(

      <>  <div className="card border border-dark border-1 rounded-pill" draggable={true}
        onDragOver={e => e.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop} >
                <div className="row d-flex align-items-center">
                    <div className="col-1">
                        <input className="form-check-input todoListItemCheckButton" type="checkbox" onChange={handleCheck} name={props.indexOfTodoListItem}/>
                    </div>
                    <div className="col-7" id={props.indexOfTodoListItem}>
                        {props.todoString}
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <button className="btn bi bi-pencil" name={"edit"+props.editbuttonname} id={"edit"+props.editbuttonname} type="button" onClick={editItem} data-bs-toggle="modal" data-bs-target={"#modalcontainer"+props.modalcontainername}></button>
                        <button className="btn bi bi-trash" name={props.indexOfTodoListItem} id="deleteTodoButton" type="button" onClick={handleClick}></button>
                    </div>
                </div>

                </div>
                <div className="modal fade" id={"modalcontainer"+props.modalcontainername} tabIndex={-1} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="modal-title">Edit your task!</div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form id={"editTaskForm"+props.formName} onSubmit={handleEditSubmit}>
                            <input type="text" name={"modal"+props.modalName} onChange={editItem} className="form-control border-0 shadow-none" id={"modal"+props.indexOfTodoListItem} placeholder="Type in your changes ..."/>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-dark" form={"editTaskForm"+props.formName} data-bs-dismiss="modal">Edit</button>
                      </div>
                    </div>
                  </div>
            </div>

          </>

    );
}
export default TodoListItem;
