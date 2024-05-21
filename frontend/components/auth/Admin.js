import { useEffect, useState } from "react";
import Router from 'next/router';
import { isAuth } from "../../actions/auth";

const Admin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = isAuth();
    if (!auth) {
      Router.push('/signin');
    } else if (auth.role !== 1) {
      Router.push('/');
    } else {
      setIsLoading(false); // Set loading to false only if user is authenticated and has the correct role
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state initially
  }

  return <>{children}</>;
};

export default Admin;
