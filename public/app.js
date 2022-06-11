const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [name, setName] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [edit, setEdit] = React.useState({});

  function generateId() {
    return Date.now();
  }

  function addTodo(event) {
    event.preventDefault();

    if (name === '') {
      setAlert(true);
      return;
    }

    setTodos([...todos, {
      'id': generateId(),
      'done': false,
      name
    }]);
    setName('');
  }

  function editTodo(todo) {
    setAlert(false);
    setName(todo.name);
    setEdit(todo);
  }

  function updateTodo(event) {
    event.preventDefault();

    if (name === '') {
      setAlert(true);
      return;
    }

    const editTodo = { ...edit,
      name
    };
    const todoIndex = todos.findIndex(function (todo) {
      return todo.id === edit.id;
    });
    const update = [...todos];
    update[todoIndex] = editTodo;
    setTodos(update);
    setName('');
  }

  function cancelTodo() {
    setEdit({});
    setName('');
  }

  function removeTodo(id) {
    const activity = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(activity);
    cancelTodo();
  }

  function doneTodo(value) {
    const doneTodo = { ...value,
      'done': !value.done
    };
    const todoIndex = todos.findIndex(function (todo) {
      return todo.id === value.id;
    });
    const update = [...todos];
    update[todoIndex] = doneTodo;
    setTodos(update);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "ToDo App"), alert && /*#__PURE__*/React.createElement("h3", null, "Input cannot empty"), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: name,
    placeholder: "Aktivitas",
    onChange: function (event) {
      setName(event.target.value);
    }
  }), "\xA0", edit.id ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: updateTodo
  }, "Edit"), "\xA0", /*#__PURE__*/React.createElement("button", {
    onClick: cancelTodo
  }, "Cancel")) : /*#__PURE__*/React.createElement("button", {
    onClick: addTodo
  }, "Add")), /*#__PURE__*/React.createElement("ul", null, todos.map(function (todo) {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      onClick: doneTodo.bind(this, todo)
    }), todo.name, " \xA0\xA0", !todo.done && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: editTodo.bind(this, todo)
    }, "Edit"), "\xA0", /*#__PURE__*/React.createElement("button", {
      onClick: removeTodo.bind(this, todo.id)
    }, "Hapus")));
  })));
}

root.render( /*#__PURE__*/React.createElement(App, null));