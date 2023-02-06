import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Google() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'undefined';

  return (
    <div style={{ display: 'flex', marginTop: '40%' }}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            fetch(
              `/api/auth/sign-up?credential=${credentialResponse.credential}`
            )
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
