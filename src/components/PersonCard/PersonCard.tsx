import { Person } from '../../data-models';
import { PersonForm } from '../PersonForm/PersonForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePerson, savePerson, setPerson } from '../../store';

export interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveHandle = (person: Person) => {
    dispatch(savePerson(person));
    dispatch(setPerson(person));
  };

  const deleteHandle = () => {
    dispatch(deletePerson(person));
    navigate('/');
  };

  return <PersonForm data={person} onSubmit={saveHandle} onDelete={deleteHandle} />;
}
