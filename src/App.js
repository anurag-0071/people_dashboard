import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import UserCard from "./Components/UserCard";

const FETCH_USERS_URL = "https://reqres.in/api/users";  // GET https://reqres.in/api/users?page=1
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
    fetch(FETCH_USERS_URL + "?page=" + state.page).then(res => res.json())
      .then(response => {
        console.log("fetch Users response ", response);
        const users = response.data;
        setState(Object.assign({}, state, {
          isLoading: false,
          users,
          hasMore: !(response.page === response.total_pages)
        }));
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
      <UserCard key={user.id} user={user} />
    ))
  }

  return (
    <div className="App">
      {getUsers()}
    </div>
  );
}

export default App;
