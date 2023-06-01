import styles from './ContainerModal.module.css';

export default function ContainerModal({ children }) {
   return (
      <div className="modal d-block">
         <div className={`${styles.backdrop} position-fixed h-100 w-100`}></div>
         <div className="modal-dialog modal-dialog-centered">{children}</div>
      </div>
   );
}
