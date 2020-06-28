import React, { useState } from "react";

import EditModal from "./EditModal";

function UserCard({
  user,
  updateUser
}) {

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div
      id="UserContainer"
      className="UserContainer"
    >
      <div
        onClick={handleClick}
      >
        <div id="Avatar">
          <img
            // style={Style}
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
      <EditModal
        id={user.id}
        show={showModal}
        handleClose={handleClose}
        user={user}
        onSubmit={updateUser}
      />

    </div>
  )

}

export default UserCard;