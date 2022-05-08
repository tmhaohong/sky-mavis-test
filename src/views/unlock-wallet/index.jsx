import {useTranslation} from 'react-i18next';
import {Fragment, useMemo, useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {Navigate, useNavigate} from 'react-router-dom';

import GlitterStar from 'components/glitter-star';
import TextInput, {INPUT_TYPE} from 'components/input';
import Button, {BUTTON_TYPE} from 'components/button';
import WalletName from './wallet-name';

import useRequest from 'hooks/useRequest';
import {useAuthentication} from 'hooks/useAuthentication';
import URLS from 'helper/urls';

import useStyles from './styles';

const MIN_PASSWORD_LENGTH = 3;

const UnLockWallet = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {walletInfo, setWalletInfo} = useAuthentication();

  const hasAuth = walletInfo && walletInfo.id;
  if (hasAuth) {
    return <Navigate to={'/assets'} replace />;
  }

  const [password, setPassword] = useState('123456');
  const isUnlockButtonDisabled = useMemo(
    () => !password || password.length <= MIN_PASSWORD_LENGTH,
    [password],
  );

  const [{status, response}, makeRequest, {ERROR, SUCCESS}] = useRequest(
    URLS.UNLOCK,
    {
      verb: 'post',
      params: {
        password,
      },
    },
  );

  useEffect(() => {
    if (status === SUCCESS) {
      setWalletInfo({...response.walletInfo});
      navigate('/assets');
    } else if (status === ERROR) {
      toast.error(t(`unLockWallet.${response.error}`));
    }
  }, [status, response]);

  const onChangePassword = (value) => setPassword(value);
  const onUnlockHanlde = (e) => {
    e.preventDefault();
    if (!isUnlockButtonDisabled) {
      makeRequest();
    }
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <GlitterStar />
        <WalletName />
        <p className={classes.subTitle}>{t('unLockWallet.subTitle')}</p>
        <form className={classes.unlockForm} onSubmit={onUnlockHanlde}>
          <TextInput
            type={INPUT_TYPE.PASSWORD}
            defaultValue={password}
            label={t('common.labels.password')}
            onChange={onChangePassword}
          />
          <Button
            className={classes.unlockButton}
            text={t('common.buttons.unlock')}
            disabled={isUnlockButtonDisabled}
            type={BUTTON_TYPE.SUBMIT}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default UnLockWallet;
