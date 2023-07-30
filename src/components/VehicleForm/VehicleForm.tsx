import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DetailesFormProps, Vehicle } from '../../data-models';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (vehicle: Vehicle): Record<string, string | number> => ({
  name: vehicle.name,
  vehicleClass: vehicle.vehicleClass,
  model: vehicle.model,
  length: vehicle.length,
  manufacturer: vehicle.manufacturer,
  cargoCapacity: vehicle.cargoCapacity,
  consumables: vehicle.consumables,
  crew: vehicle.crew,
  costInCredits: vehicle.costInCredits,
  maxAtmospheringSpeed: vehicle.maxAtmospheringSpeed,
  passengers: vehicle.passengers,
});

export function VehicleForm({ data: vehicle, onSubmit, onDelete }: DetailesFormProps<Vehicle>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(vehicle),
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(vehicle)).forEach(([key, value]) => setValue(key, value));
  }, [vehicle, setValue]);

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<Partial<Vehicle>> = (data) => {
    if (vehicle) {
      const newVehicle: Vehicle = {
        ...vehicle,
        ...data,
      };
      onSubmit(newVehicle);
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onDelete={onDelete}>
      <TextField label="Name:" size="small" fullWidth variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Vehicle Class:" size="small" fullWidth variant="outlined" {...register("vehicleClass", { required: true, min: 1 })} error={!!errors.vehicleClass} />
      <TextField label="Model:" size="small" fullWidth variant="outlined" {...register("model", { required: true, maxLength: 64 })} error={!!errors.model} />
      <TextField label="Length:" size="small" fullWidth variant="outlined" {...register("length", { required: true, maxLength: 64 })} error={!!errors.length} />
      <TextField label="Manufacturer:" size="small" fullWidth variant="outlined" {...register("manufacturer", { required: true, maxLength: 64 })} error={!!errors.manufacturer} />
      <TextField label="Cargo Capacity:" size="small" fullWidth variant="outlined" {...register("cargoCapacity", { required: true, maxLength: 64 })} error={!!errors.cargoCapacity} />
      <TextField label="Consumables:" size="small" fullWidth variant="outlined" {...register("consumables", { required: true, maxLength: 64 })} error={!!errors.consumables} />
      <TextField label="Crew:" size="small" fullWidth variant="outlined" {...register("crew", { required: true, maxLength: 64 })} error={!!errors.crew} />
      <TextField label="Cost In Credits:" size="small" fullWidth variant="outlined" {...register("costInCredits", { required: true, maxLength: 64 })} error={!!errors.costInCredits} />
      <TextField label="Max Atmosphering Speed:" size="small" fullWidth variant="outlined" {...register("maxAtmospheringSpeed", { required: true, maxLength: 64 })} error={!!errors.maxAtmospheringSpeed} />
      <TextField label="Passengers:" size="small" fullWidth variant="outlined" {...register("passengers", { required: true, maxLength: 64 })} error={!!errors.passengers} />
    </Form>
  )
}
