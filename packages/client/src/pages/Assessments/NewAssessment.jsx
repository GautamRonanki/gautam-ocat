import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AssessmentService } from '../../services/AssessmentService';

const score = { v0: 0, v1: 1 };
function riskLevel(result) {
  switch (true) {
    case result >= 2 && result <= 3:
      return `Medium`;
    case result >= 4 && result <= 5:
      return `High`;
    case result >= 0 && result <= 1:
      return `Low`;
    default:
      return ``;
  }
}

export const NewAssessment = () => {
  const [ points, setPoints ] = useState(0);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  const onSubmit = async (resultvalue) => {

    const { q1, q2, q3, q4, q5 } = resultvalue;
    const total = parseInt(q1) +
    parseInt(q2) +
    parseInt(q3) +
    parseInt(q4) +
    parseInt(q5);
    // eslint-disable-next-line no-console
    console.log(total);
    setPoints(total);
    resultvalue.result = total;
    resultvalue.riskLevel = riskLevel(total);
    await AssessmentService.submit({ ...resultvalue, points });

  };

  const res1 = watch(`q1`);
  const res2 = watch(`q2`);
  const res3 = watch(`q3`);
  const res4 = watch(`q4`);
  const res5 = watch(`q5`);
  useEffect(() => {
    const total = parseInt(res1) +
    parseInt(res2) +
    parseInt(res3) +
    parseInt(res4) +
    parseInt(res5);
    setPoints(isNaN(total) ? 0 : total);

  }, [ res1, res2, res3, res4, res5 ]);

  // await AssessmentService.submit(data);
  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1><b>Cat Behavioral Instrument 🐾</b></h1>
    <hr />
    <h2>Cat Details</h2>
    <hr />
    <Form.Group controlId="name">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Cat Name"
        required
        {...register(`name`)}
      />
    </Form.Group>
    <br />
    <Form.Group controlId="dob">
      <Form.Label>Cat Date of Birth</Form.Label>
      <Form.Control type="date" {...register(`date`)} required />
    </Form.Group>
    <br />
    <Form.Group controlId="q1">
      <h2>Questions & Responses</h2>
      <hr />
      <Form.Label>1. Previous contact with the Cat Judicial System</Form.Label>
      <Form.Select {...register(`q1`)} required>
        <option value="">Select</option>
        <option value={score.v1}>No</option>
        <option value={score.v0}>Yes</option>
      </Form.Select>
    </Form.Group>
    <br />
    <Form.Group controlId="q2">
      <Form.Label>2. Physical altercations with other cats</Form.Label>
      <Form.Select {...register(`q2`)} required>
        <option value="">Select</option>
        <option value={score.v0}>0-3 altercations</option>
        <option value={score.v1}>3+ altercations</option>
      </Form.Select>
    </Form.Group>
    <br />
    <Form.Group controlId="q3">
      <Form.Label>3. Physical altercations with owner (scratching, biting, etc...)</Form.Label>
      <Form.Select {...register(`q3`)} required>
        <option value="">Select</option>
        <option value={score.v1}>10+ altercations</option>
        <option value={score.v0}>0-10 altercations</option>
      </Form.Select>
    </Form.Group>
    <br />
    <Form.Group controlId="q4">
      <Form.Label>4. Plays well with dogs</Form.Label>
      <Form.Select {...register(`q4`)} required>
        <option value="">Select</option>
        <option value={score.v1}>No</option>
        <option value={score.v0}>Yes</option>
      </Form.Select>
    </Form.Group>
    <br />
    <Form.Group controlId="q5">
      <Form.Label>5. Hisses at strangers</Form.Label>
      <Form.Select {...register(`q5`)} required>
        <option value="">Select</option>
        <option value={score.v1}>Yes</option>
        <option value={score.v0}>No</option>
      </Form.Select>
    </Form.Group>
    <br />
    <Form.Label>Risk Level: low[0-1], Medium[2-3], high[4-5]</Form.Label>
    <Form.Group>
      <br />
      <Button variant="primary" type="submit">SUBMIT →</Button><br /><br /><br />
    </Form.Group>
  </Form>;
};
