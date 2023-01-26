import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Google() {
  return (
    <div style={{ display: 'flex' }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}
