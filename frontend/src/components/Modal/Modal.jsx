import ReactDom from 'react-dom';
import styles from './Modal.module.scss';

export default function Modal({ children }) {
    return ReactDom.createPortal (
        <div className={styles.modal}>
            {children}  
        </div>,
        document.body
    )
}