const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {

    const [name, setName] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    const [alert, setAlert] = React.useState(false);
    const [edit, setEdit] = React.useState({});

    function generateId() {
        return Date.now()
    }

    function addTodo(event) {
        event.preventDefault();

        if(name === '') {
            setAlert(true);
            return
        }

        setTodos([...todos, {
            'id': generateId(),
            'done': false,
            name
        }]);

        setName('')
    }

    function editTodo(todo) {
        setAlert(false)
        setName(todo.name);
        setEdit(todo);
    }

    function updateTodo(event) {
        event.preventDefault();

        if(name === '') {
            setAlert(true);
            return
        }

        const editTodo = {
            ...edit,
            name
        }

        const todoIndex = todos.findIndex(function (todo) {
            return todo.id === edit.id;
        });

        const update = [... todos];
        update[todoIndex] = editTodo;

        setTodos(update);
        setName('')
    }
    
    function cancelTodo() {
        setEdit({})
        setName('')
    }

    function removeTodo(id) {
        const activity = todos.filter(function (todo) {
            return todo.id !== id
        });

        setTodos(activity);
        cancelTodo()
    }

    function doneTodo(value) {
        const doneTodo = {
            ...value,
            'done': !value.done,
        }

        const todoIndex = todos.findIndex(function (todo) {
            return todo.id === value.id;
        });

        const update = [... todos];
        update[todoIndex] = doneTodo;

        setTodos(update);
    }

    return (
      <>
          <h1>ToDo App</h1>
          {alert &&
              (<h3>Input cannot empty</h3>)
          }
          <form>
              <input type="text" value={name} placeholder="Aktivitas" onChange={function (event) {
                  setName(event.target.value)
              }} />&nbsp;
              {edit.id ? (
                  <>
                      <button onClick={updateTodo}>Edit</button>&nbsp;
                      <button onClick={cancelTodo}>Cancel</button>
                  </>
              ) : (
                  <button onClick={addTodo}>Add</button>
              )}
          </form>
          <ul>
              {todos.map(function (todo) {
                  return (
                        <li key={todo.id}>
                            <input type="checkbox" onClick={doneTodo.bind(this, todo)}/>
                            {todo.name} &nbsp;&nbsp;
                            {!todo.done && (
                                <>
                                    <button onClick={editTodo.bind(this, todo)}>Edit</button>&nbsp;
                                    <button onClick={removeTodo.bind(this, todo.id)}>Hapus</button>
                                </>
                                )
                            }
                        </li>
                  )
              })}
          </ul>
      </>
    );
}

root.render(<App />);