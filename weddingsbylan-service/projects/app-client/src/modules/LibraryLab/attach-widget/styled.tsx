import { alpha, Box, styled } from '@mui/material'
import { mapItemConfigs } from './helpers'

//#region Attach Widget
export const attachWidgetClasses = {
  root: 'AttachWidget-root',
  content: 'AttachWidget-content',
  dragging: 'AttachWidget-dragging',
  dragPanel: 'AttachWidget-dragPanel',
  inputButton: 'AttachWidget-inputButton',
  moreButton: 'AttachWidget-moreButton',
  list: 'AttachWidget-list',
  listItem: 'AttachWidget-listItem',
  overlay: 'AttachWidget-overlay',
  loading: 'AttachWidget-loading'
}

const getAttachWidgetClasses = (key: keyof typeof attachWidgetClasses, options?: { prefix?: string; suffix?: string }) => {
  return `${options?.prefix || ''}.${attachWidgetClasses[key]}${options?.suffix || ''}`
}

export const AttachWidgetStyled = styled('div')(({ theme }) => ({
  [getAttachWidgetClasses('root', { prefix: '&' })]: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius
  },
  [getAttachWidgetClasses('content')]: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5, 1)
  },
  [getAttachWidgetClasses('list')]: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    overflow: 'hidden',
    minWidth: 0,
    position: 'relative',

    // Blur right end
    WebkitMaskImage: 'linear-gradient(to left, transparent 0px, black 48px, black calc(100% - 0px), transparent 100%)',
    maskImage: 'linear-gradient(to left, transparent 0px, black 48px, black calc(100% - 0px), transparent 100%)'
  },
  [getAttachWidgetClasses('listItem')]: {
    width: 'var(--attach-widget-list-item-width, 36px)',
    padding: 0,
    aspectRatio: '5 / 7',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid ' + theme.palette.divider,
    boxShadow: 'rgba(99, 99, 99, 0.15) 0px 2px 6px 0px',
    overflow: 'hidden',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  [getAttachWidgetClasses('inputButton')]: {
    width: 'var(--attach-widget-list-item-width, 36px)',
    aspectRatio: '5 / 7',
    padding: 0,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: '1px dashed ' + theme.palette.primary.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  [getAttachWidgetClasses('moreButton')]: {
    opacity: 0.5,
    transition: 'opacity 0.3s ease-in-out'
  },
  [getAttachWidgetClasses('dragPanel')]: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing(0.75),
    backgroundColor: theme.palette.common.white,
    pointerEvents: 'none',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    opacity: 0,
    zIndex: 1,
    transition: 'opacity 0.3s ease-in-out',
    '& > div': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed ' + theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius
    }
  },
  [getAttachWidgetClasses('overlay')]: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    visibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  [getAttachWidgetClasses('loading', { prefix: '&' })]: {
    [getAttachWidgetClasses('overlay')]: {
      opacity: 1,
      visibility: 'visible'
    }
  },
  [getAttachWidgetClasses('dragging', { prefix: '&' })]: {
    [getAttachWidgetClasses('dragPanel')]: {
      opacity: 1
    },
    [getAttachWidgetClasses('content')]: {
      pointerEvents: 'none'
    }
  },
  [getAttachWidgetClasses('root', { prefix: '&', suffix: ':hover' })]: {
    [getAttachWidgetClasses('moreButton')]: {
      opacity: 1
    }
  }
}))
//#endregion

//#region Attach Modal
export const attachModalClasses = {
  root: 'AttachModal-root',
  header: 'AttachModal-header',
  footer: 'AttachModal-footer',
  loading: 'AttachModal-loading',
  overlay: 'AttachModal-overlay',
  dragging: 'AttachModal-dragging',
  dragPanel: 'AttachModal-dragPanel',
  content: 'AttachModal-content',
  emptyState: 'AttachModal-emptyState',
  closeButton: 'AttachModal-closeButton',
  item: 'AttachModal-item',
  itemHeader: 'AttachModal-itemHeader',
  itemContent: 'AttachModal-itemContent',
  itemNew: 'AttachModal-itemNew',
  itemDelete: 'AttachModal-itemDelete'
}

const getAttachModalClasses = (key: keyof typeof attachModalClasses, options?: { prefix?: string; suffix?: string }) => {
  return `${options?.prefix || ''}.${attachModalClasses[key]}${options?.suffix || ''}`
}

export const AttachModalStyled = styled(Box)(({ theme }) => ({
  [getAttachModalClasses('root', { prefix: '&' })]: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    width: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 48px)',
    maxWidth: theme.breakpoints.values.md,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  [getAttachModalClasses('header')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  [getAttachModalClasses('footer')]: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3)
  },
  [getAttachModalClasses('content')]: {
    minHeight: '200px',
    padding: theme.spacing(1),
    overflowY: 'auto',
    height: '100%'
  },
  [getAttachModalClasses('emptyState')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '168px'
  },
  [getAttachModalClasses('itemContent')]: {
    width: '100%',
    height: '100%',
    padding: 0,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  [getAttachModalClasses('itemHeader')]: {
    marginTop: theme.spacing(-0.5),
    padding: theme.spacing(0.5, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '.MuiTypography-root': {
      color: theme.palette.common.white
    },
    '.MuiIconButton-root': {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
      '.MuiSvgIcon-root': {
        fontSize: '1rem'
      },
      '&:hover': {
        backgroundColor: theme.palette.common.white
      }
    }
  },
  [getAttachModalClasses('item')]: {
    width: 'var(--attach-modal-list-item-width, 100%)',
    aspectRatio: '5 / 7',
    display: 'inline-block',
    position: 'relative',
    backgroundColor: mapItemConfigs.old?.color,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5),
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    [getAttachModalClasses('itemNew', { prefix: '&' })]: {
      backgroundColor: mapItemConfigs.new?.color
    },
    [getAttachModalClasses('itemDelete', { prefix: '&' })]: {
      backgroundColor: mapItemConfigs.deleted?.color
    }
  },
  [getAttachModalClasses('dragPanel')]: {
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '& img': {
      width: '100%',
      height: 'auto',
      borderRadius: 4
    }
  },
  [getAttachModalClasses('dragPanel')]: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing(0.75),
    backgroundColor: theme.palette.common.white,
    pointerEvents: 'none',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    opacity: 0,
    zIndex: 1,
    transition: 'opacity 0.3s ease-in-out',
    '& > div': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed ' + theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius
    }
  },
  [getAttachModalClasses('dragging', { prefix: '&' })]: {
    [getAttachModalClasses('dragPanel')]: {
      opacity: 1
    },
    [getAttachModalClasses('content')]: {
      pointerEvents: 'none'
    }
  },
  [getAttachModalClasses('overlay')]: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    visibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  [getAttachModalClasses('loading', { prefix: '&' })]: {
    [getAttachModalClasses('overlay')]: {
      opacity: 1,
      visibility: 'visible'
    }
  }
}))
//#endregion
