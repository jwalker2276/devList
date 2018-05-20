import React from "react";

export const EditItemButton = props => (
  <button
    className="edit-btn"
    onClick={() => props.flagItemForEdit(props.objKey)}
  />
);

export const EditListButton = props => (
  <button
    className="edit-btn"
    onClick={() => props.flagListForEdit()}
  />
);
