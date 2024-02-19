import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { message } from "antd";
export function withAuth(Component) {
  return function AuthenticatedComponent({ ...props }) {
    const router = useRouter();
    const [token, setToken] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('token');
  
        if (!token) {
          router.push('/register');
          //message.error("Please Login First to access that page");
        }
        setToken(token);
      }, [router]);
    return token ? <Component {...props} /> : null;
  };
}