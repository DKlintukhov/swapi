import { CircularProgress } from '@mui/material';
import { Starship } from '../../data-models';
import { StarshipForm } from '..';
import { useGetStarshipQuery } from '../../store/swAPI/swAPI';
import './StarshipCard.css';

interface StarshipCardProps {
  url: string;
}

export function StarshipCard({ url }: StarshipCardProps) {
  const starshipNum = +url.split('/').reverse()[1];
  const { data: starship, isLoading } = useGetStarshipQuery(starshipNum);

  const starshipSaveHandle = (starship: Starship) => {
    console.log('SAVE STARSHIP', starship);
  }

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && starship && <StarshipForm starship={starship} onSubmit={starshipSaveHandle}></StarshipForm>}
    </>
  )
}
