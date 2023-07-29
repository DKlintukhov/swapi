import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Species } from '../../data-models';
import { Form } from '..';

interface SpeciesFormProps {
  species: Species;
  onSubmit: (p: Species) => void;
}

export function SpeciesForm({ species, onSubmit }: SpeciesFormProps) {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Species>>({
    defaultValues: {
      name: species.name,
      language: species.language,
      averageHeight: species.averageHeight,
      averageLifespan: species.averageLifespan,
      classification: species.classification,
      eyeColors: species.eyeColors,
      hairColors: species.hairColors,
      skinColors: species.skinColors,
      designation: species.designation,
    },
  });

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<Partial<Species>> = (data) => {
    if (species) {
      const newspecies: Species = {
        ...species,
        ...data,
      };
      onSubmit(newspecies);
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onCancel={reset}>
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Language:" variant="outlined" {...register("language", { required: true, min: 1 })} error={!!errors.language} />
      <TextField label="Average Height:" variant="outlined" {...register("averageHeight", { required: true, maxLength: 64 })} error={!!errors.averageHeight} />
      <TextField label="Average Lifespan:" variant="outlined" {...register("averageLifespan", { required: true, maxLength: 64 })} error={!!errors.averageLifespan} />
      <TextField label="Classification:" variant="outlined" {...register("classification", { required: true, maxLength: 64 })} error={!!errors.classification} />
      <TextField label="Eye Colors:" variant="outlined" {...register("eyeColors", { required: true, maxLength: 64 })} error={!!errors.eyeColors} />
      <TextField label="Hair Colors:" variant="outlined" {...register("hairColors", { required: true, maxLength: 64 })} error={!!errors.hairColors} />
      <TextField label="Skin Colors:" variant="outlined" {...register("skinColors", { required: true, maxLength: 64 })} error={!!errors.skinColors} />
      <TextField label="Designation:" variant="outlined" {...register("designation", { required: true, maxLength: 64 })} error={!!errors.designation} />
    </Form>
  )
}
