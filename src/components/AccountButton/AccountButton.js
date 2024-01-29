import React from 'react';
import profileIcon from '../../images/profile-icon.svg'

const AccountButton = () => {
  return (
    <button className="account-button">Аккаунт <img className="account-button-image" src={profileIcon} alt="Иконка профиля" /></button>
  );
};

export default AccountButton;
