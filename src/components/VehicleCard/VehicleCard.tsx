import { CircularProgress } from '@mui/material';
import { Vehicle } from '../../data-models';
import { useGetVehicleQuery } from '../../store/swAPI/swAPI';
import { VehicleForm } from '../VehicleForm/VehicleForm';
import './VehicleCard.css';

interface VehicleCardProps {
  url: string;
}

export function VehicleCard({ url }: VehicleCardProps) {
  const vehicleNum = +url.split('/').reverse()[1];
  const { data: vehicle, isLoading } = useGetVehicleQuery(vehicleNum);

  const vehicleSaveHandle = (vehicle: Vehicle) => {
    console.log('SAVE VEHICLE', vehicle);
  }

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && vehicle && <VehicleForm vehicle={vehicle} onSubmit={vehicleSaveHandle}></VehicleForm>}
    </>
  )
}
