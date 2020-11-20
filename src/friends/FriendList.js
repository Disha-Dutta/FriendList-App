import React, { useState } from "react";

function FriendList({ friend, index, addToFav, removeFriend }) {
  return (
    <div className="friend">
      {friend.text}

      <div>
        {friend.isCompleted ? (
          <button
            style={{ backgroundColor: "yellow", border: "none" }}
            onClick={() => addToFav(friend.id)}
          >
            ★
          </button>
        ) : (
          <button onClick={() => addToFav(friend.id)}>☆</button>
        )}
        <button onClick={() => removeFriend(friend.id)}>x</button>
      </div>
    </div>
  );
}

export default FriendList;
