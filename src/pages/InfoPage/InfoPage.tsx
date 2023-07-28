import { FilmCard, PersonCard, PlanetCard, StarshipCard } from '../../components';
import { useSelector } from 'react-redux'
import { RootState, root } from '../../store';
import { Container } from '@mui/system';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import { SpeciesCard } from '../../components/SpeciesCard/SpeciesCard';
import { Person } from '../../data-models';
import './InfoPage.css';

export function InfoPage() {
  const person = useSelector((state: RootState) => state[root.name].person as Person);

  return (
    <Container>
      <Accordion expanded={true}>
        <AccordionSummary>
          <Typography>{person.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {person && <PersonCard person={person}></PersonCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Homeworld</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {person && <PlanetCard url={person.url}></PlanetCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Films</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.films.map(({ url }, idx) =>
            <FilmCard key={idx} url={url} ></FilmCard>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Starships</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.starships.map(({ url }, idx) =>
            <StarshipCard key={idx} url={url}></StarshipCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.species.map(({ url }, idx) =>
            <SpeciesCard key={idx} url={url}></SpeciesCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.vehicles.map(({ url }, idx) =>
            <VehicleCard key={idx} url={url}></VehicleCard>
          )}
        </AccordionDetails>
      </Accordion >
    </Container >
  )
}
