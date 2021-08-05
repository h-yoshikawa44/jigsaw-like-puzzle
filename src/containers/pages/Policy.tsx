import { VFC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Policy from 'components/pages/Policy';

const EnhancedPolicy: VFC = () => {
  const history = useHistory();

  const handleBackTop = useCallback(() => {
    history.push('/');
  }, [history]);

  return <Policy handleBackTop={handleBackTop} />;
};

export default EnhancedPolicy;
