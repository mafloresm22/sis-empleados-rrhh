import React from 'react';
import LoginLeftSide from '../../components/LoginLeftSide';
import LoginForm from '../../components/LoginForm';

const LoginLanding = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-900 overflow-hidden font-sans">
      {/* Left Side: Dynamic Branding & Features */}
      <LoginLeftSide />

      {/* Right Side: Unified Login Form */}
      <LoginForm />
    </div>
  );
};

export default LoginLanding;