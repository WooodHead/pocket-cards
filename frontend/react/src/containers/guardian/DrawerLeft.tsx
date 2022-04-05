import React from 'react';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import { GuardianActions } from '@actions';
import { Consts } from '@constants';
import { styles } from './DrawerLeft.style';

export default () => {
  const location = useLocation();
  const actions = bindActionCreators(GuardianActions, useDispatch());

  const handleClick = (subject: string) => {
    actions.selectSubject(subject, location.pathname);
  };

  return (
    <Drawer sx={styles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List sx={styles.list}>
        <ListItem
          button
          key="Japanese"
          onClick={() => {
            handleClick(Consts.SUBJECT.JAPANESE.toString());
          }}>
          <ListItemIcon sx={styles.itemIcon}>
            <BookIcon sx={{ color: '#b71927' }} />
          </ListItemIcon>
          <ListItemText primary="国 語" />
        </ListItem>
        <Divider />
        <ListItem
          button
          key="Science"
          onClick={() => {
            handleClick(Consts.SUBJECT.SCIENCE.toString());
          }}>
          <ListItemIcon sx={styles.itemIcon}>
            <BookIcon sx={{ color: '#f19116' }} />
          </ListItemIcon>
          <ListItemText primary="理 科" />
        </ListItem>
        <Divider />
        <ListItem
          button
          key="Society"
          onClick={() => {
            handleClick(Consts.SUBJECT.SOCIETY.toString());
          }}>
          <ListItemIcon sx={styles.itemIcon}>
            <BookIcon sx={{ color: '#288f46' }} />
          </ListItemIcon>
          <ListItemText primary="社 会" />
        </ListItem>
        <Divider />
        <ListItem
          button
          key="English"
          onClick={() => {
            handleClick(Consts.SUBJECT.ENGLISH.toString());
          }}>
          <ListItemIcon sx={styles.itemIcon}>
            <BookIcon sx={{ color: '#b71927' }} />
          </ListItemIcon>
          <ListItemText primary="英 語" />
        </ListItem>
      </List>
    </Drawer>
  );
};
