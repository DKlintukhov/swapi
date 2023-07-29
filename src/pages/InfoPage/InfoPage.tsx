import {
  FilmCard,
  PersonCard,
  PlanetCard,
  StarshipCard,
  VehicleCard,
  SpeciesCard
} from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, savePerson, setPerson } from '../../store';
import { Container } from '@mui/system';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { ChildProxy, Film, Person, Planet, Species, Starship, Vehicle } from '../../data-models';
import { mergeProxies } from '../../utils';
import './InfoPage.css';

export function InfoPage() {
  const dispatch = useDispatch();
  const person = useSelector(({ ui }: RootState) => ui.person as Person);

  const onPlanetSave = (proxy: ChildProxy<Planet>) => {
    const toSave: Person = { ...person, homeworld: proxy };
    dispatch(setPerson(toSave));
    dispatch(savePerson(toSave));
  }
  const onStarshipSave = (starship: ChildProxy<Starship>) => {
    const toSave: Person = {
      ...person, starships: mergeProxies(person.starships, starship)
    };
    dispatch(setPerson(toSave));
    dispatch(savePerson(toSave));
  }
  const onFilmSave = (film: ChildProxy<Film>) => {
    const toSave: Person = {
      ...person, films: mergeProxies(person.films, film)
    };
    dispatch(setPerson(toSave));
    dispatch(savePerson(toSave));
  }
  const onSpeciesSave = (species: ChildProxy<Species>) => {
    const toSave: Person = {
      ...person, species: mergeProxies(person.species, species)
    };
    dispatch(setPerson(toSave));
    dispatch(savePerson(toSave));
  }
  const onVehicleSave = (vehicle: ChildProxy<Vehicle>) => {
    const toSave: Person = {
      ...person, vehicles: mergeProxies(person.vehicles, vehicle)
    };
    dispatch(setPerson(toSave));
    dispatch(savePerson(toSave));
  }

  return (
    <Container>
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <Typography>{person.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {person && <PersonCard person={person} />}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Homeworld</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {person && <PlanetCard proxy={person.homeworld} onSave={onPlanetSave}></PlanetCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Films</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.films.map((proxy) =>
            <FilmCard key={proxy.id} proxy={proxy} onSave={onFilmSave}></FilmCard>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Starships</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.starships.map((proxy) =>
            <StarshipCard key={proxy.id} proxy={proxy} onSave={onStarshipSave}></StarshipCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.species.map((proxy) =>
            <SpeciesCard key={proxy.id} proxy={proxy} onSave={onSpeciesSave}></SpeciesCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.vehicles.map((proxy) =>
            <VehicleCard key={proxy.id} proxy={proxy} onSave={onVehicleSave}></VehicleCard>
          )}
        </AccordionDetails>
      </Accordion >
    </Container >
  )
}
