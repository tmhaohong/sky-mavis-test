import {useEffect, useState, useMemo, Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {createUseStyles} from 'react-jss';

import {HEADER_TYPE} from 'components/header';
import FakeInput from 'components/input/fake';
import AutocompleteInput from 'components/input/autocomplete';
import SelectInput from 'components/input/select';
import AmountInput from 'components/input/amount';
import Button, {BUTTON_TYPE} from 'components/button';
import Modal from 'components/modal';

import {useAuthentication} from 'hooks/useAuthentication';
import useRequest from 'hooks/useRequest';
import URLS from 'helper/urls';

const useStyles = createUseStyles(({colors}) => ({
  sendForm: {
    position: 'relative',
    height: 'calc(100vh - 76px)',
  },
  input: {
    marginTop: 16,
    '&:first-child': {
      marginTop: 0,
    },
  },
  walletId: {
    fontWeight: 400,
    marginLeft: 8,
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    '& > button': {
      width: 'calc(50% - 10px)',
    },
  },
  thanksWrapper: {
    padding: [24, 20],
    '& > h4': {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '28px',
      textAlign: 'center',
      color: colors.basic900,
      marginBottom: 24,
    },
    '& > p': {
      lineHeight: '20px',
      color: colors.basic900,
    },
    '& > button': {
      marginTop: 24,
    },
  },
}));

const SendAssets = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {walletInfo, setWalletInfo, setHeaderOptions} = useAuthentication();
  const {id, currencies, mainCurrency} = walletInfo;

  const [isShowThanksPopup, setIsShowThanksPopup] = useState(false);

  const [to, setTo] = useState();
  const [asset, setAsset] = useState(mainCurrency);
  const [amount, setAmount] = useState(0);

  const onToAddressChange = (id) => setTo(id);
  const onAssetChange = (asset) => setAsset(asset);
  const onAmountChange = (amount) => setAmount(amount);

  const isSendButtonDisabled = useMemo(
    () => !to || !asset || amount === 0,
    [to, asset, amount],
  );

  const [{status, response}, makeRequest, {SUCCESS}] = useRequest(
    URLS.SEND_ASSET,
    {
      verb: 'post',
      params: {
        to,
        asset,
        amount,
      },
    },
  );

  useEffect(() => {
    setHeaderOptions({
      type: HEADER_TYPE.BACK,
      title: t('sendAssets.title'),
    });
  }, []);

  useEffect(() => {
    if (status === SUCCESS) {
      setIsShowThanksPopup(true);
      setWalletInfo({...response.walletInfo});
    }
  }, [status, response]);

  const onSendAsset = (e) => {
    e.preventDefault();
    !isSendButtonDisabled && makeRequest();
  };

  const onBackToAsset = () => {
    setIsShowThanksPopup(false);
    navigate('/assets');
  };
  const onClosePopup = () => setIsShowThanksPopup(false);

  return (
    <Fragment>
      <form className={classes.sendForm} onSubmit={onSendAsset}>
        <FakeInput label={t('common.labels.from')} className={classes.input}>
          {t('assets.myWallet')}{' '}
          <span className={classes.walletId}>
            (
            {`${id.substring(0, 4)}...${id.substring(
              id.length - 4,
              id.length,
            )}`}
            )
          </span>
        </FakeInput>

        <AutocompleteInput
          defaultValue={to}
          label={t('common.labels.to')}
          className={classes.input}
          onChange={onToAddressChange}
        />

        <SelectInput
          label={t('common.labels.asset')}
          className={classes.input}
          dataSource={currencies}
          value={asset}
          onChange={onAssetChange}
        />

        <AmountInput
          label={t('common.labels.asset')}
          className={classes.input}
          asset={asset}
          value={amount}
          onChange={onAmountChange}
        />

        <div className={classes.buttonWrapper}>
          <Button
            text={t('common.buttons.cancel')}
            isSecondary
            onClick={onBackToAsset}
          />
          <Button
            text={t('common.buttons.send')}
            type={BUTTON_TYPE.SUBMIT}
            disabled={isSendButtonDisabled}
          />
        </div>
      </form>
      {isShowThanksPopup && (
        <Modal onClose={onClosePopup} isCloseDisabled>
          <div className={classes.thanksWrapper}>
            <h4>{t('sendAssets.popupTitle')}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: t('sendAssets.popupMessage', {asset}),
              }}
            />
            <p>{t('sendAssets.popupThanks')}</p>
            <Button text={t('common.buttons.ok')} onClick={onBackToAsset} />
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default SendAssets;
