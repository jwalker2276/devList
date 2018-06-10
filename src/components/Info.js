import React from "react";
import ListTitle from "./ListTitle";

const Info = () => (
  <div className="list-box">
    <div className="list-tab-wrapper">
      <ListTitle title="Info" />
    </div>
    <div className="list-items">
      <div className="list-item-box">
        <p className="item-class">{"//"} Developer's List</p>
        <p className="item-comment">{"//"} What is this?</p>
        <p className="item-text">
          I created this web app so other developers could share great resources
          they have found.
        </p>
        <p className="item-comment">{"//"} How does it work?</p>
        <p className="item-text">There are two ways to use this app.</p>
        <p className="item-text">
          <span className="item-title">View</span> and{" "}
          <span className="item-title">Interact</span>
        </p>
        <p className="item-text">
          To interact with the list you have to login either with Github or
          Facebook. Currently, login is not supported on small screens, but
          tablets and up will work.
        </p>
        <p className="item-text">
          To view a list just click the name of a list from the list explorer.
        </p>
        <p className="item-text">
          Once you have logged in, you can create a new list.
        </p>
        <p className="item-comment">{"//"} What should I add?</p>
        <p className="item-text">
          Think of what you have bookmarked, or something you visit constantly.
        </p>
        <p className="item-comment">{"//"} How do I add to an existing list?</p>
        <p className="item-text">
          To add to an existing list, select the list from the list explorer
          then fill in the details in the user setting panel.
        </p>
        <p className="item-comment">{"//"} Editing</p>
        <p className="item-text">
          To change the info of either a list or list item, that you added, just
          click the cog icon. This will load the details in the user setting
          panel. Once your finished editing click the done button.
        </p>
        <p className="item-comment">{"//"} Voting</p>
        <p className="item-text">
          Currently, I give each user three votes a day. You can use your votes
          to up-vote or down-vote each item. You can even up-vote or down-vote a
          single item three times, but so can everyone else.
        </p>
        <p className="item-comment">
          {"//"} Why can I vote three times on one item?
        </p>
        <p className="item-text">
          I chose this way so I would not have to log each user's actions in a
          database. You get three votes, do what you wish with them. You will
          see the combined votes, up and down, on each item. But the item will
          move up and down the list according to the up votes.
        </p>
        <p className="item-comment">
          {"//"} What if I see something that doesn't belong here?
        </p>
        <p className="item-text">
          I will be watching the list, but if I miss something email me at
          devlistapp@gmail.com.
        </p>
      </div>
    </div>
  </div>
);

export default Info;
