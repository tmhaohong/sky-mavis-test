import {createUseStyles} from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({colors})=>({
  button: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 20px',
    borderRadius: 8,
    border: 'none',
    lineHeight: '20px',
    fontWeight: 600,
    backgroundImage: `linear-gradient(256.28deg, ${colors.blue700} 0%, ${colors.blue800} 100%)`,
    color: colors.basicWhite,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    '&:before': {
      position: 'absolute',
      content: '""',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage: `linear-gradient(0deg, ${colors.blue800} 0%, ${colors.blue700} 100%)`,
      zIndex: -1,
      transition: ['opacity', '.3s', 'ease-in-out'],
      opacity: 0,
    },
    '&:hover:before': {
      opacity: 1,
    },
  },
  secondary: {
    background: colors.basic200,
    color: colors.blue700,
    '&:before': {
      background: colors.blue300,
    },
  },
  disabled: {
    background: colors.gray300,
    color: colors.basicWhite,
    cursor: 'inherit',
    '&:before': {
      background: colors.gray300,
    },
  },
}));

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
};

const Button = ({className, type, text, isSecondary, disabled, onClick}) => {
  const classes = useStyles();
  return (
    <button className={classNames(classes.button, className, {
      [classes.secondary]: isSecondary,
      [classes.disabled]: disabled,
    })} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  isSecondary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: BUTTON_TYPE.BUTTON,
  isSecondary: false,
  disabled: false,
};

export default Button;
