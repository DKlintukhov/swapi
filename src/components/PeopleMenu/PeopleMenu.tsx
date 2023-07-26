import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Person } from '../../data-models';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { Fragment } from 'react';
import './PeopleMenu.css';

interface PeopleMenuProps {
  people: Person[];
}

export const PeopleMenu = ({ people }: PeopleMenuProps) => {
  return (
    <List component='nav'>
      {people.map(({ name, birthYear }, idx) => (
        <Fragment key={idx}>
          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Link to={`/info/${name}`} className='link'>
                <ListItemText primary={name} secondary={`Planet: ${birthYear}`} />
              </Link >
            </ListItemButton>
          </ListItem>
          <Divider />
        </Fragment>))}
    </List>
  )
}
