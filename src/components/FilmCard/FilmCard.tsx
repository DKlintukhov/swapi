import { CircularProgress } from '@mui/material';
import { CardProps, Film } from '../../data-models';
import { useLazyGetFilmQuery } from '../../store/swAPI/swAPI';
import { ErrorMessage, FilmForm } from '..';
import { useEffect, useState } from 'react';
import './FilmCard.css';

export function FilmCard({ proxy, onSave }: CardProps<Film>) {
  const [current, setCurrent] = useState<Film | null>(null);
  const [fetchFilm, { data: film, isFetching, error }] = useLazyGetFilmQuery();

  useEffect(() => {
    if (proxy.child) {
      setCurrent(proxy.child);
    } else {
      fetchFilm(proxy.id);
    }
  }, [proxy, fetchFilm]);

  useEffect(() => {
    if (film) {
      setCurrent(film);
    }
  }, [film]);

  const handleSave = (film: Film) => onSave({ ...proxy, child: film });

  const handleDelete = () => {
    onSave({ ...proxy, child: null });
    fetchFilm(proxy.id);
  };

  const handleRetry = () => {
    fetchFilm(proxy.id);
  };

  return (
    <div className="film-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <FilmForm data={current} onSubmit={handleSave} onDelete={handleDelete} />}
      {!isFetching && error && <ErrorMessage onRetry={handleRetry} />}
    </div>
  )
}
