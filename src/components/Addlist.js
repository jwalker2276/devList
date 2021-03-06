import React from "react";
import { CommentEnd } from "./ItemSyntax";

//This component handles adding new lists from the user.

class Addlist extends React.Component {
  titleRef = React.createRef();

  createList = event => {
    //Stop form from submitting
    event.preventDefault();

    //Object to be passed to method in app.js
    const list = {
      owner: this.props.userId,
      items: "",
      title: this.titleRef.current.value,
      views: 0
    };

    //Method in app.js
    this.props.addList(list);

    // Clear the form after submitted
    event.currentTarget.reset();
  };

  render() {
    return (
      <div className="add-list-div">
        <p className="item-comment">{"//"} Add your new list</p>
        <div className="add-list-grid">
          <p className="item-class">
            const <span className="item-text">list</span>
            <span className="item-equal"> = </span>
            <span className="item-number">new </span>
          </p>
          <form
            className="add-list-form add-list-mid"
            onSubmit={this.createList}
          >
            <input
              name="list-name"
              ref={this.titleRef}
              type="text"
              placeholder="Enter name here"
              required
              minLength="1"
              maxLength="25"
              pattern="[A-Za-z ]{1,25}"
              title="Letters and spaces only"
            />
            <span className="item-text add-list-end">&#40;&#41;&#59;</span>
            <button className="syntax-btn" type="submit">
              Add List
            </button>
          </form>
        </div>
        <CommentEnd />
      </div>
    );
  }
}

export default Addlist;
