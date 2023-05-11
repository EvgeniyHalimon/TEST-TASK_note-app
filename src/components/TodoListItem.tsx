import { useState, memo } from "react";
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import useStore, { Todo } from "../store";
import './todo.css'

const TodoListItem = ({todo} : {todo : Todo}) => {
    const store = useStore((state) => state);
    const [isBodyShow, setIsBodyShow] = useState(false)
    return (
        <div className="todoItem">
            <div className="todoItem_actions">
                <input
                    type="checkbox"
                    onChange={() => store.toggleTodo(todo.id)}
                    checked={todo.done}
                />
                <div className="icon" onClick={() => store.removeTodo(todo.id)}><FaTrash /></div>
                <div className="icon" onClick={() => setIsBodyShow(!isBodyShow)}>
                    {isBodyShow ?
                        <FaEyeSlash /> :
                        <FaEye />
                    }
                </div>
            </div>
            <div className="todoItem_fields">
                <label htmlFor='title' className="todoItem_label">Title</label>
                <input
                    id='title'
                    className='todoInput'
                    value={todo.title}
                    onChange={(evt) => store.updateTitle(todo.id, evt.target.value)}
                />
                <label htmlFor='body' className="todoItem_label">Body</label>
                {isBodyShow ? <p>{todo.body}</p> :
                    <input
                        id='body'
                        className='todoInput todoInput-body'
                        value={todo.body}
                        onChange={(evt) => store.updateBody(todo.id, evt.target.value)}
                    />
                }
                <p>{todo.date.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default memo(TodoListItem)