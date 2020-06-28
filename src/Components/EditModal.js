import React, { useState } from "react";

function EditModal({
  id,
  handleClose,
  show,
  user,
  onSubmit
}) {

  const [currentUser, setCurrentUser] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  })
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleModalClose = () => {
    handleClose();
  }

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setCurrentUser(Object.assign({}, currentUser, {
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = () => {
    onSubmit(currentUser);
    handleModalClose();
  }

  return (
    <div className={showHideClassName} key={id}>
      <section className="modal-main">
        <div
          id="UserForm"
          className="UserForm"
        >
          <div
            id="ModalTitle"
            className="ModalTitle"
          >Edit Details</div>
          <div
            className="EditForm"
          >
            <div id="FirstName" className="FormField">
              <label className="ModalLabel">FirstName</label>
              <input onChange={onChange} className="Input" name="first_name" type="text" value={currentUser.first_name}></input>
            </div>
            <div id="LastName" className="FormField">
              <label className="ModalLabel">LastName</label>
              <input onChange={onChange} className="Input" name="last_name" type="text" value={currentUser.last_name}></input>
            </div>
            <div id="Email" className="FormField">
              <label className="ModalLabel">Email</label>
              <input onChange={onChange} className="Input" name="email" type="text" value={currentUser.email}></input>
            </div>
          </div>
        </div>
        <div
          id="ActionArea"
          className="ActionArea"
          style={{ float: "right" }}
        >
          <button
            className={"SubmitButton"}
            onClick={handleSubmit}>Save</button>
          <button
            className={"CancelButton"}
            onClick={handleModalClose}>Cancel</button>
        </div>
      </section>
    </div>
  )

}

export default EditModal;