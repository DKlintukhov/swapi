import { Vehicle, VehicleResponse, transformVehicleResponse } from '.';

export const vehicleResponseMock: VehicleResponse = {
  cargo_capacity: '100',
  consumables: '1 month',
  cost_in_credits: '100000',
  created: '2022-01-01',
  crew: '10',
  edited: '2022-01-02',
  length: '50',
  manufacturer: 'Manufacturer Name',
  max_atmosphering_speed: '1000',
  model: 'Model Name',
  name: 'Vehicle Name',
  passengers: '20',
  pilots: ['https://link/0/', 'https://link/1/'],
  films: ['https://link/0/', 'https://link/1/'],
  url: 'vehicle-url',
  vehicle_class: 'Vehicle Class',
};

export const vehicleMock: Vehicle = {
  cargoCapacity: '100',
  consumables: '1 month',
  costInCredits: '100000',
  crew: '10',
  length: '50',
  manufacturer: 'Manufacturer Name',
  maxAtmospheringSpeed: '1000',
  model: 'Model Name',
  name: 'Vehicle Name',
  passengers: '20',
  pilots: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  films: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  url: 'vehicle-url',
  vehicleClass: 'Vehicle Class',
};

it('should transform VehicleResponse to Vehicle', () => {
  const transformedVehicle = transformVehicleResponse(vehicleResponseMock);
  expect(transformedVehicle).toEqual(vehicleMock);
});
