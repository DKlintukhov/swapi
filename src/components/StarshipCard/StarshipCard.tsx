import { CircularProgress } from '@mui/material';
import { CardProps, Starship } from '../../data-models';
import { ErrorMessage, StarshipForm } from '..';
import { useLazyGetStarshipQuery } from '../../store/swAPI/swAPI';
import { useEffect, useState } from 'react';
import './StarshipCard.css';

export function StarshipCard({ proxy, onSave }: CardProps<Starship>) {
  const [current, setCurrent] = useState<Starship | null>(null);
  const [fetchStarship, { data: starship, isFetching, error }] = useLazyGetStarshipQuery();

  useEffect(() => {
    if (proxy.child) {
      setCurrent(proxy.child);
    } else {
      fetchStarship(proxy.id);
    }
  }, [proxy, fetchStarship]);

  useEffect(() => {
    if (starship) {
      setCurrent(starship);
    }
  }, [starship]);

  const handleSave = (starship: Starship) => onSave({ ...proxy, child: starship });

  const handleDelete = () => {
    onSave({ ...proxy, child: null });
    fetchStarship(proxy.id);
  };

  const handleRetry = () => {
    fetchStarship(proxy.id);
  };

  return (
    <div className="starship-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <StarshipForm data={current} onSubmit={handleSave} onDelete={handleDelete} />}
      {!isFetching && error && <ErrorMessage onRetry={handleRetry} />}
    </div>
  )
}
