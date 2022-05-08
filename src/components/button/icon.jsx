import {createUseStyles} from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({colors}) => ({
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    opacity: 0.5,
    transition: ['opacity', '.3s', 'ease-in-out'],
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    },
  },
  iconWrapper: {
    background: colors.basic200,
    borderRadius: 8,
    padding: 8,
    display: 'inline-flex',
  },
  text: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '20px',
    textAlign: 'center',
    color: colors.basic900,
    marginTop: 4,
  },
}));

const IconButton = ({className, icon, text, onClick}) => {
  const classes = useStyles();

  return (
    <a className={classNames(classes.iconButton, className)} onClick={onClick}>
      <span className={classes.iconWrapper}>{icon}</span>
      {text && <span className={classes.text}>{text}</span>}
    </a>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconButton;
