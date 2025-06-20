"use client"
import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppDispatch } from "@/common/lib/redux/hooks";
import { logout } from "@/common/lib/redux/reducers/auth-slice";
import Button from "@/common/theme/button";
import { ROUTES } from "@/common/utils/constants/routes";
import { AppBar, DrawerHeader, Main } from "./dashboard/components/styled-components";

const drawerWidth = 240

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {

  const theme = useTheme()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  // Handles opening of the side drawer
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  // Handles closing of the side drawer
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // Handles logout and redirects to login page after successful logout
  const handleLogout = () => {
    dispatch(logout())
    router.push(ROUTES.AUTH_LOGIN)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="primary.main">
            Ecommerce
          </Typography>
          <Button variant="contained" sx={{ ml: 'auto', py: 2 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href={ROUTES.DASHBOARD}>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  )
};

export default ProtectedLayout