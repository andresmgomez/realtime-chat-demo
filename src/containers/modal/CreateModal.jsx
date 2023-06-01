import { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import ContainerModal from 'src/components/modal/ContainerModal/ContainerModal';

export default function CreateModal() {
   const [renderModal, setRenderModal] = useState(false);

   useEffect(() => {
      setRenderModal(true);
   }, []);

   let displayModal = renderModal
      ? ReactDOM.createPortal(
           <ContainerModal />,
           document.getElementById('_user-modal')
        )
      : null;

   return displayModal;
}
