import React, { useEffect, useState } from 'react';
import './App.css';

import UserCard from "./Components/UserCard";

const REQUEST_URL = "https://reqres.in/api/users";  // GET https://reqres.in/api/users?page=1

function App() {

  const initialState = {
    isLoading: false,
    page: 1,
    hasMore: true,
    users: [],
  }

  const [state, setState] = useState(initialState)

  const fetchUsers = () => {
    fetch(REQUEST_URL + "?page=" + state.page).then(res => res.json())
      .then(response => {
        const users = response.data;
        setState(Object.assign({}, state, {
          isLoading: false,
          users: [
            ...state.users,
            ...users
          ],
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
      })
  }

  const loadUsers = () => {
    console.log("fetching users")
    setState(Object.assign({}, state, {
      isLoading: true,
    }));
    if (state.hasMore) {
      fetchUsers();
    }
  }

  window.onscroll = (scroll) => {
    if (state.hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      console.log("changing page no", Object.assign({}, state, {
        page: state.page + 1
      }))
      setState({
        ...state,
        page: state.page + 1
      })
    }
  }

  useEffect(() => {
    loadUsers();
  }, [state.page])

  const getUsers = () => {
    return state.users.map(user => (
      <UserCard key={user.id} user={user} updateUser={updateUser} />
    ))
  }

  return (
    <div className="App" >
      {getUsers()}
    </div>
  );
}

export default App;
