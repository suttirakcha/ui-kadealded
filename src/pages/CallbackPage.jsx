import useAuthStore from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function CallbackPage(){
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  useEffect(() => {
    const run = async () => {
      if (code) {
        await loginWithGoogle(code);
        navigate('/');
      }
    }

    run();
  }, [code]);

  return <p>Logging in...</p>;
};

export default CallbackPage;