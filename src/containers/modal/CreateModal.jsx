import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import UserModal from 'src/components/modal/UserModal';

export default function CreateModal() {
   const [renderModal, setRenderModal] = useState(false);

   useEffect(() => {
      setRenderModal(true);
   }, []);

   let displayModal = renderModal
      ? ReactDOM.createPortal(
           <UserModal />,
           document.getElementById('_user-modal')
        )
      : null;

   return displayModal;
}
