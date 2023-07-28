import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Starship } from '../../data-models';
import { FormActionBtns } from '../FormActionBtns/FormActionBtns';
import './StarshipForm.css';

interface StarshipFormProps {
  starship: Starship;
  onSubmit: (p: Starship) => void;
}

export function StarshipForm({ starship, onSubmit }: StarshipFormProps) {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Starship>>({
    defaultValues: {
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
    },
  });
  const handleReset = () => reset();
  const submitHandle: SubmitHandler<Partial<Starship>> = (data) => {
    if (starship) {
      const newStarship: Starship = {
        ...starship,
        ...data,
      };
      onSubmit(newStarship);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandle)} className="starship__form">
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Starship Class:" variant="outlined" {...register("starshipClass", { required: true, min: 1 })} error={!!errors.starshipClass} />
      <TextField label="Model:" variant="outlined" {...register("model", { required: true, maxLength: 64 })} error={!!errors.model} />
      <TextField label="Length:" variant="outlined" {...register("length", { required: true, maxLength: 64 })} error={!!errors.length} />
      <TextField label="Manufacturer:" variant="outlined" {...register("manufacturer", { required: true, maxLength: 64 })} error={!!errors.manufacturer} />
      <TextField label="Cargo Capacity:" variant="outlined" {...register("cargoCapacity", { required: true, maxLength: 64 })} error={!!errors.cargoCapacity} />
      <TextField label="Consumables:" variant="outlined" {...register("consumables", { required: true, maxLength: 64 })} error={!!errors.consumables} />
      <TextField label="Crew:" variant="outlined" {...register("crew", { required: true, maxLength: 64 })} error={!!errors.crew} />
      <TextField label="Cost In Credits:" variant="outlined" {...register("costInCredits", { required: true, maxLength: 64 })} error={!!errors.costInCredits} />
      <TextField label="Hyperdrive Rating:" variant="outlined" {...register("hyperdriveRating", { required: true, maxLength: 64 })} error={!!errors.hyperdriveRating} />
      <TextField label="MGLT:" variant="outlined" {...register("MGLT", { required: true, maxLength: 64 })} error={!!errors.MGLT} />
      <TextField label="Max Atmosphering Speed:" variant="outlined" {...register("maxAtmospheringSpeed", { required: true, maxLength: 64 })} error={!!errors.maxAtmospheringSpeed} />
      <TextField label="Passengers:" variant="outlined" {...register("passengers", { required: true, maxLength: 64 })} error={!!errors.passengers} />
      <FormActionBtns handleReset={handleReset} handleCancel={handleReset}></FormActionBtns>
    </form>
  )
}
