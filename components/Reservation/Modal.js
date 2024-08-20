import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function Modal({ showModal, setShowModal, formData }) {
  // Έλεγχος για την ορθή απόδοση μόνο στον client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !showModal) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000, // Χρησιμοποιούμε μόνο το 1000
    },
    modal: {
      backgroundColor: "var(--colour-sage)",
      color: "white",
      padding: "35px",
      borderRadius: "8px",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "relative", // Για να τοποθετηθεί σωστά το closeButton
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      color: " var(--colour-grey-dark)",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "17px",
      cursor: "pointer",
    },
  };

  return createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Reservation Confirmation</h3>
        <p>
          Your reservation is on {formData.date} at {formData.time} o&#39;clock.
        </p>
        <Link href="/">
          <button
            style={styles.closeButton}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </button>
        </Link>
      </div>
    </div>,
    document.body
  );
}
