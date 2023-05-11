import { useState, useEffect } from "react";
import useStore from "../store";
import TodoListItem from "./TodoListItem";
import './todo.css'

function TodoListItems() {
  const store = useStore((state) => state);

  const [todoList, setTodoList] = useState(store.todos)

  const sortTodos = (sort: 'asc' | 'desc', sortBy: 'title' | 'date') => {
    const arr = store.todos.slice()
    store.setTodos(arr.sort((a, b) => {
      return sort == 'asc' ?
        a[sortBy].localeCompare(b[sortBy]) :
        b[sortBy].localeCompare(a[sortBy])
    }))
  }

  const searchTodoByTitle = (e: any) => {
    if (e.target.value === '') {
      setTodoList(store.todos)
    }
    setTodoList(store.todos.filter(item => item.title === e.target.value))
  }

  useEffect(() => {

  }, [store.todos])

  return (
    <>
      <input placeholder="Search by title" className='input' onChange={(e) => searchTodoByTitle(e)} />
      <div className="sortOptions">
        <div className="sortOption" onClick={() => sortTodos('asc', 'title')} key="1">A to Z</div>
        <div className="sortOption" onClick={() => sortTodos('desc', 'title')} key="2">Z to A</div>
        <div className="sortOption" onClick={() => sortTodos('desc', 'date')} key="3">Recently added</div>
        <div className="sortOption" onClick={() => sortTodos('asc', 'date')} key="4">Anciently added </div>
      </div>
      {(todoList.length === 0 ? store.todos : todoList).map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <h1>Notes</h1>
      <TodoListItems />
    </>
  );
}

export default TodoList;