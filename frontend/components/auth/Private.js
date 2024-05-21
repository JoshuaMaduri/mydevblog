import { useEffect, useState } from "react";
import Router from 'next/router';
import { isAuth } from "../../actions/auth";

const Private = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = isAuth();
    if (!auth) {
      Router.push('/signin');
    } else {
      setIsLoading(false); // Set loading to false if user is authenticated
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state initially
  }

  return <>{children}</>;
};

export default Private;
