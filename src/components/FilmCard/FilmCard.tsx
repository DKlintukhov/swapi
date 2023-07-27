import { CircularProgress } from '@mui/material';
import { Film } from '../../data-models';
import { useGetFilmQuery } from '../../store/swAPI/swAPI';
import { FilmForm } from '..';
import './FilmCard.css';

interface FilmCardProps {
  url: string;
}

export const FilmCard = ({ url }: FilmCardProps) => {
  const filmNum = +url.split('/').reverse()[1];
  const { isLoading, data: film } = useGetFilmQuery(filmNum);

  const filmSaveHandle = (film: Film) => {
    console.log('SAVE FILM', film);
  }

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && film && <FilmForm film={film} onSubmit={filmSaveHandle}></FilmForm>}
    </>
  )
}
