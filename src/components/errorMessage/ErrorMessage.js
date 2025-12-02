import './errorMessage.scss';
import { AlertTriangle } from 'lucide-react'; 

const ErrorMessage = ({ message = "Something went wrong" }) => {
  return (
    <div className="error-message">
      <div className="error-icon">
        <AlertTriangle size={40} />
      </div>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;
