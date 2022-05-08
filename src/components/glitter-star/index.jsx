import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Star from './star';

const useStyles = createUseStyles({
  glitterStar: {
    position: 'absolute',
    width: 375,
    height: 270,
    left: '50%',
    top: '-60%',
    transform: 'translate(-50%, 50%)',
    zIndex: -1,
  },
});

// This can be random : x, y, color and the number of stars
const stars = [
  {
    x: 20,
    y: 100,
    color: '#FBEBFF',
  }, {
    x: 102,
    y: 62,
    color: '#E9F5FE',
  }, {
    x: 258,
    y: 62,
    color: '#FFC729',
  }, {
    x: 302,
    y: 96,
    color: '#EC9FFF',
  }, {
    x: 86,
    y: 176,
    color: '#FFC729',
  }, {
    x: 60,
    y: 223,
    color: '#E9F5FE',
  }, {
    x: 298,
    y: 257,
    color: '#EC9FFF',
  }, {
    x: 344,
    y: 205,
    color: '#E9F5FE',
  },
];

const GlitterStar = ({className}) => {
  const classes = useStyles();
  return <div className={classNames(classes.glitterStar, className)}>
    {
      stars.map((star, index)=><Star key={`${index}-${star.x}`} {...star} />)
    }
  </div>;
};

GlitterStar.propTypes = {
  className: PropTypes.string,
};

export default GlitterStar;
