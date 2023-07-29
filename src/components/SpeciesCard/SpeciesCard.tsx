import { CircularProgress } from '@mui/material';
import { CardProps, Species } from '../../data-models';
import { useLazyGetSpeciesQuery } from '../../store/swAPI/swAPI';
import { SpeciesForm } from '../SpeciesForm/SpeciesForm';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '..';
import './SpeciesCard.css';

export function SpeciesCard({ proxy, onSave }: CardProps<Species>) {
  const [current, setCurrent] = useState<Species | null>(null);
  const [fetchSpecies, { data: species, isFetching, error }] = useLazyGetSpeciesQuery();

  useEffect(() => {
    if (proxy.child) {
      setCurrent(proxy.child);
    } else {
      fetchSpecies(proxy.id);
    }
  }, [proxy, fetchSpecies]);

  useEffect(() => {
    if (species) {
      setCurrent(species);
    }
  }, [species]);

  const saveHandle = (species: Species) => {
    onSave({ ...proxy, child: species });
  };

  const deleteHandle = () => {
    onSave({ ...proxy, child: null });
    fetchSpecies(proxy.id);
  };

  const retryHandle = () => {
    fetchSpecies(proxy.id);
  };

  return (
    <div className="species-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <SpeciesForm data={current} onSubmit={saveHandle} onDelete={deleteHandle} />}
      {!isFetching && error && <ErrorMessage onRetry={retryHandle} />}
    </div>
  )
}
