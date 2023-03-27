import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { LoginService } from '../../services/LoginService';
export const Login = () => {

  const {
    formState: { errors },
    handleSubmit,
    register,
    // eslint-disable-next-line no-unused-vars
    watch,
  } = useForm();

  const onSubmit = async (resultvalue) => {

    await LoginService.submit({ ...resultvalue });
  };

  // await AssessmentService.submit(data);
  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Supervisor Login🐾</h1>

    <hr />
    <Form.Group controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"

        placeholder="Username"
        {...register(`name`)}

      />
    </Form.Group>
    <br />
    <Form.Group controlId="name">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"

        placeholder="Password"
        {...register(`name`)}

      />
      <br />
      <Button variant="danger" type="submit">SUBMIT →</Button>
    </Form.Group>

  </Form>;
};
