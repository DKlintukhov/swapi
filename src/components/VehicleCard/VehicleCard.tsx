import { CircularProgress } from '@mui/material';
import { Vehicle } from '../../data-models';
import { useGetVehicleQuery } from '../../store/swAPI/swAPI';
import { VehicleForm } from '../VehicleForm/VehicleForm';
import './VehicleCard.css';

interface VehicleCardProps {
  url: string;
  onSave: (vehicle: Vehicle) => void;
}

export function VehicleCard({ url, onSave }: VehicleCardProps) {
  const vehicleNum = +url.split('/').reverse()[1];
  const { data: vehicle, isLoading } = useGetVehicleQuery(vehicleNum);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && vehicle && <VehicleForm vehicle={vehicle} onSubmit={onSave}></VehicleForm>}
    </>
  )
}
