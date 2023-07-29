import { CircularProgress } from '@mui/material';
import { CardProps, Vehicle } from '../../data-models';
import { useGetVehicleQuery } from '../../store/swAPI/swAPI';
import { VehicleForm } from '../VehicleForm/VehicleForm';
import './VehicleCard.css';

export function VehicleCard({ proxy, onSave }: CardProps<Vehicle>) {
  const { data: vehicle, isLoading } = useGetVehicleQuery(proxy.id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && vehicle && <VehicleForm vehicle={vehicle} onSubmit={onSave}></VehicleForm>}
      {!isLoading && !proxy.child && vehicle && <VehicleForm vehicle={vehicle} onSubmit={onSave}></VehicleForm>}
      {proxy.child && <VehicleForm vehicle={proxy.child} onSubmit={onSave}></VehicleForm>}
    </>
  )
}
