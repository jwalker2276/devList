import React from 'react';

const ListTitle = props => (
  <div className="list-heading">
    <div className="list-title-tab">
      <h3 className="list-title">{props.title}<span className="item-text">.js</span></h3>
    </div>
  </div>
);

export default ListTitle;