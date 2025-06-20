import { Box, styled } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

const drawerWidth = 240

type AppBarProps = MuiAppBarProps & {
  open?: boolean
}

// Styled drawer header component
export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

// Styled main container of the paige
export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}))

// Styled App Bar Header
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
      {
          props: ({ open }) => open,
          style: {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: `${drawerWidth}px`,
              transition: theme.transitions.create(['margin', 'width'], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
              }),
          },
      },
  ],
}))