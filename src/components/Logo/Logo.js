import React from 'react';
import logoImage from "../../images/logo.svg"

const Logo = () => {
  return (
    <a className='logo' href="/">
      <img src={logoImage} alt="Логотип" />
    </a>
  );
};

export default Logo;
