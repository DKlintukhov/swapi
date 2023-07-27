import { PersonCard } from '../../components/PersonCard/PersonCard';
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { Person, Planet } from '../../data-models';
import { PlanetCard } from '../../components/PlanetCard/PlanetCard';
import { Container } from '@mui/system';
import { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress } from '@mui/material';
import { useGetPlanetQuery } from '../../store/swAPI/swAPI';

export const InfoPage = () => {
  const person = useSelector(({ person }: RootState) => person.person as Person);
  const planetNum = +person.url.split('/').reverse()[1];
  const { data: planet, isLoading } = useGetPlanetQuery(planetNum);

  const personSaveHandle = (person: Person) => {
    console.log('SAVE PERSON', person);
  }
  const planetSaveHandle = (planet: Planet) => {
    console.log('SAVE PLANET', planet);
  }

  return (
    <Container>
      <Accordion expanded={true}>
        <AccordionSummary>
          <Typography>{person.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {person && <PersonCard person={person} onSubmit={personSaveHandle}></PersonCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Homeworld</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && <CircularProgress size="7rem" />}
          {planet && <PlanetCard planet={planet} onSubmit={planetSaveHandle}></PlanetCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Films</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && <CircularProgress size="7rem" />}
          {planet && <PlanetCard planet={planet} onSubmit={planetSaveHandle}></PlanetCard>}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Starships</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && <CircularProgress size="7rem" />}
          {planet && <PlanetCard planet={planet} onSubmit={planetSaveHandle}></PlanetCard>}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Species</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && <CircularProgress size="7rem" />}
          {planet && <PlanetCard planet={planet} onSubmit={planetSaveHandle}></PlanetCard>}
        </AccordionDetails>
      </Accordion >

      <Accordion>
        <AccordionSummary>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && <CircularProgress size="7rem" />}
          {planet && <PlanetCard planet={planet} onSubmit={planetSaveHandle}></PlanetCard>}
        </AccordionDetails>
      </Accordion >
    </Container >
  )
}
