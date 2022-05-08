import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const useStyles = createUseStyles(({colors})=>( {
  wrapper: {
    position: 'relative',
    textAlign: 'left',
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
}), {name: 'TextInput'});

export const INPUT_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
};

const TextInput = ({className, label, placeholder, type, value, defaultValue, tabIndex, onChange}) => {
  const classes = useStyles();
  const onInputChange = (e) => onChange && onChange(e.target.value);
  return (
    <div className={classNames(classes.wrapper, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        className={classes.input}
        type={type}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        tabIndex={tabIndex}
        autoComplete='off'
        defaultValue={defaultValue}
      />
    </div>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  type: INPUT_TYPE.TEXT,
  tabIndex: 0,
};

export default TextInput;
