
import React from "react";
import $, { event } from "jquery";

import AddTodoSection from "./Components/Add-Todo-Section";
import TodoListItem from "./Components/Pending-Todo-Section-Components/TodoListItem";
var todoList = ["Wash Laundry","Finish STEM Sims Exercise"];
var todoListItems;
var completedTodoList = ["Play Tennis"];
var completedTodoListItems;
var nameOfEditButton:string;


function App (){

  const [userInput, setUserInput] = React.useState("");
  const [numOfTodos, setNumOfTodos] = React.useState(todoList.length);
  const [isCompleted, setIsCompleted] = React.useState("");
  const [draggedId, setDraggedId] = React.useState(String);
  function handleUserInput(name: string, value: string){
    if(name == "addTodoInput"){
      setUserInput(value);
      console.log(name);
    }
    else {
      console.log(name);
      nameOfEditButton = name;
      console.log(nameOfEditButton);
    }
  }
  function handleCheck(name: string, checked: boolean){
    if(checked){
      $("#"+name).css({
        textDecorationLine: 'line-through', textDecorationStyle: 'solid'
      });
      var index = todoList.indexOf($("#"+name).text())
      console.log(index);
      if (index > -1){
        completedTodoList.push($("#"+name).text())
        todoList.splice(index,1);

      }
      setIsCompleted("true");
    }
    else{
      $("#"+name).css({
        textDecorationLine: 'none', textDecorationStyle: 'none'
      });
      var index = completedTodoList.indexOf($("#"+name).text())
      console.log(index);
      if (index > -1){
        todoList.push($("#"+name).text())
        completedTodoList.splice(index,1);
      }
      setIsCompleted("false");
    }
    console.log(todoList, completedTodoList);
  }

  function handleEditSubmit(value:string){
    console.log(value);
    console.log($("#"+value).contents());
    console.log(nameOfEditButton);
    console.log($("#"+nameOfEditButton).parent().parent().parent().parent().parent().prev().find(".col-7").text());
    var string = ($("#"+value).find(".form-control").val() || "");
    console.log(string);
    var string2 = ($("#"+nameOfEditButton).parent().parent().parent().parent().parent().prev().find(".col-7").text());
    var index1 = todoList.indexOf(string2.toString());
    var index2 = completedTodoList.indexOf(string2.toString())
    if (index1 > -1){
      todoList[index1] = string.toString();
    }
    else {
      completedTodoList[index2] = string.toString();
    }
    //$("#"+nameOfEditButton).parent().parent().parent().parent().parent().remove();
    $("#"+value).find(".form-control").val("");
    setIsCompleted("true");
  }
  function handleDrag(name:string){
    console.log(name);
    console.log($(name).find(".row").find(".col-7").attr("id"));
    setDraggedId(($(name).find(".row").find(".col-7").attr("id") || ""));
  }
  function handleDrop(name:string){
    var draggedIndex;
    var droppedIndex;
    const draggedbox = draggedId;
    console.log("id of dragged:" + draggedId);
    const draggedindex1 = todoList.indexOf($("#"+draggedbox).text().toString());
    const draggedindex2 = completedTodoList.indexOf($("#"+draggedbox).text().toString());
    console.log($(name).find(".row").find(".col-7").attr("id"));
    //spotDropped
    const spotDropped = ($(name).find(".row").find(".col-7").attr("id") || "");
    console.log("Id of Dropped:" + spotDropped);
    const droppedindex1 = todoList.indexOf($("#"+spotDropped).text().toString());
    const droppedindex2 = completedTodoList.indexOf($("#"+spotDropped).text().toString());

    if(droppedindex1 > -1){
      droppedIndex = droppedindex1
    }
    else{
      droppedIndex = droppedindex2;
    }
    if(draggedindex1 > -1){
      draggedIndex = draggedindex1;
      if(spotDropped.includes("completed") == false && !draggedId.includes("completed") == true){
        [todoList[draggedIndex], todoList[droppedIndex]] = [todoList[droppedIndex], todoList[draggedIndex]];
      }
      else if(spotDropped.includes("completed") && !draggedId.includes("completed")){
        completedTodoList.push(todoList[draggedIndex]);
        todoList.splice(draggedIndex, 1);
      }
    }
    else{
      draggedIndex = draggedindex2;
      if(spotDropped.includes("completed") == true && draggedId.includes("completed") == true ){
          [completedTodoList[draggedIndex], completedTodoList[droppedIndex]] = [completedTodoList[droppedIndex], completedTodoList[draggedIndex]];
      }
      else if(spotDropped.includes("completed") == false && draggedId.includes("completed") == true){
        todoList.push(completedTodoList[draggedIndex]);
        completedTodoList.splice(draggedIndex, 1);
      }

    }

    setIsCompleted("true");

    //CHANGE INDEX ON ARRAY
  }
  function addTodoItem() {
    console.log("It enters the add function.");
    todoList.push(userInput);
    setNumOfTodos(todoList.length);
    setUserInput("");
    console.log(todoList)
  }
  function deleteTodoItem(name: string){
    console.log(name);
    var index = completedTodoList.indexOf($("#"+name).text());
    var ind = todoList.indexOf($("#"+name).text());
    console.log(index, ind);
    if(index > -1){
      completedTodoList.splice(index,1);
    }
    else if(ind > -1){
      todoList.splice(ind,1);
    }
    console.log(todoList, completedTodoList);
    setIsCompleted("true");
  }

  completedTodoListItems = completedTodoList.map((element, index) => {
    return(
      <TodoListItem  formName={"completed"+index.toString()} onDrop={handleDrop} modalcontainername={"completed"+index.toString()} editbuttonname={"completed" + index.toString()} handleEditSubmit={handleEditSubmit} editItem={handleUserInput} handleDrag={handleDrag} onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} modalName={"completed" + index.toString()} indexOfTodoListItem={"completed"+index.toString()} key={index}/>
    );
  });
  todoListItems = todoList.map((element, index) => {
    return(
      <TodoListItem formName={index.toString()} onDrop={handleDrop} modalcontainername={index.toString()} editbuttonname={index.toString()} handleEditSubmit={handleEditSubmit} editItem={handleUserInput} handleDrag={handleDrag} onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} modalName={index.toString()} indexOfTodoListItem={index.toString()} key={index}/>
    );
  });
  React.useEffect(() => {
    console.log(userInput, numOfTodos, isCompleted);
    console.log(todoList, completedTodoList);
    completedTodoList.forEach((element, index) => {
        $("#completed"+index).css({
          textDecorationLine: 'line-through', textDecorationStyle: 'solid'
        });
        $("#completed"+index).prev().find("input").prop("checked", true);
      });
    todoList.forEach((element, index)=>{
        $("#"+index).css({
          textDecorationLine: 'none', textDecorationStyle: 'none'
        });
        $("#"+index).prev().find("input").prop("checked", false);
      });
      setIsCompleted("");
  },
  [userInput, numOfTodos, isCompleted, draggedId]
  );
  return(
    <>
      <AddTodoSection onSubmit={addTodoItem} userInput={userInput} handleUserInput={handleUserInput}/>

      <div className="container-fluid" id="pendingItems">
        <div className="row">
          <div className="col-4 offset-4 d-flex justify-content-center">
           PENDING ITEMS
          </div>
        </div>
      </div>

      <div id="pending">{todoListItems}</div>

      <div className="container-fluid" id="completedItems">
        <div className="row">
          <div className="col-4 offset-4 d-flex justify-content-center">
           COMPLETED ITEMS
          </div>
        </div>
      </div>

      <div id="completed" className="list-group">{completedTodoListItems}</div>
    </>
  );
}

export default App;
