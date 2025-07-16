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
  height?: string
  weight?: string
}

const ModalCustome: React.FC<CustomModalProps> = ({
  show,
  title,
  children,
  onClose,
  onSave,
  closable = true,
  height= "auto",
  weight="1500px"
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
      <div className="custom-modal" style={{width: weight}}>
        <div className="custom-modal-header">
          <h2>{title}</h2>
          
          <button className="custom-modal-close" onClick={onClose}>
            &times;
          </button>
          
        </div>
        <div className="custom-modal-body" style={{height: height}}>{children}</div>
        <div className="custom-modal-footer">
          {closable && (<button onClick={onClose} className="custom-button secondary">
            Close
          </button>)
          }
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
