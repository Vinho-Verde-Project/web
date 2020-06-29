import React from "react";
import {
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  fade,
} from "@material-ui/core";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledBar = styled(Bar)`
  display: flex;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.text};
`;

const SearchInput = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => fade(theme.colors.text, 0.1)};
  margin: 0 3rem;
  border-radius: ${({ theme }) => theme.roundness}px;
  align-items: center;
  transition: 300ms ease-in all;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 900px) {
    margin: 0 1rem;
  }
`;

const Logo = styled(Typography)`
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 1rem;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 750px) {
    display: none;
  }
`;

const Icon = styled.div`
  padding: 0 1rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Input = styled(InputBase)`
  font-family: inherit;
  width: 100%;
  color: inherit;
`;

const Container = styled(Toolbar)`
  display: flex;
  align-items: center;
  align-content: center;
`;

export default function AppBar({ toogleDrawer }) {

  const doLogout = () => {
    localStorage.removeItem("WinnerUserID")
    localStorage.removeItem("WinnerUserName")
    localStorage.removeItem("WinnerUserPermissions")
    window.location.reload()
  }

  return (
    <StyledBar position="static" elevation={0}>
      <Container>
        {/* Menu */}
        <IconButton
          onClick={toogleDrawer}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        {/* Title */}
        <Logo variant="h6" noWrap>
          Wineer
        </Logo>
        {/* Serch */}
        <SearchInput>
          <Icon>
            <SearchIcon />
          </Icon>
          <Input
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchInput>
        {/* User */}
        <IconButton aria-label="show more" aria-haspopup="true" color="inherit">
          <SettingsIcon />
        </IconButton>
        <IconButton
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountIcon />
        </IconButton>
        <IconButton
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={() => doLogout()}
        >
          <ExitToAppIcon />
        </IconButton>
        
      </Container>
    </StyledBar>
  );
}
