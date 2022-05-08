import classNames from 'classnames';
import {useMemo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {createUseStyles} from 'react-jss';
import {MdClose} from 'react-icons/md';

const useStyles = createUseStyles(({colors}) => ({
  modal: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#151a3080',
    padding: 20,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    background: colors.basicWhite,
    borderRadius: 16,
    position: 'relative',
    width: '100%',
  },
  full: {
    height: '100%',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    cursor: 'pointer',
    color: colors.basic700,
  },
}));

const Modal = ({className, children, isCloseDisabled, isFull, onClose}) => {
  const [modalRoot, setModalRoot] = useState();
  const el = useMemo(() => document.createElement('div'), []);
  const classes = useStyles();

  el.className = classes.modal;

  const onMaskClick = (e) =>
    e.target.className === classes.modal &&
    onClose &&
    !isCloseDisabled &&
    onClose();

  useEffect(() => {
    const elRoot = document.getElementById('modal-root');
    if (elRoot) {
      setModalRoot(elRoot);
    } else {
      const node = document.createElement('div');
      node.id = 'modal-root';
      document.body.appendChild(node);
      setModalRoot(node);
    }
    return () => {
      const elRoot = document.getElementById('modal-root');
      elRoot && document.body.removeChild(elRoot);
    };
  }, []);

  useEffect(() => {
    modalRoot && modalRoot.appendChild(el);
    el.addEventListener('click', onMaskClick);
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(el);
        el.removeEventListener('click', onMaskClick);
      }
    };
  }, [modalRoot]);

  return ReactDOM.createPortal(
    <div
      className={classNames(classes.wrapper, className, {
        [classes.full]: isFull,
      })}>
      {!isCloseDisabled && (
        <MdClose size={24} className={classes.close} onClick={onClose} />
      )}
      {children}
    </div>,
    el,
  );
};

export default Modal;
