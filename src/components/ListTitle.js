import React from 'react';

const ListTitle = props => (
  <div className="list-title-tab">
    <h3 className="list-title">{props.title}<span className="item-text">.js</span></h3>
  </div>
);

export default ListTitle;