import React from "react";

import "./ShowList.css";

function ShowList(props) {
  const listType = props.listType;

  const shouldShowEditListTitleButton = (listType === "removed") ? false : true;
  const thrashIconClass = (listType === "removed") ? "fas fa-trash-restore" :
                                                     "fa fa-trash";

  return (
    <div
        key={props.list.id}
        className="list"
        onClick={props.onClickShowList}
      >
        <h1 className="list-title">
          {props.list.title}
          <button
            className="list-title-edit"
            title="Edit list title"
            onClick={props.onClickEditTitle}
            hidden={!shouldShowEditListTitleButton}
          >
            <span className="fas fa-edit"></span>
          </button>
        </h1>
        <span className="list-length">0 / {props.list.items.length}</span>
        <button 
          className="list-remove"
          onClick={(event) => props.onClickRemoveList(event, props.list.id)}
        >
          <span className={thrashIconClass}></span>
        </button>
         <div className="line"></div>
      </div>
  );
}

export default ShowList;
