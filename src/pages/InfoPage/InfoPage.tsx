import {
  FilmCard,
  PersonCard,
  PlanetCard,
  StarshipCard,
  VehicleCard,
  SpeciesCard,
  HomeButton
} from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, savePerson, setPerson } from '../../store';
import { Container } from '@mui/system';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { ChildProxy, Film, Person, Planet, Species, Starship, Vehicle } from '../../data-models';
import { mergeProxies } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './InfoPage.css';

export function InfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const person = useSelector(({ ui }: RootState) => ui.person);

  useEffect(() => {
    if (!person) {
      navigate('/');
    }
  }, [person, navigate]);

  const save = (person: Person) => {
    dispatch(setPerson(person));
    dispatch(savePerson(person));
  }

  const onPlanetSave = (proxy: ChildProxy<Planet>) => {
    if (person) {
      const toSave: Person = { ...person, homeworld: proxy };
      save(toSave);
    }
  }
  const onStarshipSave = (starship: ChildProxy<Starship>) => {
    if (person) {
      const toSave: Person = {
        ...person, starships: mergeProxies(person.starships, starship)
      };
      save(toSave);
    }
  }
  const onFilmSave = (film: ChildProxy<Film>) => {
    if (person) {
      const toSave: Person = {
        ...person, films: mergeProxies(person.films, film)
      };
      save(toSave);
    }
  }
  const onSpeciesSave = (species: ChildProxy<Species>) => {
    if (person) {
      const toSave: Person = {
        ...person, species: mergeProxies(person.species, species)
      };
      save(toSave);
    }
  }
  const onVehicleSave = (vehicle: ChildProxy<Vehicle>) => {
    if (person) {
      const toSave: Person = {
        ...person, vehicles: mergeProxies(person.vehicles, vehicle)
      };
      save(toSave);
    }
  }

  return (
    <Container>
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          {person && <Typography>{person.name}</Typography>}
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
      <div className="info-page__home-btn"><HomeButton/></div>
    </Container >
  )
}
