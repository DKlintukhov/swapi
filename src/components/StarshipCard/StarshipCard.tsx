import { CircularProgress } from '@mui/material';
import { CardProps, Starship } from '../../data-models';
import { StarshipForm } from '..';
import { useGetStarshipQuery } from '../../store/swAPI/swAPI';
import './StarshipCard.css';

export function StarshipCard({ proxy, onSave }: CardProps<Starship>) {
  const { data: starship, isLoading } = useGetStarshipQuery(proxy.id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && !proxy.child && starship && <StarshipForm starship={starship} onSubmit={onSave}></StarshipForm>}
      {proxy.child && <StarshipForm starship={proxy.child} onSubmit={onSave}></StarshipForm>}
    </>
  )
}
