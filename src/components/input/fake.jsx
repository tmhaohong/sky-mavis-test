import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const useStyles = createUseStyles(({colors})=> ({
  wrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: [10, 16],
    borderRadius: 8,
    border: [1, 'solid', colors.basic500],
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    background: colors.basic300,
    color: colors.basic600,
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
}), {name: 'FakeInput'});

const FakeInput = ({className, label, children}) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.wrapper, className)}>
      {label && <label className={classes.label}>{label}</label>}
      <div className={classes.input}>
        {children}
      </div>
    </div>
  );
};

FakeInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default FakeInput;
