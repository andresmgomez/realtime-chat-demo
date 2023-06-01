import { useState } from 'react';
import ContainerModal from '../ContainerModal/ContainerModal';

export default function RoomModal({ title, label, cta, closeModal }) {
   const [chatRoom, setChatRoom] = useState('');

   const handleRoomField = (event) => setChatRoom(event.target.value);

   return (
      <ContainerModal>
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">{title}</h5>
               <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}></button>
            </div>
            <div className="modal-body p-4">
               <form>
                  <div className="input-group">
                     <div className="form-floating">
                        <input
                           type="text"
                           className="form-control"
                           id="chatRoom"
                           placeholder="#Recent"
                           required
                           value={chatRoom}
                           onChange={handleRoomField}
                        />
                        <label htmlFor="chatRoom">{label}</label>
                     </div>
                  </div>
               </form>
            </div>
            <div className="modal-footer">
               <button type="button" className="btn btn-primary">
                  {cta}
               </button>
            </div>
         </div>
      </ContainerModal>
   );
}
