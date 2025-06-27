import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutDrawer = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 bg-black"
            style={{ zIndex: 1040 }}
            onClick={onClose}
          />

          {/* Slide-in centered container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="position-fixed top-0 end-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#2c2f33",
              zIndex: 1050,
              overflowY: "auto",
            }}
          >
            <div
              className="position-relative bg-dark text-white rounded p-4 w-100"
              style={{ maxWidth: "500px" }}
            >
              <button
                onClick={onClose}
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              ></button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutDrawer;
