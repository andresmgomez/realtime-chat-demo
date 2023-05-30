import React from 'react';

export default function UserModal() {
   return (
      <div className="modal d-block">
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
               </div>
               <div className="modal-body">
                  <p>Input field with name of User adder to chat</p>
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
