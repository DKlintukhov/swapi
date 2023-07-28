import { CircularProgress } from '@mui/material';
import { Planet } from '../../data-models';
import { PlanetForm } from '..';
import { useGetPlanetQuery } from '../../store/swAPI/swAPI';
import './PlanetCard.css';

interface PlanetCardProps {
  url: string;
  onSave: (planet: Planet) => void;
}

export function PlanetCard({ url, onSave }: PlanetCardProps) {
  const planetNum = +url.split('/').reverse()[1];
  const { data: planet, isLoading } = useGetPlanetQuery(planetNum);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && planet && <PlanetForm planet={planet} onSubmit={onSave}></PlanetForm>}
    </>
  )
}
