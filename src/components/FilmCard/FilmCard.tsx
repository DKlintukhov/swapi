import { CircularProgress } from '@mui/material';
import { Film } from '../../data-models';
import { useGetFilmQuery } from '../../store/swAPI/swAPI';
import { FilmForm } from '..';
import './FilmCard.css';

interface FilmCardProps {
  url: string;
  onSave: (film: Film) => void;
}

export function FilmCard({ url, onSave }: FilmCardProps) {
  const filmNum = +url.split('/').reverse()[1];
  const { isLoading, data: film } = useGetFilmQuery(filmNum);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && film && <FilmForm film={film} onSubmit={onSave}></FilmForm>}
    </>
  )
}
