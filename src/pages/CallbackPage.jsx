import useAuthStore from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function CallbackPage(){
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  useEffect(() => {
    if (code) {
      loginWithGoogle(code).then(() => {
        navigate('/');
      });
    }
  }, [code]);

  return <p>Logging in...</p>;
};

export default CallbackPage;