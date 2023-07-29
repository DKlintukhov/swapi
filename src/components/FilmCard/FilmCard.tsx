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

  const saveHandle = (film: Film) => onSave({ ...proxy, child: film });

  const deleteHandle = () => {
    onSave({ ...proxy, child: null });
    fetchFilm(proxy.id);
  };

  const retryHandle = () => {
    fetchFilm(proxy.id);
  };

  return (
    <div className="film-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <FilmForm data={current} onSubmit={saveHandle} onDelete={deleteHandle} />}
      {!isFetching && error && <ErrorMessage onRetry={retryHandle} />}
    </div>
  )
}
