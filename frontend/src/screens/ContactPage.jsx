import React, { useRef, useState } from "react";
import {Form, Button} from "react-bootstrap";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const ContactPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    emailjs.sendForm('service_5i0nwwh', 'template_bmc6r7k', form.current,
      {
        publicKey: 'hk70Rcy-_p74TUEfo',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSubject("")
          setMessage("")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      )
  }

  return (
    <>
      <Form ref={form} onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" value="send" variant="primary">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ContactPage;