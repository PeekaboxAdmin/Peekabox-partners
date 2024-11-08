
import React from 'react';
import  './FooterLinks.css'



const FooterLinks: React.FC<{ text1: string;and: string;text2: string;text3: string; dawonLink: string; }> = ({ text1,text2,and,text3, dawonLink }) => {
  return (
    <>
 
<div className="bottom-links">
          <p className="TopLink">
            {text1} <a href="/privacy-policy">{text2}</a> {and} <a href="/terms">{text3}</a>
          </p>
          <p className="Dawon-Link">
            <a href="/">{dawonLink}</a>
          </p>
        </div>
        </>
  );
};
export default FooterLinks;
