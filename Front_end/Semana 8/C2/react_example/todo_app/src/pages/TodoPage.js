import { useState } from "react"
import { TodoList } from "../components/todo_list/todo_list.component"

const TodoPage = () => {
    const defaultTodoList = [
        //{ id : 1, nombre : "Ir al cine"},
        //{ id : 2, nombre : "comprar pan"},
        //{ id : 3, nombre : "limpiar cuarto"}
    ]

    const [todoList, setTodoList] = useState(defaultTodoList)
    const [todoName, setTodoName] = useState("")

    const onDeleteItem = (id) => {
        const indexToDelete = todoList.findIndex((item) => {
            return item.id === id;
        })

        todoList.splice(indexToDelete, 1);

        setTodoList([...todoList])
    }

    return (
        <div className="container">
            <h1>Todo APP</h1>
            <form className="row g-2">
              <div className="col-auto">
                  <input className="form-control" 
                    value={todoName}
                    onChange={(evt) => {
                        setTodoName(evt.target.value)
                    }} 
                    type="text"></input>
              </div>
              <div className="col-auto">
                  <button className="btn btn-primary" 
                        type="button"
                        onClick={() => {
                            let newId = 0
                            if (todoList.length !== 0){
                                newId = todoList[todoList.length-1].id + 1;
                            }
                            //console.log("Entra")
                            todoList.push({
                                id : newId,
                                nombre : todoName
                            })
                            //refrescar la caja
                            setTodoName("")
                            //console.log(todoList)
                            setTodoList([...todoList])
                        }}>+</button>
              </div>
            </form>
            <hr></hr>
            <TodoList items={todoList}
                onDeleteItem = {onDeleteItem}/>
        </div>
    )
}
export default TodoPage;