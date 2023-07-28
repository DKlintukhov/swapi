import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Person } from '../../data-models';

interface Option {
  label: string;
  value: Person;
}

interface PeopleSearchDropdownProps {
  people: Person[];
  isLoading: boolean;
  onSearch: (search: string) => void;
  onSelect: (person: Person) => void;
}

export function PeopleSearchDropdown({ people, isLoading, onSearch, onSelect }: PeopleSearchDropdownProps) {
  const options: Option[] = people.map((person) => ({ label: person.name, value: person }));
  return (
    <Autocomplete
      disablePortal
      options={options}
      onChange={(_, option) => onSelect(option!.value)}
      onInputChange={(_, search) => onSearch(search)}
      renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" InputProps={{
        ...params.InputProps,
        endAdornment: (<>{isLoading && <CircularProgress size="1rem" />}</>)
      }}>
        <CircularProgress color="inherit" size="2rem" />
      </TextField>}
    />
  )
}
