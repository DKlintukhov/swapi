import { CircularProgress } from '@mui/material';
import { Starship } from '../../data-models';
import { StarshipForm } from '..';
import { useGetStarshipQuery } from '../../store/swAPI/swAPI';
import './StarshipCard.css';

interface StarshipCardProps {
  url: string;
  onSave: (starship: Starship) => void;
}

export function StarshipCard({ url, onSave }: StarshipCardProps) {
  const starshipNum = +url.split('/').reverse()[1];
  const { data: starship, isLoading } = useGetStarshipQuery(starshipNum);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && starship && <StarshipForm starship={starship} onSubmit={onSave}></StarshipForm>}
    </>
  )
}
