import { CircularProgress } from '@mui/material';
import { CardProps, Film } from '../../data-models';
import { useGetFilmQuery } from '../../store/swAPI/swAPI';
import { FilmForm } from '..';
import './FilmCard.css';

export function FilmCard({ id, onSave }: CardProps<Film>) {
  const { isLoading, data: film } = useGetFilmQuery(id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && film && <FilmForm film={film} onSubmit={onSave}></FilmForm>}
    </>
  )
}
