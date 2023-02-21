import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPanel from '../components/UI/LoadingPanel';
import { useAuth } from '../contexts/auth';

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    signOut().then(() => {
      navigate("/login", { replace: true });
    })
  }, [signOut, navigate]);

  return <LoadingPanel visible={true} />;
};

export default Logout;
