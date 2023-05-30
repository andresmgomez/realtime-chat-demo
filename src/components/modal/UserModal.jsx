import { useState } from 'react';
import styles from './UserModal.module.css';

export default function UserModal({ closeModal, addUser }) {
   const [username, setUsername] = useState('');
   const [validateMinLength, setValidateMinLength] = useState(false);
   const [validateMaxLength, setValidateMaxLength] = useState(false);

   const handleUserInputField = (event) => {
      event.preventDefault();
      const typedOnlineUser = event.target.value;
      if (typedOnlineUser) {
         setValidateMinLength(false);
         setUsername(typedOnlineUser);
      }
      if (typedOnlineUser.length < 5) {
         setValidateMinLength(true);
         setValidateMaxLength(false);
      } else if (typedOnlineUser.length > 12) {
         setValidateMinLength(false);
         setValidateMaxLength(true);
      }
   };

   const submitNewUser = () => {
      if (username) {
         addUser(username.trim());
         closeModal();
      }
   };

   return (
      <div className="modal d-block">
         <div className={`${styles.backdrop}`}></div>
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Add User to Chat Group</h5>
               </div>
               <div className="modal-body">
                  <div className="input-group has-validation">
                     <span className="input-group-text">@</span>
                     <div className="form-floating is-invalid">
                        <input
                           type="text"
                           className="form-control is-invalid"
                           id="floatingInputGroup2"
                           placeholder="Username"
                           required
                           value={username}
                           onChange={handleUserInputField}
                        />
                        <label htmlFor="floatingInputGroup2">Username</label>
                     </div>
                     {validateMinLength ? (
                        <div className="invalid-feedback">
                           Username should be at least 5 characters
                        </div>
                     ) : null}
                     {validateMaxLength ? (
                        <div className="invalid-feedback">
                           Username should be maximum 12 characters
                        </div>
                     ) : null}
                  </div>
               </div>
               <div className="modal-footer">
                  <button
                     type="button"
                     className="btn btn-primary"
                     disabled={validateMinLength || validateMaxLength}
                     onClick={submitNewUser}>
                     New User
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
