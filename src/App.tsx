
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
  const [isCompleted, setIsCompleted] = React.useState(false);
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
    }
    else if(!checked){
      $("#"+name).css({
        textDecorationLine: 'none', textDecorationStyle: 'none'
      });
    }
      
  }
  function addTodoItem() {
    console.log("It enters the add function.");
    todoList.push(userInput);
    setNumOfTodos(todoList.length);
    setUserInput("");
    console.log(todoList)
  }
  function deleteTodoItem(name: string){
   
  }
  completedTodoListItems = completedTodoList.map((element, index) => {
    return(
      <TodoListItem  onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} indexOfTodoListItem={"completed"+index.toString()}/>
    );
  });
  todoListItems = todoList.map((element, index) => {
    return(
      <TodoListItem onCheck={handleCheck} todoString={element} onClick={deleteTodoItem} indexOfTodoListItem={index.toString()}/>
    );
  });
  React.useEffect(() => {
    console.log(userInput, numOfTodos, isCompleted);
    completedTodoList.forEach((element, index) => {
      $("#completed"+index).css({
        textDecorationLine: 'line-through', textDecorationStyle: 'solid'
      });
    });
  },
  [userInput, numOfTodos, isCompleted]
  );
  return(
    <>
      <AddTodoSection userInput={userInput} handleUserInput={handleUserInput} onClickAddButton={addTodoItem}/>
      <div>{todoListItems}</div>
      <div>{completedTodoListItems}</div>
    </>
  );
}

export default App;
