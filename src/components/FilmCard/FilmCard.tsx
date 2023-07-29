import { CircularProgress } from '@mui/material';
import { CardProps, Film } from '../../data-models';
import { useGetFilmQuery } from '../../store/swAPI/swAPI';
import { FilmForm } from '..';
import './FilmCard.css';

export function FilmCard({ proxy, onSave }: CardProps<Film>) {
  const { isLoading, data: film } = useGetFilmQuery(proxy.id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && !proxy.child && film && <FilmForm film={film} onSubmit={onSave}></FilmForm>}
      {proxy.child && <FilmForm film={proxy.child} onSubmit={onSave}></FilmForm>}
    </>
  )
}
