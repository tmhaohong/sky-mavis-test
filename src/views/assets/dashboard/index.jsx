import {Fragment, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import ShareIcon from 'images/share.svg';
import RoninWhite from 'images/ronin-white.png';
import CreditCardIcon from 'images/credit-card-fill.svg';
import SendIcon from 'images/plane-fill.svg';
import SwapIcon from 'images/repeat.svg';

import {HEADER_TYPE} from 'components/header';
import IconButton from 'components/button/icon';

import {useAuthentication} from 'hooks/useAuthentication';
import {currencyIcons, formatNumber, formatCardNumber} from 'helper';

import useStyles from './styles';

const Assets = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {walletInfo, setHeaderOptions} = useAuthentication();
  const {id, mainCurrency, currencies} = walletInfo;

  const onSendHandle = () => navigate('send');

  useEffect(() => {
    setHeaderOptions({
      type: HEADER_TYPE.DEFAULT,
    });
  }, []);

  return (
    <Fragment>
      <div className={classes.mainAsset}>
        <h5 className={classes.walletTitle}>
          {t('assets.myWallet')}
          <span className={classes.walletId}>({formatCardNumber(id)})</span>
          <img src={ShareIcon} alt='share_icon' />
        </h5>
        <span className={classes.mainCurrency}>
          {formatNumber(currencies[mainCurrency].amount)} {mainCurrency}
        </span>
        <span className={classes.mainVND}>
          {formatNumber(
            currencies[mainCurrency].amount * currencies[mainCurrency].rate,
          )} VND
        </span>
        <img
          className={classes.roninWhite}
          src={RoninWhite}
          alt='ronin-white'
        />
      </div>

      <ul className={classes.buttonWrapper}>
        <li>
          <IconButton
            icon={<img src={CreditCardIcon} alt='card' />}
            text={t('common.buttons.deposit')}
          />
        </li>
        <li>
          <IconButton
            icon={<img src={SendIcon} alt='send' />}
            text={t('common.buttons.send')}
            onClick={onSendHandle}
          />
        </li>
        <li>
          <IconButton
            icon={<img src={SwapIcon} alt='card' />}
            text={t('common.buttons.swap')}
          />
        </li>
      </ul>

      <h4 className={classes.assetTitle}>{t('assets.assets')}</h4>

      <ul>
        {Object.keys(currencies)
          .filter((key) => key != mainCurrency)
          .map((key) => (
            <li key={key} className={classes.assetItem}>
              <img src={currencyIcons[key]} alt='currency_icon' />
              <div>
                <span className={classes.assetCurrency}>
                  {formatNumber(currencies[key].amount)} {key}
                </span>
                <span className={classes.assetVND}>
                  {formatNumber(currencies[key].amount * currencies[key].rate)}{' '}
                  VND
                </span>
              </div>
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default Assets;
