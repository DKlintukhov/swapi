import { Card, CardContent, Typography, CardActions, TextField } from '@mui/material';
import { Planet } from '../../data-models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormActionBtns } from '../FormActionBtns/FormActionBtns';
import './PlanetCard.css';

interface PlanetCardProps {
  planet: Planet;
  onSubmit: (p: Planet) => void;
}

export const PlanetCard = ({ planet, onSubmit }: PlanetCardProps) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Planet>>({
    defaultValues: {
      name: planet.name,
      climate: planet.climate,
      diameter: planet.diameter,
      gravity: planet.gravity,
      orbitalPeriod: planet.orbitalPeriod,
      population: planet.population,
      rotationPeriod: planet.rotationPeriod,
      surfaceWater: planet.surfaceWater,
      terrain: planet.terrain,
    },
  });
  const handleReset = () => reset();
  const submitHandle: SubmitHandler<Partial<Planet>> = (data) => {
    const newPlanet: Planet = {
      ...planet,
      ...data,
    };
    onSubmit(newPlanet);
  }

  return (
    <form onSubmit={handleSubmit(submitHandle)} className="person-card__form">
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 32 })} error={!!errors.name} />
      <TextField label="Climate:" variant="outlined" {...register("climate", { required: true, maxLength: 32 })} error={!!errors.climate} />
      <TextField label="Diameter:" variant="outlined" {...register("diameter", { required: true, maxLength: 32 })} error={!!errors.diameter} />
      <TextField label="Gravity:" variant="outlined" {...register("gravity", { required: true, maxLength: 32 })} error={!!errors.gravity} />
      <TextField label="Orbital Period:" variant="outlined" {...register("orbitalPeriod", { required: true, maxLength: 32 })} error={!!errors.orbitalPeriod} />
      <TextField label="Population:" variant="outlined" {...register("population", { required: true, maxLength: 32 })} error={!!errors.population} />
      <TextField label="Rotation Period:" variant="outlined" {...register("rotationPeriod", { required: true, maxLength: 32 })} error={!!errors.rotationPeriod} />
      <TextField label="Surface Water:" variant="outlined" {...register("surfaceWater", { required: true, maxLength: 32 })} error={!!errors.surfaceWater} />
      <TextField label="Terrain:" variant="outlined" {...register("terrain", { required: true, maxLength: 32 })} error={!!errors.terrain} />
      <FormActionBtns handleReset={handleReset} handleCancel={handleReset}></FormActionBtns>
    </form>
  )
}
