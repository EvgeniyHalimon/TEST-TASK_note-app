import { create } from "zustand";

// Standard interface and functions
export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
  date: string;
}

const updateTitle = (todos: Todo[], id: number, title: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    title: todo.id === id ? title : todo.title,
  }));

const updateBody = (todos: Todo[], id: number, body: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    body: todo.id === id ? body : todo.body,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], title: string, body: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    title: title,
    body: body,
    done: false,
    date: new Date().toLocaleString()
  },
];

// Zustand
type Store = {
  todos: Todo[];
  title: string;
  body: string;
  setTodos: (todos: Todo[]) => void;
  addTodo: () => void;
  updateTitle: (id: number, title: string) => void;
  updateBody: (id: number, body: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setNewTitle: (title: string) => void;
  setNewBody: (body: string) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    todos: [],
    title: "",
    body: "",
    setTodos: (todos: Todo[]) =>
      set((state) => ({
        ...state,
        todos,
      })),
    removeTodo: (id: number) =>
      set((state) => ({
        ...state,
        todos: removeTodo(state.todos, id),
      })),
    updateTitle: (id: number, title: string,) =>
      set((state) => ({
        ...state,
        todos: updateTitle(state.todos, id, title),
      })),
    updateBody: (id: number, body: string,) =>
      set((state) => ({
        ...state,
        todos: updateBody(state.todos, id, body),
      })),
    toggleTodo: (id: number) =>
      set((state) => ({
        ...state,
        todos: toggleTodo(state.todos, id),
      })),
    setNewTitle: (title: string) =>
      set((state) => ({
        ...state,
        title,
      })),
    setNewBody: (body: string) =>
      set((state) => ({
        ...state,
        body,
      })),
    addTodo: () =>
      set((state) => ({
        ...state,
        todos: addTodo(state.todos, state.title, state.body),
        title: "",
        body: "",
      })),
  })
);

export default useStore;