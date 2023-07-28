import { TextField } from '@mui/material';
import { Person } from '../../data-models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormActionBtns } from '../FormActionBtns/FormActionBtns';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
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
  const onSubmit = (person: Person) => {
    console.log('SAVE PERSON', person);
  }
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
    <form onSubmit={handleSubmit(submitHandle)} className="person-card__form">
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Gender:" variant="outlined" {...register("gender", { required: true, maxLength: 64 })} error={!!errors.gender} />
      <TextField label="Birth Year:" variant="outlined" {...register("birthYear", { required: true, maxLength: 64 })} error={!!errors.birthYear} />
      <TextField label="Height:" variant="outlined" type="number" {...register("height", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Mass:" variant="outlined" type="number" {...register("mass", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Eye Color:" variant="outlined" {...register("eyeColor", { required: true, maxLength: 64 })} error={!!errors.eyeColor} />
      <TextField label="Hair Color:" variant="outlined" {...register("hairColor", { required: true, maxLength: 64 })} error={!!errors.hairColor} />
      <TextField label="Skin Color:" variant="outlined" {...register("skinColor", { required: true, maxLength: 64 })} error={!!errors.skinColor} />
      <FormActionBtns handleReset={handleReset} handleCancel={handleReset}></FormActionBtns>
    </form>
  )
}
