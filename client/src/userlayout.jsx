import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = localStorage.getItem('login');

  useEffect(() => {
    if (authStatus === null || (authStatus === authentication)) {
      navigate('/user/login');
    } else if ( (authStatus !== authentication) || (authStatus === null) ) {
      navigate('/client/dashboard');
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h2>Loading</h2> : <>{children}</>;
}
