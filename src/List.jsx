import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({items, handleDelete, handleEdit}) => {
  return <div className="grocery-list">
    {items.map(el => {
        const { id, title} = el
        return <article key={id} className="grocery-item">
            <p>{title}</p>
            <div className="btn-container">
                <button  onClick={() => handleEdit(id)} className="edit-btn" type="button">
                    <FaEdit/>
                </button>
                <button  onClick={() => handleDelete(id)} className="delete-btn" type="button">
                    <FaTrash/>
                </button>
            </div>
        </article>
    })}
  </div>;
};

export default List;
