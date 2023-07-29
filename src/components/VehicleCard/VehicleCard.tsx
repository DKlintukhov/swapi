import { CircularProgress } from '@mui/material';
import { CardProps, Vehicle } from '../../data-models';
import { useGetVehicleQuery } from '../../store/swAPI/swAPI';
import { VehicleForm } from '../VehicleForm/VehicleForm';
import './VehicleCard.css';

export function VehicleCard({ id, onSave }: CardProps<Vehicle>) {
  const { data: vehicle, isLoading } = useGetVehicleQuery(id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && vehicle && <VehicleForm vehicle={vehicle} onSubmit={onSave}></VehicleForm>}
    </>
  )
}
