import { CircularProgress } from '@mui/material';
import { CardProps, Planet } from '../../data-models';
import { PlanetForm } from '..';
import { useGetPlanetQuery } from '../../store/swAPI/swAPI';
import './PlanetCard.css';

export function PlanetCard({ proxy, onSave }: CardProps<Planet>) {
  const { data: planet, isLoading } = useGetPlanetQuery(proxy.id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && !proxy.child && planet && <PlanetForm planet={planet} onSubmit={onSave}></PlanetForm>}
      {proxy.child && <PlanetForm planet={proxy.child} onSubmit={onSave}></PlanetForm>}
    </>
  )
}
