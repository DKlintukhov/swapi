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
import { useDebounce } from '../../hooks';
import { PeopleSearchDropdown } from '../PeopleSearchDropdown/PeopleSearchDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './PeopleMenu.css';

const filterSaved = (saved: Person[], search: string): Person[] => {
  return saved.filter((person) => person.name.toLocaleLowerCase().includes(search));
}

const mergeByName = (a: Person[], b: Person[]): Person[] => {
  const cache: Record<string, boolean> = {};
  const all = a.concat(b);
  const filtered = all.filter((person) => {
    if (cache[person.name]) {
      return false;
    } else {
      cache[person.name] = true;
      return true;
    }
  });
  return filtered;
}

interface PeopleMenuProps {
  onPersonSelect: (person: Person) => void;
}

export function PeopleMenu({ onPersonSelect }: PeopleMenuProps) {
  const peopleOnPage = useSelector(({ people }: RootState) => people.currentPage);
  const savedPeople = useSelector(({ people }: RootState) => people.saved);
  const [searchPerson, setSearchPerson] = useState('');
  const debounced = useDebounce(searchPerson);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [fetchPerson, { isFetching, data: page }] = useLazySearchPersonQuery();

  const handleSearchPerson = (search: string) => {
    setSearchPerson(search.toLocaleLowerCase());
  };

  useEffect(() => {
    if (debounced.length > 1) {
      fetchPerson(debounced);
    }
  }, [debounced, fetchPerson]);

  useEffect(() => {
    if (page) {
      setFilteredPeople(mergeByName(filterSaved(Object.values(savedPeople), searchPerson), page.people));
    }
  }, [page, searchPerson, savedPeople]);

  return (
    <div className="people-menu__contaner">
      <PeopleSearchDropdown
        people={filteredPeople}
        isLoading={isFetching}
        onSearch={handleSearchPerson}
        onSelect={onPersonSelect}
      ></PeopleSearchDropdown>
      <List component="nav">
        {peopleOnPage.map((person, idx) => (
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
