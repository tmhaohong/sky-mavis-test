import {MdPerson, MdChevronLeft} from 'react-icons/md';
import {useTranslation} from 'react-i18next';
import {createUseStyles} from 'react-jss';
import {useNavigate} from 'react-router-dom';

import GlitterStar from 'components/glitter-star';

import {useAuthentication} from 'hooks/useAuthentication';

const useStyles = createUseStyles(({colors})=>({
  defaultHeader: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletStatus: {
    background: colors.basic200,
    borderRadius: 8,
    padding: [6, 18],
  },
  status: {
    width: 8,
    height: 8,
    background: colors.blue800,
    borderRadius: 4,
    display: 'inline-block',
  },
  walletName: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '20px',
    color: colors.basic900,
    marginLeft: 12,
  },
  user: {
    background: colors.basic200,
    borderRadius: 8,
    padding: 4,
    '&>svg': {
      color: colors.blue800,
    },
  },
  glitterStar: {
    top: 0,
    transform: 'translate(-50%, 0px)',
  },
  backHeader: {
    padding: [18, 24],
    textAlign: 'center',
    position: 'relative',
    boxShadow: `0px 4px 12px ${colors.basic200}`,
    '&>h4': {
      fontWeight: 600,
      lineHeight: '20px',
      textAlign: 'center',
      color: colors.basic900,
    },
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 24,
  },
}));

export const HEADER_TYPE = {
  DEFAULT: 'default',
  BACK: 'back',
};

const Header = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {walletInfo, headerOptions} = useAuthentication();
  const navigate = useNavigate();

  const onBackHandle = () => navigate(-1);

  if (headerOptions.type === HEADER_TYPE.BACK) {
    return <header className={classes.backHeader}>
      <MdChevronLeft className={classes.backButton} size={24} onClick={onBackHandle} />
      <h4>{headerOptions.title}</h4>
    </header>;
  }

  return <header className={classes.defaultHeader}>
    <div className={classes.walletStatus}>
      <span className={classes.status}></span>
      <span className={classes.walletName}>{t('common.walletName', {name: walletInfo.name})}</span>
    </div>
    <div className={classes.user}>
      <MdPerson size={24} />
    </div>
    <GlitterStar className={classes.glitterStar}/>
  </header>;
};

export default Header;
