import React, { useState } from "react";

function FriendForm({ addFriend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addFriend(value);
    setValue("");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter friend name"
        />
      </form>
    </div>
  );
}

export default FriendForm;
