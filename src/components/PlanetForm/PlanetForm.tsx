import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DetailesFormProps, Planet } from '../../data-models';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (planet: Planet): Record<string, string | number> => ({
  name: planet.name,
  climate: planet.climate,
  diameter: planet.diameter,
  gravity: planet.gravity,
  orbitalPeriod: planet.orbitalPeriod,
  population: planet.population,
  rotationPeriod: planet.rotationPeriod,
  surfaceWater: planet.surfaceWater,
  terrain: planet.terrain,
});

export function PlanetForm({ data: planet, onSubmit, onDelete }: DetailesFormProps<Planet>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(planet),
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(planet)).forEach(([key, value]) => setValue(key, value));
  }, [planet, setValue]);

  const handleReset = () => reset();

  const handleSave: SubmitHandler<Partial<Planet>> = (data) => {
    const newPlanet: Planet = {
      ...planet,
      ...data,
    };
    onSubmit(newPlanet);
  }

  return (
    <Form onSubmit={handleSubmit(handleSave)} onReset={handleReset} onDelete={onDelete}>
      <TextField label="Name:" size="small" fullWidth variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Climate:" size="small" fullWidth variant="outlined" {...register("climate", { required: true, maxLength: 64 })} error={!!errors.climate} />
      <TextField label="Diameter:" size="small" fullWidth variant="outlined" {...register("diameter", { required: true, maxLength: 64 })} error={!!errors.diameter} />
      <TextField label="Gravity:" size="small" fullWidth variant="outlined" {...register("gravity", { required: true, maxLength: 64 })} error={!!errors.gravity} />
      <TextField label="Orbital Period:" size="small" fullWidth variant="outlined" {...register("orbitalPeriod", { required: true, maxLength: 64 })} error={!!errors.orbitalPeriod} />
      <TextField label="Population:" size="small" fullWidth variant="outlined" {...register("population", { required: true, maxLength: 64 })} error={!!errors.population} />
      <TextField label="Rotation Period:" size="small" fullWidth variant="outlined" {...register("rotationPeriod", { required: true, maxLength: 64 })} error={!!errors.rotationPeriod} />
      <TextField label="Surface Water:" size="small" fullWidth variant="outlined" {...register("surfaceWater", { required: true, maxLength: 64 })} error={!!errors.surfaceWater} />
      <TextField label="Terrain:" size="small" fullWidth variant="outlined" {...register("terrain", { required: true, maxLength: 128 })} error={!!errors.terrain} />
    </Form>
  )
}
