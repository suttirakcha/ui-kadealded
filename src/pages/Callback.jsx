import useAuthStore from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const loginWithGoogleCode = useAuthStore((state) => state.loginWithGoogleCode);

  // useEffect(() => {
  //   if (code) {
  //     loginWithGoogleCode(code).then(() => {
  //       navigate('/');
  //     });
  //   }
  // }, [code]);

  return <p>Logging in...</p>;
};

export default Callback;