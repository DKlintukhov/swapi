import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Person } from '../../data-models';
import PersonIcon from '@mui/icons-material/Person';
import { Fragment, useEffect, useState } from 'react';
import { useLazySearchPersonQuery } from '../../store/swAPI/swAPI';
import { useDispatch } from 'react-redux';
import { useDebounce } from '../../hooks';
import { PeopleSearchDropdown } from '../PeopleSearchDropdown/PeopleSearchDropdown';
import './PeopleMenu.css';

interface PeopleMenuProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export function PeopleMenu({ people, onPersonSelect }: PeopleMenuProps) {
  const dispatch = useDispatch();
  const [searchPerson, setSearchPerson] = useState('');
  const debounced = useDebounce(searchPerson);
  const [filteredPeople, setFilteredPeople] = useState(people);
  const [fetchPerson, { isFetching, data: page }] = useLazySearchPersonQuery();

  const searchPersonHandle = (search: string) => {
    setSearchPerson(search);
  }

  useEffect(() => {
    if (debounced.length > 1) {
      fetchPerson(debounced);
    }
  }, [debounced]);

  useEffect(() => {
    if (page) {
      setFilteredPeople(page.people);
    }
  }, [page]);

  return (
    <div className="people-menu__contaner">
      <PeopleSearchDropdown
        people={filteredPeople}
        isLoading={isFetching}
        onSearch={searchPersonHandle}
        onSelect={onPersonSelect}
      ></PeopleSearchDropdown>
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
      </List >
    </div>
  )
}
