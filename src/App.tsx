import React from "react";
import AddTodoSection from "./Components/Add-Todo-Section";

function App (){
  const [userInput, setUserInput] = React.useState("");
  React.useEffect(() => {
    console.log(userInput);
  },
  [userInput]
  );
  function handleUserInput(name: string, value: string){
    if(name == "addTodoInput"){
      setUserInput(value);
    }
  }
  return(
    <AddTodoSection userInput={userInput} handleUserInput={handleUserInput}/>
  );
}

export default App;
