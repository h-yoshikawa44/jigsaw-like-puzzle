import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Policy from 'components/pages/Policy';

const EnhancedPolicy: FC = () => {
  const navigate = useNavigate();

  const handleBackTop = useCallback(() => {
    navigate('/');
  }, [history]);

  return <Policy handleBackTop={handleBackTop} />;
};

export default EnhancedPolicy;
