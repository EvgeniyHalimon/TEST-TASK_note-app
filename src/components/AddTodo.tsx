import useStore from '../store';
import './todo.css'

const AddTodo = () => {
  const store = useStore()

  return (
    <div className='addTodo'>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          className='input'
          placeholder='Title'
          value={store.title}
          onChange={(e) => store.setNewTitle(e.target.value)}
        />
        <label htmlFor='body'>Body</label>
        <input
          id='body'
          className='input'
          placeholder='Body'
          value={store.body}
          onChange={(e) => store.setNewBody(e.target.value)}
        />
        <button onClick={() => store.addTodo()}>Add Todo</button>
    </div>
  )
}

export default AddTodo