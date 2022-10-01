
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';

function LoginFunction() {
    const navigate = useNavigate();

    useEffect(() => {
      const clean = () =>{ onAuthStateChanged(auth, (user) => {
          if (user) {
              navigate('/');
          } else {
              navigate('/login');
          }
      })}
      return() => {
        clean()
      }
    }, [navigate]);

  return (
    <div></div>
  )
}

export default LoginFunction