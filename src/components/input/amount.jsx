import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';

import {useAuthentication} from 'hooks/useAuthentication';
import {formatNumber} from 'helper';

const useStyles = createUseStyles(
  ({colors}) => ({
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
      transition: ['border', '.3s', 'ease-in-out'],
      '&:hover,&:focus': {
        border: [1, 'solid', colors.blue800],
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
    available: {
      fontWeight: 700,
      fontSize: 10,
      lineHeight: '16px',
      textAlign: 'right',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: colors.basic900,
      float: 'right',
      marginRight: 10,
    },
    max: {
      fontWeight: 700,
      fontSize: 10,
      lineHeight: '16px',
      textAlign: 'right',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: colors.basic700,
      background: colors.neutral200,
      borderRadius: 8,
      padding: [5, 8],
      cursor: 'pointer',
      position: 'absolute',
      bottom: 8,
      right: 16,
    },
  }),
  {name: 'AmountInput'},
);

const AmountInput = ({
  className,
  placeholder,
  label,
  asset,
  value,
  tabIndex,
  onChange,
}) => {
  const classes = useStyles();
  const {walletInfo} = useAuthentication();
  const {t} = useTranslation();
  const onInputChange = (e) => onChange && onChange(e.target.value);
  const onFillMaxAmount = () =>
    onChange && onChange(walletInfo.currencies[asset].amount);

  return (
    <div className={classNames(classes.wrapper, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <span className={classes.available}>
        {t('common.available', {
          amount: formatNumber(walletInfo.currencies[asset].amount),
          asset,
        })}
      </span>
      <input
        className={classes.input}
        type='number'
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        tabIndex={tabIndex}
        autoComplete='off'
      />
      <a className={classes.max} onClick={onFillMaxAmount}>
        {t('common.max')}
      </a>
    </div>
  );
};

AmountInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  asset: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
};

AmountInput.defaultProps = {
  tabIndex: 0,
};

export default AmountInput;
