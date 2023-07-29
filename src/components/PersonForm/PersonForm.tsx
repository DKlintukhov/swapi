import { TextField } from '@mui/material';
import { DetailesFormProps, Person } from '../../data-models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '..';
import { useEffect } from 'react';

const getDefaultFormValues = (person: Person): Record<string, string | number> => ({
  name: person.name,
  gender: person.gender,
  birthYear: person.birthYear,
  eyeColor: person.eyeColor,
  height: person.height,
  mass: person.mass,
  skinColor: person.skinColor,
  hairColor: person.hairColor,
});

export function PersonForm({ data: person, onSubmit, onDelete }: DetailesFormProps<Person>) {
  const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultFormValues(person),
  });

  useEffect(() => {
    Object.entries(getDefaultFormValues(person)).forEach(([key, value]) => setValue(key, value));
  }, [person, setValue]);

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<Partial<Person>> = (data) => {
    const newPerson: Person = {
      ...person,
      ...data,
      height: Number(data.height),
      mass: Number(data.mass)
    };
    onSubmit(newPerson);
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} onReset={resetHandler} onDelete={onDelete}>
      <TextField label="Name:" size="small" fullWidth variant="outlined" {...register("name", { required: true, maxLength: 64 })} error={!!errors.name} />
      <TextField label="Gender:" size="small" fullWidth variant="outlined" {...register("gender", { required: true, maxLength: 64 })} error={!!errors.gender} />
      <TextField label="Birth Year:" size="small" fullWidth variant="outlined" {...register("birthYear", { required: true, maxLength: 64 })} error={!!errors.birthYear} />
      <TextField label="Height:" size="small" fullWidth variant="outlined" type="number" {...register("height", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Mass:" size="small" fullWidth variant="outlined" type="number" {...register("mass", { required: true, min: 0 })} error={!!errors.height} />
      <TextField label="Eye Color:" size="small" fullWidth variant="outlined" {...register("eyeColor", { required: true, maxLength: 64 })} error={!!errors.eyeColor} />
      <TextField label="Hair Color:" size="small" fullWidth variant="outlined" {...register("hairColor", { required: true, maxLength: 64 })} error={!!errors.hairColor} />
      <TextField label="Skin Color:" size="small" fullWidth variant="outlined" {...register("skinColor", { required: true, maxLength: 64 })} error={!!errors.skinColor} />
    </Form>
  )
}
