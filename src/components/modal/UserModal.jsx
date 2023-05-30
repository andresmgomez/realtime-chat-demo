import styles from './UserModal.module.css';

export default function UserModal() {
   return (
      <div className="modal d-block">
         <div className={`${styles.backdrop}`}></div>
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
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
                        />
                        <label htmlFor="floatingInputGroup2">Username</label>
                     </div>
                     <div className="invalid-feedback">
                        Please choose a username
                     </div>
                  </div>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                     Save
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
