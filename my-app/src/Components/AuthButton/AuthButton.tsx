import Google from '../../assets/images/Google.png'
import './AuthButton.css'
const AuthButton = () => (
  <button className="auth-button">
    <img src={Google} className="auth-icon"  alt="Google Logo" />
    Sign in with Google
  </button>
);

export default AuthButton;

