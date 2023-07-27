import { CircularProgress } from '@mui/material';
import { Planet } from '../../data-models';
import { PlanetForm } from '..';
import { useGetPlanetQuery } from '../../store/swAPI/swAPI';
import './PlanetCard.css';

interface PlanetCardProps {
  url: string;
}

export const PlanetCard = ({ url }: PlanetCardProps) => {
  const planetNum = +url.split('/').reverse()[1];
  const { data: planet, isLoading } = useGetPlanetQuery(planetNum);

  const planetSaveHandle = (planet: Planet) => {
    console.log('SAVE PLANET', planet);
  }

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && planet && <PlanetForm planet={planet} onSubmit={planetSaveHandle}></PlanetForm>}
    </>
  )
}
