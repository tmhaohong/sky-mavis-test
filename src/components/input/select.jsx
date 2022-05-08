import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {IoLayersOutline} from 'react-icons/io5';
import {useState} from 'react';

import Modal from 'components/modal';

import {currencyIcons, formatNumber} from 'helper';

const useStyles = createUseStyles(({colors})=>
  ({
    wrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      padding: [10, 16],
      borderRadius: 8,
      border: [1, 'solid', colors.basic500],
      fontSize: 14,
      lineHeight: '20px',
      outline: 'none',
      height: 42,
      transition: ['border', '.3s', 'ease-in-out'],
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:hover': {
        border: [1, 'solid', colors.blue800],
      },
    },
    currency: {
      display: 'flex',
      alignItems: 'center',
      '&>img': {
        width: 24,
      },
      '&>span': {
        lineHeight: '20px',
        color: colors.basic900,
        marginLeft: 8,
      },
    },
    label: {
      color: colors.basic700,
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: 10,
      lineHeight: '16px',
      marginBottom: 4,
      marginLeft: 10,
    },
    assetTitle: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '20px',
      color: colors.basic900,
      marginBottom: 12,
      textAlign: 'center',
      padding: [24, 0, 16, 0],
      borderBottom: [1, 'solid', colors.basic500],
    },
    assetItem: {
      padding: [12, 20],
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&>img': {
        marginRight: 16,
      },
      '&:hover': {
        background: colors.basic200,
      },
    },
    isActived: {
      background: colors.neutral600,
    },
    assetCurrency: {
      fontWeight: 600,
      lineHeight: '20px',
      color: colors.basic900,
      display: 'block',
      marginBottom: 4,
    },
    assetVND: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      color: colors.basic600,
      display: 'block',
    },
  }),
{name: 'SelectInput'},
);

const Item = ({asset, isActived, amount, rate, onClick}) => {
  const classes = useStyles();
  const onChooseCurrency = () => onClick && onClick(asset);
  return (
    <li className={classNames(classes.assetItem, {
      [classes.isActived]: isActived,
    })} onClick={onChooseCurrency}>
      <img src={currencyIcons[asset]} alt='currency_icon' />
      <div>
        <span className={classes.assetCurrency}>
          {formatNumber(amount)} {asset}
        </span>
        <span className={classes.assetVND}>
          {formatNumber(amount * rate)} VND
        </span>
      </div>
    </li>
  );
};

const SelectInput = ({
  className,
  value,
  label,
  tabIndex,
  dataSource,
  onChange,
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const onOpenModal = () => setIsOpenDropdown(true);
  const onCloseModal = () => setIsOpenDropdown(false);
  const onChooseCurrency = (asset) => {
    onChange && onChange(asset);
    setIsOpenDropdown(false);
  };
  return (
    <div className={classNames(classes.wrapper, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <div className={classes.input} tabIndex={tabIndex} onClick={onOpenModal}>
        <div className={classes.currency}>
          <img src={currencyIcons[value]} alt='currency_icon' />
          <span>{value}</span>
        </div>
        <IoLayersOutline size={18} />
      </div>

      {isOpenDropdown && (
        <Modal onClose={onCloseModal} isFull>
          <h4 className={classes.assetTitle}>{t('assets.assets')}</h4>
          <ul>
            {Object.keys(dataSource).map((key) => (
              <Item
                key={key}
                isActived={key === value}
                asset={key}
                {...dataSource[key]}
                onClick={onChooseCurrency}
              />
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  tabIndex: 0,
};

export default SelectInput;
