import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  vegaContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  '@global': {
    '#vg-tooltip-element.vg-tooltip.custom-theme': {
      backgroundColor: theme.palette.gridLayoutBackground,
      color: theme.palette.secondaryForeground,
      border: 'none',
      opacity: 0.9,
      fontSize: '80%',
      padding: '8px',
    },
  },
}));
