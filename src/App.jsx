import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      // setAlert({show: true, msg: "please enter value", type: "danger"})
      showAlert(true, "danger", "Enter value please");
    } else if (name && isEditing) {
      //deal with edit

      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'successfully updated')
    } else {
      showAlert(true, "success", "item added successfully");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  const clearAll = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleDelete = (id) => {
    showAlert(true, "danger", "Item removed successfully");
    setList(list.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setEditId(id);
    setIsEditing(true);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert list={list} {...alert} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="grocery"
            placeholder="e.g Eggs"
          />
          <button type="submit " className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
