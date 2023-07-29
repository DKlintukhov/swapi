import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DetailesFormProps, Starship } from '../../data-models';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (starship: Starship): Record<string, string | number> => ({
  name: starship.name,
  starshipClass: starship.starshipClass,
  model: starship.model,
  length: starship.length,
  manufacturer: starship.manufacturer,
  cargoCapacity: starship.cargoCapacity,
  consumables: starship.consumables,
  crew: starship.crew,
  costInCredits: starship.costInCredits,
  hyperdriveRating: starship.hyperdriveRating,
  MGLT: starship.MGLT,
  maxAtmospheringSpeed: starship.maxAtmospheringSpeed,
  passengers: starship.passengers,
});

export function StarshipForm({ data: starship, onSubmit, onDelete }: DetailesFormProps<Starship>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(starship),
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(starship)).forEach(([key, value]) => setValue(key, value));
  }, [starship, setValue]);

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<Partial<Starship>> = (data) => {
    if (starship) {
      const newStarship: Starship = {
        ...starship,
        ...data,
      };
      onSubmit(newStarship);
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onDelete={onDelete}>
      <TextField label="Name:" size="small" fullWidth variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Starship Class:" size="small" fullWidth variant="outlined" {...register("starshipClass", { required: true, min: 1 })} error={!!errors.starshipClass} />
      <TextField label="Model:" size="small" fullWidth variant="outlined" {...register("model", { required: true, maxLength: 64 })} error={!!errors.model} />
      <TextField label="Length:" size="small" fullWidth variant="outlined" {...register("length", { required: true, maxLength: 64 })} error={!!errors.length} />
      <TextField label="Manufacturer:" size="small" fullWidth variant="outlined" {...register("manufacturer", { required: true, maxLength: 64 })} error={!!errors.manufacturer} />
      <TextField label="Cargo Capacity:" size="small" fullWidth variant="outlined" {...register("cargoCapacity", { required: true, maxLength: 64 })} error={!!errors.cargoCapacity} />
      <TextField label="Consumables:" size="small" fullWidth variant="outlined" {...register("consumables", { required: true, maxLength: 64 })} error={!!errors.consumables} />
      <TextField label="Crew:" size="small" fullWidth variant="outlined" {...register("crew", { required: true, maxLength: 64 })} error={!!errors.crew} />
      <TextField label="Cost In Credits:" size="small" fullWidth variant="outlined" {...register("costInCredits", { required: true, maxLength: 64 })} error={!!errors.costInCredits} />
      <TextField label="Hyperdrive Rating:" size="small" fullWidth variant="outlined" {...register("hyperdriveRating", { required: true, maxLength: 64 })} error={!!errors.hyperdriveRating} />
      <TextField label="MGLT:" size="small" fullWidth variant="outlined" {...register("MGLT", { required: true, maxLength: 64 })} error={!!errors.MGLT} />
      <TextField label="Max Atmosphering Speed:" size="small" fullWidth variant="outlined" {...register("maxAtmospheringSpeed", { required: true, maxLength: 64 })} error={!!errors.maxAtmospheringSpeed} />
      <TextField label="Passengers:" size="small" fullWidth variant="outlined" {...register("passengers", { required: true, maxLength: 64 })} error={!!errors.passengers} />
    </Form>
  )
}
