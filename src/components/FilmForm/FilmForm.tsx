import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DetailesFormProps, Film } from '../../data-models';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (film: Film): Record<string, string | number> => ({
  title: film.title,
  episodeId: film.episodeId,
  openingCrawl: film.openingCrawl,
  director: film.director,
  producer: film.producer,
  releaseDate: film.releaseDate,
});

export function FilmForm({ data: film, onSubmit, onDelete }: DetailesFormProps<Film>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(film)
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(film)).forEach(([key, value]) => setValue(key, value));
  }, [film, setValue]);

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<Partial<Film>> = (data) => {
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
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onDelete={onDelete}>
      <TextField label="Title:" size="small" fullWidth variant="outlined" {...register("title", { required: true, maxLength: 64 })} error={!!errors.title} />
      <TextField label="Episode:" size="small" fullWidth variant="outlined" type="number" {...register("episodeId", { required: true, min: 1 })} error={!!errors.episodeId} />
      <TextField label="Opening Crawl:" size="small" fullWidth variant="outlined" {...register("openingCrawl", { required: true, maxLength: 1024 })} error={!!errors.openingCrawl} />
      <TextField label="Director:" size="small" fullWidth variant="outlined" {...register("director", { required: true, maxLength: 64 })} error={!!errors.director} />
      <TextField label="Producer:" size="small" fullWidth variant="outlined" {...register("producer", { required: true, maxLength: 64 })} error={!!errors.producer} />
      <TextField label="Release Date:" size="small" fullWidth variant="outlined" {...register("releaseDate", { required: true, maxLength: 64 })} error={!!errors.releaseDate} />
    </Form>
  )
}
