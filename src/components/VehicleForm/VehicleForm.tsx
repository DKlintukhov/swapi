import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Vehicle } from '../../data-models';
import { Form } from '..';

interface VehicleFormProps {
  vehicle: Vehicle;
  onSubmit: (p: Vehicle) => void;
}

export function VehicleForm({ vehicle, onSubmit }: VehicleFormProps) {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Vehicle>>({
    defaultValues: {
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
    },
  });

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
    <Form onSubmit={handleSubmit(submitHandler)} onReset={reset} onCancel={reset}>
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Vehicle Class:" variant="outlined" {...register("vehicleClass", { required: true, min: 1 })} error={!!errors.vehicleClass} />
      <TextField label="Model:" variant="outlined" {...register("model", { required: true, maxLength: 64 })} error={!!errors.model} />
      <TextField label="Length:" variant="outlined" {...register("length", { required: true, maxLength: 64 })} error={!!errors.length} />
      <TextField label="Manufacturer:" variant="outlined" {...register("manufacturer", { required: true, maxLength: 64 })} error={!!errors.manufacturer} />
      <TextField label="Cargo Capacity:" variant="outlined" {...register("cargoCapacity", { required: true, maxLength: 64 })} error={!!errors.cargoCapacity} />
      <TextField label="Consumables:" variant="outlined" {...register("consumables", { required: true, maxLength: 64 })} error={!!errors.consumables} />
      <TextField label="Crew:" variant="outlined" {...register("crew", { required: true, maxLength: 64 })} error={!!errors.crew} />
      <TextField label="Cost In Credits:" variant="outlined" {...register("costInCredits", { required: true, maxLength: 64 })} error={!!errors.costInCredits} />
      <TextField label="Max Atmosphering Speed:" variant="outlined" {...register("maxAtmospheringSpeed", { required: true, maxLength: 64 })} error={!!errors.maxAtmospheringSpeed} />
      <TextField label="Passengers:" variant="outlined" {...register("passengers", { required: true, maxLength: 64 })} error={!!errors.passengers} />
    </Form>
  )
}
