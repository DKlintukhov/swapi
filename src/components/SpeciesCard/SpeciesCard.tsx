import { CircularProgress } from '@mui/material';
import { CardProps, Species } from '../../data-models';
import { useGetSpeciesQuery } from '../../store/swAPI/swAPI';
import { SpeciesForm } from '../SpeciesForm/SpeciesForm';
import './SpeciesCard.css';

export function SpeciesCard({ id, onSave }: CardProps<Species>) {
  const { data: species, isLoading } = useGetSpeciesQuery(id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && species && <SpeciesForm species={species} onSubmit={onSave}></SpeciesForm>}
    </>
  )
}
