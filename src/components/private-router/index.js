import {
  Navigate,
} from 'react-router-dom';
import {useAuthentication} from 'hooks/useAuthentication';

const PrivateRouter = ({children}) => {
  const {walletInfo} = useAuthentication();
  const hasAuth = walletInfo && walletInfo.id;
  if (!hasAuth) {
    return <Navigate to="/unlock" replace />;
  }

  return children;
};

export default PrivateRouter;
