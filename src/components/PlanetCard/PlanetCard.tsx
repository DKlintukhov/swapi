import { CircularProgress } from '@mui/material';
import { CardProps, Planet } from '../../data-models';
import { PlanetForm } from '..';
import { useGetPlanetQuery } from '../../store/swAPI/swAPI';
import './PlanetCard.css';

export function PlanetCard({ id, onSave }: CardProps<Planet>) {
  const { data: planet, isLoading } = useGetPlanetQuery(id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && planet && <PlanetForm planet={planet} onSubmit={onSave}></PlanetForm>}
    </>
  )
}
