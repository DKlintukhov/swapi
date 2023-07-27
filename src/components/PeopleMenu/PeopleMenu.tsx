import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Person } from '../../data-models';
import PersonIcon from '@mui/icons-material/Person';
import { Fragment } from 'react';
import './PeopleMenu.css';

interface PeopleMenuProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export const PeopleMenu = ({ people, onPersonSelect }: PeopleMenuProps) => {
  return (
    <List component="nav">
      {people.map((person, idx) => (
        <Fragment key={idx}>
          <ListItem disablePadding >
            <ListItemButton onClick={() => onPersonSelect(person)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={person.name} secondary={`Birth Year: ${person.birthYear}`} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Fragment>))}
    </List>
  )
}
