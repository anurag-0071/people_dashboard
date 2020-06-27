import React from "react";

function UserCard({
  user
}) {

  return (
    <div id="UserContainer" className="UserContainer">
      <div id="Avatar">
        <img
          className="Avatar"
          src={user.avatar}
          alt="loading"
        >
        </img>
      </div>
      <div id="LastName"
        className="LastName"
      >
        {user.last_name}
      </div>
      <div id="FirstName">
        {user.first_name}
      </div>
      <div id="Email"
        className="Email"
      >
        {user.email}
      </div>

    </div>
  )

}

export default UserCard;