import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DetailesFormProps, Species } from '../../data-models';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (species: Species): Record<string, string | number> => ({
  name: species.name,
  language: species.language,
  averageHeight: species.averageHeight,
  averageLifespan: species.averageLifespan,
  classification: species.classification,
  eyeColors: species.eyeColors,
  hairColors: species.hairColors,
  skinColors: species.skinColors,
  designation: species.designation,
});

export function SpeciesForm({ data: species, onSubmit, onDelete }: DetailesFormProps<Species>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(species),
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(species)).forEach(([key, value]) => setValue(key, value));
  }, [species, setValue]);

  const handleReset = () => reset();

  const handleSave: SubmitHandler<Partial<Species>> = (data) => {
    if (species) {
      const newspecies: Species = {
        ...species,
        ...data,
      };
      onSubmit(newspecies);
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleSave)} onReset={handleReset} onDelete={onDelete}>
      <TextField label="Name:" size="small" fullWidth variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Language:" size="small" fullWidth variant="outlined" {...register("language", { required: true, min: 1 })} error={!!errors.language} />
      <TextField label="Average Height:" size="small" fullWidth variant="outlined" {...register("averageHeight", { required: true, maxLength: 64 })} error={!!errors.averageHeight} />
      <TextField label="Average Lifespan:" size="small" fullWidth variant="outlined" {...register("averageLifespan", { required: true, maxLength: 64 })} error={!!errors.averageLifespan} />
      <TextField label="Classification:" size="small" fullWidth variant="outlined" {...register("classification", { required: true, maxLength: 64 })} error={!!errors.classification} />
      <TextField label="Eye Colors:" size="small" fullWidth variant="outlined" {...register("eyeColors", { required: true, maxLength: 64 })} error={!!errors.eyeColors} />
      <TextField label="Hair Colors:" size="small" fullWidth variant="outlined" {...register("hairColors", { required: true, maxLength: 64 })} error={!!errors.hairColors} />
      <TextField label="Skin Colors:" size="small" fullWidth variant="outlined" {...register("skinColors", { required: true, maxLength: 64 })} error={!!errors.skinColors} />
      <TextField label="Designation:" size="small" fullWidth variant="outlined" {...register("designation", { required: true, maxLength: 64 })} error={!!errors.designation} />
    </Form>
  )
}
