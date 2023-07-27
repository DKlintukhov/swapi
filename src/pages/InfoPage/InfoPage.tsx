import { PersonCard } from '../../components/PersonCard/PersonCard';
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { Person } from '../../data-models';

export const InfoPage = () => {
  const person = useSelector(({ person }: RootState) => person.person);
  const personSavedHandle = (person: Person) => {

  }

  return <> {person && <PersonCard person={person} onSubmit={personSavedHandle}></PersonCard>}</>
}
