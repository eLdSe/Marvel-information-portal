import "./NotFound404.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function NotFound404() {
  return (
    <div className="notfound-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="notfound-card"
      >
        <AlertTriangle className="notfound-icon" />
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oops... This page doesn't exist.</p>
        <Link to="/" className="notfound-btn">Back to main page</Link>
      </motion.div>
    </div>
  );
}
