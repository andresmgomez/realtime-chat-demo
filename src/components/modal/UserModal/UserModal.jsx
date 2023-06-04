import { useState } from 'react';

import ContainerModal from '../ContainerModal/ContainerModal';

export default function UserModal({ title, cta, addUser, closeModal }) {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [validateMinLength, setValidateMinLength] = useState(false);
   const [validateMaxLength, setValidateMaxLength] = useState(false);

   const handleFirstName = (event) => {
      event.preventDefault();
      const typedFirstName = event.target.value;

      if (typedFirstName) {
         setValidateMinLength(false);
         setFirstName(typedFirstName);
      }

      if (typedFirstName.length < 5) {
         setValidateMinLength(true);
         setValidateMaxLength(false);
      } else if (typedFirstName.length > 12) {
         setValidateMaxLength(true);
         setValidateMinLength(false);
      }
   };

   const handleLastName = (event) => {
      event.preventDefault();
      const typedLastName = event.target.value;

      if (typedLastName) {
         setValidateMinLength(false);
         setLastName(typedLastName);
      }

      if (typedLastName.length < 5) {
         setValidateMinLength(true);
         setValidateMaxLength(false);
      } else if (typedLastName.length > 12) {
         setValidateMaxLength(true);
         setValidateMinLength(false);
      }
   };

   const submitOnlineUser = () => {
      const onlineUser = firstName.concat(' ', lastName);

      if (onlineUser) {
         addUser(firstName.trim());
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
                  <div className="row">
                     <div className="col-6">
                        <div className="input-group">
                           <div className="form-floating is-invalid">
                              <input
                                 type="text"
                                 className="form-control"
                                 id="chatUser"
                                 required
                                 value={firstName}
                                 onChange={handleFirstName}
                              />
                              <label htmlFor="chatUser">First Name</label>
                           </div>
                           {validateMinLength ? (
                              <div className="invalid-feedback">
                                 First Name needs to be at least 5 characters
                              </div>
                           ) : null}
                           {validateMaxLength ? (
                              <div className="invalid-feedback">
                                 First Name cannot be greater than 12 characters
                              </div>
                           ) : null}
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="input-group">
                           <div className="form-floating is-invalid">
                              <input
                                 type="text"
                                 className="form-control"
                                 id="chatUser"
                                 required
                                 value={lastName}
                                 onChange={handleLastName}
                              />
                              <label htmlFor="chatUser">Last Name</label>
                           </div>
                           {validateMinLength ? (
                              <div className="invalid-feedback">
                                 Last Name needs to be at least 5 characters
                              </div>
                           ) : null}
                           {validateMaxLength ? (
                              <div className="invalid-feedback">
                                 Last Name cannot be greater than 12 characters
                              </div>
                           ) : null}
                        </div>
                     </div>
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
                  onClick={submitOnlineUser}>
                  {cta}
               </button>
            </div>
         </div>
      </ContainerModal>
   );
}
