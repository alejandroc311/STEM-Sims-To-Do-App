
import React from "react";
import $, { event } from "jquery";

import AddTodoSection from "./Components/Add-Todo-Section";
import TodoListItem from "./Components/Pending-Todo-Section-Components/TodoListItem";
var todoList = ["Wash Laundry","Finish STEM Sims Exercise"];
var todoListItems;
var completedTodoList = ["Play Tennis"];
var completedTodoListItems;

function App (){
  
  const [userInput, setUserInput] = React.useState("");
  const [numOfTodos, setNumOfTodos] = React.useState(todoList.length);
  const [isCompleted, setIsCompleted] = React.useState("");
  const [draggedId, setDraggedId] = React.useState(String);
  function handleUserInput(name: string, value: string){
    if(name == "addTodoInput"){
      setUserInput(value);
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
  function handleDrag(name:string){
    console.log(name);
    console.log($(name).find(".row").find(".col-8").attr("id"));
    setDraggedId(($(name).find(".row").find(".col-8").attr("id") || ""));
  }
  function handleDrop(name:string){
    var draggedIndex;
    var droppedIndex;
    const draggedbox = draggedId;
    const draggedindex1 = todoList.indexOf($("#"+draggedbox).text());
    const draggedindex2 = completedTodoList.indexOf($("#"+draggedbox).text());
    //spotDropped
    const spotDropped = $(name).find(".row").find(".col-8").attr("id");
    const droppedindex1 = todoList.indexOf($("#"+spotDropped).text());
    const droppedindex2 = completedTodoList.indexOf($("#"+spotDropped).text());
    
    if(droppedindex1 > -1){
      droppedIndex = droppedindex1
    }
    else{
      droppedIndex = droppedindex2;
    }
    if(draggedindex1 > -1){
      draggedIndex = draggedindex1;
      [todoList[draggedIndex], todoList[droppedIndex]] = [todoList[droppedIndex], todoList[draggedIndex]];
    }
    else{
      draggedIndex = draggedindex2;
      [completedTodoList[draggedIndex], completedTodoList[droppedIndex]] = [completedTodoList[droppedIndex], completedTodoList[draggedIndex]];
    }

    setIsCompleted("true");

    //CHANGE INDEX ON ARRAY
  }
  function addTodoItem() {
    console.log("It enters theç add function.");
    todoList.push(userInput);
    setNumOfTodos(todoList.length);
    setUserInput("");
    console.log(todoList)
  }
  function deleteTodoItem(name: string){
    console.log(name);
    console.log($("#"+name).text());
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
      <TodoListItem  onDrop={handleDrop} handleDrag={handleDrag} onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} indexOfTodoListItem={"completed"+index.toString()} key={index}/>
    );
  });
  todoListItems = todoList.map((element, index) => {
    return(
      <TodoListItem onDrop={handleDrop} handleDrag={handleDrag} onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} indexOfTodoListItem={index.toString()} key={index}/>
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
      <AddTodoSection userInput={userInput} handleUserInput={handleUserInput} onClickAddButton={addTodoItem}/>

      <div className="container-fluid" id="pendingItems"> 
        <div className="row">
          <div className="col-4 offset-4 d-flex justify-content-center">
           PENDING ITEMS
          </div>
        </div>
      </div>
      
      {}<div id="pending" className="list-group">{todoListItems}</div>
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
