import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface CustomModalProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  closable?: boolean;
}

const ModalCustome: React.FC<CustomModalProps> = ({
  show,
  title,
  children,
  onClose,
  onSave,
  closable = true,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  const modalContent = (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>{title}</h2>
          {closable && (
            <button className="custom-modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="custom-modal-body">{children}</div>
        <div className="custom-modal-footer">
          <button onClick={onClose} className="custom-button secondary">
            Close
          </button>
          {onSave && (
            <button onClick={onSave} className="custom-button primary">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ⬇️ PORTAL FIX HERE
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalCustome;
