import React from "react";

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
        <h2>Add a new list</h2>
        <form className="add-list-form" onSubmit={this.createList}>
          <input
            name="list-name"
            ref={this.titleRef}
            type="text"
            placeholder="List name"
          />
          <button type="submit">Add List</button>
        </form>
      </div>
    );
  }
}

export default Addlist;
