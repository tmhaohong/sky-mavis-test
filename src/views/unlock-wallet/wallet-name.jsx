import {Fragment, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import badgeImage from 'images/badge.svg';

import useRequest from 'hooks/useRequest';
import URLS from 'helper/urls';

import useStyles from './styles';

const WalletName = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  const [{status, response}, makeRequest, {SUCCESS}] = useRequest(
    URLS.WALLET_NAME,
  );

  useEffect(()=>{
    makeRequest();
  }, []);

  return <Fragment>
    <div className={classes.walletNameWrapper}>
      <img src={badgeImage} alt='badge' />
      {
        status === SUCCESS && <h2 className={classes.firstCharOfName}>{response.name.charAt(0)}</h2>
      }
    </div>
    {
      status === SUCCESS && <h3 className={classes.walletName}>
        {t('common.walletName', {name: response.name})}
      </h3>
    }
  </Fragment>;
};

export default WalletName;
