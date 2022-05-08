import {createUseStyles} from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useMemo} from 'react';

const useStyles = createUseStyles({
  star: {
    width: 12,
    height: 12,
    display: 'inline-block',
    position: 'absolute',
    animation: '$glitter 5s linear 0s infinite normal',
  },
  starLocation: ({x, y, color, delay}) => ({
    top: y,
    left: x,
    backgroundColor: color,
    animationDelay: `${delay}s`,
    transform: 'rotate(45deg) scale(0)',
  }),
  '@keyframes glitter': {
    '0%': {
      transform: 'rotate(45deg) scale(1.0)',
      opacity: 1,
    },
    '25%': {
      transform: 'rotate(0deg) scale(0.5)',
      opacity: 0,
    },
    '50%': {
      transform: 'rotate(45deg) scale(1.0)',
      opacity: 1,
    },
    '75%': {
      transform: 'rotate(90deg) scale(0.5)',
      opacity: 0,
    },
    '100%': {
      transform: 'rotate(45deg) scale(1.0)',
      opacity: 1,
    },
  },
});

const Star = ({x, y, color}) => {
  const delay = useMemo(() => Math.floor(Math.random() * 10), []);
  const classes = useStyles({x, y, color, delay});
  return (
    <span className={classNames(classes.star, classes.starLocation)}></span>
  );
};

Star.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Star;
