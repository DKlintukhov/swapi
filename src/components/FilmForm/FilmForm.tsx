import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Film } from '../../data-models';
import { FormActionBtns } from '../FormActionBtns/FormActionBtns';
import './FilmForm.css';

interface FilmFormProps {
  film: Film;
  onSubmit: (p: Film) => void;
}

export const FilmForm = ({ film, onSubmit }: FilmFormProps) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Film>>({
    defaultValues: {
      title: film.title,
      episodeId: film.episodeId,
      openingCrawl: film.openingCrawl,
      director: film.director,
      producer: film.producer,
      releaseDate: film.releaseDate,
    },
  });
  const handleReset = () => reset();
  const submitHandle: SubmitHandler<Partial<Film>> = (data) => {
    if (film) {
      const newFilm: Film = {
        ...film,
        ...data,
        episodeId: Number(data.episodeId),
      };
      onSubmit(newFilm);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandle)} className="film__form">
      <TextField label="Title:" variant="outlined" {...register("title", { required: true, maxLength: 64 })} error={!!errors.title} />
      <TextField label="Episode:" variant="outlined" type="number" {...register("episodeId", { required: true, min: 1 })} error={!!errors.episodeId} />
      <TextField label="Opening Crawl:" variant="outlined" {...register("openingCrawl", { required: true, maxLength: 1024 })} error={!!errors.openingCrawl} />
      <TextField label="Director:" variant="outlined" {...register("director", { required: true, maxLength: 64 })} error={!!errors.director} />
      <TextField label="Producer:" variant="outlined" {...register("producer", { required: true, maxLength: 64 })} error={!!errors.producer} />
      <TextField label="Release Date:" variant="outlined" {...register("releaseDate", { required: true, maxLength: 64 })} error={!!errors.releaseDate} />
      <FormActionBtns handleReset={handleReset} handleCancel={handleReset}></FormActionBtns>
    </form>
  )
}
