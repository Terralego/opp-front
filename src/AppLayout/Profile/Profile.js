import React from 'react';
import { Card } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

import PasswordResetForm from './PasswordResetForm';

import './styles.scss';

export const Profile = () => {
  const { id, token } = useParams();
  return (
    <div className="profile">
      <Card className="profile__content">
        <PasswordResetForm id={id} token={token} />
      </Card>
    </div>
  );
};

export default Profile;
