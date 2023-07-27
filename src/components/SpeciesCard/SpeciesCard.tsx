import { CircularProgress } from '@mui/material';
import { Species } from '../../data-models';
import { useGetSpeciesQuery } from '../../store/swAPI/swAPI';
import { SpeciesForm } from '../SpeciesForm/SpeciesForm';
import './SpeciesCard.css';

interface SpeciesCardProps {
  url: string;
}

export const SpeciesCard = ({ url }: SpeciesCardProps) => {
  const speciesNum = +url.split('/').reverse()[1];
  const { data: species, isLoading } = useGetSpeciesQuery(speciesNum);

  const peciesSaveHandle = (species: Species) => {
    console.log('SAVE species', species);
  }

  return (
    <>
      {isLoading && <CircularProgress size="7rem" />}
      {!isLoading && species && <SpeciesForm species={species} onSubmit={peciesSaveHandle}></SpeciesForm>}
    </>
  )
}
