import { Card, CardContent, Typography, CardActions, TextField } from '@mui/material';
import { Person } from '../../data-models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormActionBtns } from '../FormActionBtns/FormActionBtns';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
  onSubmit: (p: Person) => void;
}

export const PersonCard = ({ person, onSubmit }: PersonCardProps) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<Partial<Person>>({
    defaultValues: {
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
      height: person.height,
      mass: person.mass,
      skinColor: person.skinColor,
      hairColor: person.hairColor,
    },
  });
  const handleReset = () => reset();
  const submitHandle: SubmitHandler<Partial<Person>> = (data) => {
    const newPerson: Person = {
      ...person,
      ...data,
      height: Number(data.height),
      mass: Number(data.mass)
    };
    onSubmit(newPerson);
  }

  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardContent>
        <form role="form" onSubmit={handleSubmit(submitHandle)} className="person-card__form">
          <Typography gutterBottom variant="h3" >
            <TextField label="Name" variant="outlined" {...register("name", { required: true, maxLength: 32 })} error={!!errors.name} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Gender" variant="outlined" {...register("gender", { required: true, maxLength: 32 })} error={!!errors.gender} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Birth Year:" variant="outlined" {...register("birthYear", { required: true, maxLength: 32 })} error={!!errors.birthYear} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Height:" variant="outlined" type="number" {...register("height", { required: true, maxLength: 32 })} error={!!errors.height} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Mass:" variant="outlined" type="number" {...register("mass", { required: true, maxLength: 32 })} error={!!errors.height} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Eye Color:" variant="outlined" {...register("eyeColor", { required: true, maxLength: 32 })} error={!!errors.eyeColor} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Hair Color:" variant="outlined" {...register("hairColor", { required: true, maxLength: 32 })} error={!!errors.hairColor} />
          </Typography>
          <Typography gutterBottom variant="h3" >
            <TextField label="Skin Color:" variant="outlined" {...register("skinColor", { required: true, maxLength: 32 })} error={!!errors.skinColor} />
          </Typography>
          <CardActions>
            <FormActionBtns handleReset={handleReset} handleCancel={handleReset}></FormActionBtns>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
