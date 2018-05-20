import React from "react";

export const EditItemButton = props => (
  <button
    className="edit-item-btn"
    onClick={() => props.flagItemForEdit(props.objKey)}
  />
);

export const EditListButton = props => (
  <button
    className="edit-list-btn"
    onClick={() => props.flagListForEdit()}
  />
);
