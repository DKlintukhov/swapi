import { CircularProgress } from '@mui/material';
import { CardProps, Planet } from '../../data-models';
import { ErrorMessage, PlanetForm } from '..';
import { useLazyGetPlanetQuery } from '../../store/swAPI/swAPI';
import { useEffect, useState } from 'react';
import './PlanetCard.css';

export function PlanetCard({ proxy, onSave }: CardProps<Planet>) {
  const [current, setCurrent] = useState<Planet | null>(null);
  const [fetchPlanet, { data: planet, isFetching, error }] = useLazyGetPlanetQuery();

  useEffect(() => {
    if (proxy.child) {
      setCurrent(proxy.child);
    } else {
      fetchPlanet(proxy.id);
    }
  }, [proxy, fetchPlanet]);

  useEffect(() => {
    if (planet) {
      setCurrent(planet);
    }
  }, [planet]);

  const handleSave = (planet: Planet) => {
    onSave({ ...proxy, child: planet });
  };

  const handleDelete = () => {
    onSave({ ...proxy, child: null });
    fetchPlanet(proxy.id);
  };

  const handleRetry = () => {
    fetchPlanet(proxy.id);
  };

  return (
    <div className="planet-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <PlanetForm data={current} onSubmit={handleSave} onDelete={handleDelete} />}
      {!isFetching && error && <ErrorMessage onRetry={handleRetry} />}
    </div>
  )
}
