import { CircularProgress } from '@mui/material';
import { CardProps, Starship } from '../../data-models';
import { StarshipForm } from '..';
import { useGetStarshipQuery } from '../../store/swAPI/swAPI';
import './StarshipCard.css';

export function StarshipCard({ id, onSave }: CardProps<Starship>) {
  const { data: starship, isLoading } = useGetStarshipQuery(id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && starship && <StarshipForm starship={starship} onSubmit={onSave}></StarshipForm>}
    </>
  )
}
