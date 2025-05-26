import { createPortal } from "react-dom";
import styled from "./Modal.module.css";
import type React from "react";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
