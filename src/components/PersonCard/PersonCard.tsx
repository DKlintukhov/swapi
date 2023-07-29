import { TextField } from '@mui/material';
import { Person } from '../../data-models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '..';
import { useDispatch } from 'react-redux';
import { savePerson } from '../../store';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const dispatch = useDispatch();
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
  const submit = (person: Person) => {
    dispatch(savePerson(person));
  }

  const resetHandler = () => reset();
  
  const submitHandler: SubmitHandler<Partial<Person>> = (data) => {
    const newPerson: Person = {
      ...person,
      ...data,
      height: Number(data.height),
      mass: Number(data.mass)
    };
    submit(newPerson);
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onCancel={reset}>
      <TextField label="Name:" variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Gender:" variant="outlined" {...register("gender", { required: true, maxLength: 64 })} error={!!errors.gender} />
      <TextField label="Birth Year:" variant="outlined" {...register("birthYear", { required: true, maxLength: 64 })} error={!!errors.birthYear} />
      <TextField label="Height:" variant="outlined" type="number" {...register("height", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Mass:" variant="outlined" type="number" {...register("mass", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Eye Color:" variant="outlined" {...register("eyeColor", { required: true, maxLength: 64 })} error={!!errors.eyeColor} />
      <TextField label="Hair Color:" variant="outlined" {...register("hairColor", { required: true, maxLength: 64 })} error={!!errors.hairColor} />
      <TextField label="Skin Color:" variant="outlined" {...register("skinColor", { required: true, maxLength: 64 })} error={!!errors.skinColor} />
    </Form>
  )
}
