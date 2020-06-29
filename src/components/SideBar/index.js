import React, { useMemo } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListSubheader,
} from "@material-ui/core";
import _ from "lodash";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TagIcon from "@material-ui/icons/LocalOffer";
import CategoryIcon from "@material-ui/icons/Label";
import WineIcon from "@material-ui/icons/LocalBar";
import LayersIcon from "@material-ui/icons/Layers";
import DoneIcon from "@material-ui/icons/Done";
import GroupIcon from "@material-ui/icons/Group";
import LockIcon from "@material-ui/icons/Lock";
import StoreIcon from "@material-ui/icons/Storefront";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  },
}));

export default function SideBar({ isOpen }) {
  const classes = useStyles();
  const { location, ...history } = useHistory();
  const routes = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Gerenciamento",
        group: [
          {
            name: "Armazéns",
            path: "/warehouses",
            icon: <StoreIcon />,
          },
          {
            name: "Itens em estoque",
            path: "/stock",
            icon: <InboxIcon />,
          },
          {
            name: "Produtos",
            path: "/products",
            icon: <TagIcon />,
          },
          {
            name: "Categorias",
            path: "/categories",
            icon: <CategoryIcon />,
          },
          {
            name: "Vinhos",
            path: "/wine",
            icon: <WineIcon />,
          },
        ],
      },
      {
        name: "Produção",
        group: [
          {
            name: "Etapas",
            path: "/stages",
            icon: <LayersIcon />,
          },
          {
            name: "Tarefas",
            path: "/tasks",
            icon: <DoneIcon />,
          },
        ],
      },
      {
        name: "Administração",
        group: [
          {
            name: "Usuários",
            path: "/users",
            icon: <GroupIcon />,
          },
          {
            name: "Permissões",
            path: "/permissions",
            icon: <LockIcon />,
          },
        ],
      },
    ],
    []
  );

  const Item = ({ name, path, icon }) => (
    <ListItem
      selected={location.pathname === path}
      button
      onClick={() => history.push(path)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{ paper: classes.drawerPaper }}
      elevation={0}
    >
      <List>
        {routes.map(({ name, path, icon, group }) =>
          _.isEmpty(group) ? (
            <Item key={path} name={name} path={path} icon={icon} />
          ) : (
            <React.Fragment key={name}>
              <ListSubheader component="div">{name}</ListSubheader>
              {group.map((props) => (
                <Item key={props.path} {...props} />
              ))}
            </React.Fragment>
          )
        )}
      </List>
    </Drawer>
  );
}
