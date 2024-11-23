// PasswordCriteria.tsx
import React from 'react';

import '../../Login/Style/Login.css'
import '../Style/Signup.css';



const PasswordCriteria: React.FC = () => (
    <div className="password-criteria">
     <div><span className="checkmark"></span> At least 12 characters</div>
      <div><span className="checkmark"></span> At least 1 number</div>
      <div><span className="checkmark"></span> At least 1 letter</div>
    </div>
  );

export default PasswordCriteria;
