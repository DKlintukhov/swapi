import { CircularProgress } from '@mui/material';
import { CardProps, Species } from '../../data-models';
import { useGetSpeciesQuery } from '../../store/swAPI/swAPI';
import { SpeciesForm } from '../SpeciesForm/SpeciesForm';
import './SpeciesCard.css';

export function SpeciesCard({ proxy, onSave }: CardProps<Species>) {
  const { data: species, isLoading } = useGetSpeciesQuery(proxy.id);

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && !proxy.child && species && <SpeciesForm species={species} onSubmit={onSave}></SpeciesForm>}
      {proxy.child && <SpeciesForm species={proxy.child} onSubmit={onSave}></SpeciesForm>}
    </>
  )
}
