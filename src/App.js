import {Fragment, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRouter from 'components/private-router';
import {HEADER_TYPE} from 'components/header';

import UnLockWallet from 'views/unlock-wallet';
import Main from 'views/main-view';
import Assets from 'views/assets';
import Dashboard from 'views/assets/dashboard';
import SendAssets from 'views/assets/send';
import PageNotFound from 'views/404';

import {AuthContext} from 'hooks/useAuthentication';

import useStyles from './reset';

function App() {
  useStyles();

  const [walletInfo, setWalletInfo] = useState();
  const [headerOptions, setHeaderOptions] = useState({
    type: HEADER_TYPE.DEFAULT,
  });

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          walletInfo,
          setWalletInfo,
          headerOptions,
          setHeaderOptions,
        }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<UnLockWallet />} />
            <Route path='unlock' element={<UnLockWallet />} />
            <Route
              path='/'
              element={
                <PrivateRouter>
                  <Main />
                </PrivateRouter>
              }>
              <Route path='assets' element={<Assets />}>
                <Route index element={<Dashboard />} />
                <Route path='send' element={<SendAssets />} />
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
