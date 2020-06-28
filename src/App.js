import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import UserCard from "./Components/UserCard";

const REQUEST_URL = "https://reqres.in/api/users";  // GET https://reqres.in/api/users?page=1
const UPDATE_USERS_URL = "https://reqres.in/api/users";  // PUT https://reqres.in/api/users/{userID},

function App() {

  const initialState = {
    isLoading: false,
    page: 1,
    hasMore: true,
    users: [],
  }
  const [state, setState] = useState(initialState)
  // const [currentUs]

  const fetchUsers = () => {
    fetch(REQUEST_URL + "?page=" + state.page).then(res => res.json())
      .then(response => {
        const users = response.data;
        setState(Object.assign({}, state, {
          isLoading: false,
          users,
          hasMore: !(response.page === response.total_pages)
        }));
      }, error => {
        console.error("Error in fetching users", error);
      });
  }

  const updateUser = (user) => {
    fetch(REQUEST_URL + "/" + user.id, {
      method: "PUT",
      body: user
    }).then(res => res.json())
      .then(result => {
        alert(JSON.stringify(result));
        loadUsers();
      })
  }

  const loadUsers = () => {
    setState(Object.assign({}, state, {
      isLoading: true,
      page: state.page + 1
    }));
    if (state.hasMore) {
      fetchUsers();
    }
  }

  useEffect(() => {
    loadUsers();
  }, [])

  const getUsers = () => {
    return state.users.map(user => (
      <UserCard key={user.id} user={user} updateUser={updateUser} />
    ))
  }

  return (
    <div className="App">
      {getUsers()}
    </div>
  );
}

export default App;
