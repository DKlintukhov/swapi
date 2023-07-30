import { CircularProgress } from '@mui/material';
import { CardProps, Vehicle } from '../../data-models';
import { useLazyGetVehicleQuery } from '../../store/swAPI/swAPI';
import { VehicleForm } from '../VehicleForm/VehicleForm';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '..';
import './VehicleCard.css';

export function VehicleCard({ proxy, onSave }: CardProps<Vehicle>) {
  const [current, setCurrent] = useState<Vehicle | null>(null);
  const [fetchVehicle, { data: vehicle, isFetching, error }] = useLazyGetVehicleQuery();

  useEffect(() => {
    if (proxy.child) {
      setCurrent(proxy.child);
    } else {
      fetchVehicle(proxy.id);
    }
  }, [proxy, fetchVehicle]);

  useEffect(() => {
    if (vehicle) {
      setCurrent(vehicle);
    }
  }, [vehicle]);

  const saveHandle = (vehicle: Vehicle) => onSave({ ...proxy, child: vehicle });

  const deleteHandle = () => {
    onSave({ ...proxy, child: null });
    fetchVehicle(proxy.id);
  }

  const retryHandle = () => {
    fetchVehicle(proxy.id);
  };

  return (
    <div className="vehicle-card__container">
      {isFetching && <CircularProgress size="7rem" />}
      {!isFetching && !error && current && <VehicleForm data={current} onSubmit={saveHandle} onDelete={deleteHandle} />}
      {!isFetching && error && <ErrorMessage onRetry={retryHandle} />}
    </div>
  )
}
