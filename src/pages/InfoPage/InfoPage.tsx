import { FilmCard, PersonCard, PlanetCard, StarshipCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, savePerson } from '../../store';
import { Container } from '@mui/system';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import { SpeciesCard } from '../../components/SpeciesCard/SpeciesCard';
import { Film, Person, Planet, Species, Starship, Vehicle } from '../../data-models';
import './InfoPage.css';

export function InfoPage() {
  const dispatch = useDispatch();
  const person = useSelector(({ ui }: RootState) => ui.person as Person);

  const onPlanetSave = (planet: Planet) => {
    const toSave: Person = { ...person, homeworld: { url: planet.url, child: planet } };
    dispatch(savePerson(toSave));
  }
  const onStarshipSave = (starship: Starship) => {
    const toSave: Person = {
      ...person, starships: person.starships.map((proxy) => {
        if (proxy.url === starship.url) {
          return { url: starship.url, child: starship };
        }
        return proxy;
      })
    };
    dispatch(savePerson(toSave));
  }
  const onFilmSave = (film: Film) => {
    const toSave: Person = {
      ...person, films: person.films.map((proxy) => {
        if (proxy.url === film.url) {
          return { url: film.url, child: film };
        }
        return proxy;
      })
    };
    dispatch(savePerson(toSave));
  }
  const onSpeciesSave = (species: Species) => {
    const toSave: Person = {
      ...person, species: person.species.map((proxy) => {
        if (proxy.url === species.url) {
          return { url: species.url, child: species };
        }
        return proxy;
      })
    };
    dispatch(savePerson(toSave));
  }
  const onVehicleSave = (vehicle: Vehicle) => {
    const toSave: Person = {
      ...person, vehicles: person.vehicles.map((proxy) => {
        if (proxy.url === vehicle.url) {
          return { url: vehicle.url, child: vehicle };
        }
        return proxy;
      })
    };
    dispatch(savePerson(toSave));
  }
  
  return (
    <Container>
      <Accordion defaultExpanded={true}>
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
          {person && <PlanetCard url={person.homeworld.url} onSave={onPlanetSave}></PlanetCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Films</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.films.map(({ url }, idx) =>
            <FilmCard key={idx} url={url} onSave={onFilmSave}></FilmCard>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Starships</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.starships.map(({ url }, idx) =>
            <StarshipCard key={idx} url={url} onSave={onStarshipSave}></StarshipCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.species.map(({ url }, idx) =>
            <SpeciesCard key={idx} url={url} onSave={onSpeciesSave}></SpeciesCard>
          )}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        <AccordionDetails className="info-page__container">
          {person && person.vehicles.map(({ url }, idx) =>
            <VehicleCard key={idx} url={url} onSave={onVehicleSave}></VehicleCard>
          )}
        </AccordionDetails>
      </Accordion >
    </Container >
  )
}
