import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ItemVotes = props => (
  <p className="item-text item-indent">
    <span className="item-this">this</span>
    <span className="item-period">
      .
    </span>totalVotes<span className="item-equal"> = </span>
    <TransitionGroup component="span" className="fade">
      <CSSTransition
        classNames="fade"
        key={props.totalVotes}
        timeout={{ enter: 500, exit: 0 }}
      >
        <span className="item-number">
          {`${props.totalVotes}`}
          <span className="item-text">&#59;</span>
        </span>
      </CSSTransition>
    </TransitionGroup>
  </p>
);

export default ItemVotes;
