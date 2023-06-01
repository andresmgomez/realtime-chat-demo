import { useState } from 'react';
import ContainerModal from '../ContainerModal/ContainerModal';

export default function UserModal({ title, label, cta, addUser, closeModal }) {
   const [onlineUser, setOnlineUser] = useState('');
   const [validateMinLength, setValidateMinLength] = useState(false);
   const [validateMaxLength, setValidateMaxLength] = useState(false);

   const handleUserInputField = (event) => {
      event.preventDefault();
      const typedOnlineUser = event.target.value;
      if (typedOnlineUser) {
         setValidateMinLength(false);
         setOnlineUser(typedOnlineUser);
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
      if (onlineUser) {
         addUser(onlineUser.trim());
         closeModal();
      }
   };

   return (
      <ContainerModal>
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body p-4">
               <form>
                  <div className="input-group">
                     <div className="form-floating is-invalid">
                        <input
                           type="text"
                           className="form-control"
                           id="chatUser"
                           placeholder="Username"
                           required
                           value={onlineUser}
                           onChange={handleUserInputField}
                        />
                        <label htmlFor="chatUser">{label}</label>
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
               </form>
            </div>
            <div className="modal-footer">
               <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={closeModal}>
                  Close
               </button>
               <button
                  type="button"
                  className="btn btn-primary"
                  disabled={validateMinLength || validateMaxLength}
                  onClick={submitNewUser}>
                  {cta}
               </button>
            </div>
         </div>
      </ContainerModal>
   );
}
