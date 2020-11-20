import React, { useState } from "react";
import "./App.css";
import { FriendList, FriendForm } from "./friends";

function App() {
  const [friends, setFriends] = useState([
    {
      id: 1,
      text: "Rajinder",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Priya Dutta",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Ruhani",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Subhadeep",
      isCompleted: false,
    },
    {
      id: 5,
      text: "Subha",
      isCompleted: false,
    },
  ]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState(friends);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(4);

  const search = (clear = null) => {
    if (value && !clear) {
      let filterData = friends.filter((item) => {
        const textlc = item.text.toLowerCase();
        const valuelc = value.toLowerCase();

        return textlc.includes(valuelc);
      });
      setFilter(filterData);
    } else {
      setFilter(friends);
    }
  };

  const addFriend = (text) => {
    const newFriendList = [
      ...friends,
      { id: friends.length + 1, text, isCompleted: false },
    ];
    setFriends(newFriendList);
    setFilter(newFriendList);
  };

  const addToFav = (id) => {
    const newFriendList = [...filter];
    var friendIndex = newFriendList.findIndex((e) => e.id === id);
    var friend = newFriendList[friendIndex];
    friend.isCompleted = !friend.isCompleted;
    newFriendList.splice(friendIndex, 1);
    friend.isCompleted
      ? newFriendList.unshift(friend)
      : newFriendList.push(friend);
    setFilter(newFriendList);
  };

  const removeFriend = (id) => {
    var confirmed = window.confirm(
      "are you sure you want to delete this friend from the list?"
    );
    if (confirmed) {
      const newFriendList = [...filter];
      var friendIndex = newFriendList.findIndex((e) => e.id === id);
      newFriendList.splice(friendIndex, 1);
      setFriends(newFriendList);
      setFilter(newFriendList);
    } else {
      return false;
    }
  };

  const handlePagination = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastFriend = currentPage * todosPerPage;
  const indexOfFirstFriend = indexOfLastFriend - todosPerPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filter.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={(e) => handlePagination(e)}>
        {number}
      </li>
    );
  });

  return (
    <div className="app">
      <div className="friend-list">
        <h3>Friends List</h3>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (e.target.value === "") search(true);
          }}
          placeholder="Search"
        />
        <button onClick={() => search()}>Search</button>
        {filter
          .slice(indexOfFirstFriend, indexOfLastFriend)
          .map((friend, index) => (
            <FriendList
              key={index}
              index={index}
              friend={friend}
              addToFav={addToFav}
              removeFriend={removeFriend}
            />
          ))}

        <h4>Add New Friends</h4>
        <FriendForm friend={friends} addFriend={addFriend} />

        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    </div>
  );
}

export default App;
