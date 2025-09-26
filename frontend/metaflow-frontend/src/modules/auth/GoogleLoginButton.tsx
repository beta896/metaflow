import React from 'react';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    const googleAuthURL = \https://accounts.google.com/o/oauth2/v2/auth?client_id=\&redirect_uri=http://localhost:3000/authsuccess&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile\;
    window.location.href = googleAuthURL;
  };

  return (
    <div className=\"GoogleLogin\" style={{ padding: '1rem', background: '#333333', color: '#fff' }}>
      <button onClick={handleLogin}>
        🔐 Login with Google
      </button>
    </div>
  );
}
