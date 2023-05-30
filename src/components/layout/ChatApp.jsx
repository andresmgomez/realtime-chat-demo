import { useState } from 'react';
import dynamic from 'next/dynamic';

const CreateModal = dynamic(() => import('../../containers/modal/CreateModal'));

export default function ChatApp() {
   const [addUserGroup, setAddUserGroup] = useState(true);

   const onCloseCreateModal = () => {
      setAddUserGroup(false);
   };

   let showCreateModal = (
      <CreateModal onCloseCreateModal={onCloseCreateModal} />
   );
   return (
      <>
         {/* <div>Chat Container</div> */}
         {addUserGroup ? showCreateModal : null}
      </>
   );
}
