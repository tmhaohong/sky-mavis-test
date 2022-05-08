import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import {useState} from 'react';

import {formatCardNumber} from 'helper';

const useStyles = createUseStyles(({colors})=>(
  {
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
    walletId: {
      color: colors.primary300,
      fontWeight: 400,
      marginLeft: 8,
    },
    dropdown: {
      position: 'absolute',
      top: 60,
      left: 0,
      background: colors.basicWhite,
      borderRadius: 16,
      boxShadow: `0px 6px 20px -4px ${colors.basic500}`,
      overflow: 'hidden',
      width: '100%',
      zIndex: 1,
      '&>li': {
        padding: [16, 20],
        borderTop: [1, 'solid', colors.basic200],
        cursor: 'pointer',
        '&:hover': {
          background: colors.basic200,
        },
      },
      '& h5': {
        fontWeight: 600,
        lineHeight: '20px',
        color: colors.basic900,
      },
      '& span': {
        fontSize: 10,
        lineHeight: '14px',
        color: colors.basic600,
      },
      '& div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
  }),
{name: 'AutocompleteInput'},
);

const sampleData = [
  {
    id: '7300377738883335',
    name: 'David',
    lastSent: 'April 24th, 2022',
    lastCurrency: 'USD',
  },
  {
    id: '7300377738883336',
    name: 'Herry',
    lastSent: 'April 15th, 2022',
    lastCurrency: 'EUR',
  },
  {
    id: '7300377738883337',
    name: 'Ken',
    lastSent: 'March 6th, 2022',
    lastCurrency: 'YEN',
  },
];

const Item = ({id, name, lastSent, lastCurrency, onClick}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  const onItemChoose = () => onClick && onClick(id);

  return (
    <li onClick={onItemChoose}>
      <h5>
        {formatCardNumber(id)}
        <span className={classes.walletId}>({name})</span>
      </h5>
      <div>
        <span>{t('common.lastSent', {time: lastSent})}</span>
        <span>{t('common.lastCurrency', {time: lastCurrency})}</span>
      </div>
    </li>
  );
};

const AutocompleteInput = ({
  className,
  label,
  placeholder,
  value,
  tabIndex,
  onChange,
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState(value||'');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const onInputChange = (e) => {
    const newValue = e.target.value.replace(/s/g, '');
    onChange && onChange(newValue);
    setQuery(newValue);
  };
  const onInputFocus = () => setIsOpenDropdown(true);
  const onItemChoose = (id) => {
    onChange && onChange(id);
    setQuery(id);
    setIsOpenDropdown(false);
  };

  return (
    <div className={classNames(classes.wrapper, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        className={classes.input}
        type='text'
        placeholder={placeholder}
        onChange={onInputChange}
        value={formatCardNumber(query)}
        tabIndex={tabIndex}
        autoComplete='off'
        onFocus={onInputFocus}
      />
      {isOpenDropdown && (
        <ul className={classes.dropdown}>
          {sampleData.filter((item)=>item.id.includes(query)).map((item) => (
            <Item key={item.id} {...item} onClick={onItemChoose} />
          ))}
        </ul>
      )}
    </div>
  );
};

AutocompleteInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
};

AutocompleteInput.defaultProps = {
  tabIndex: 0,
};

export default AutocompleteInput;
