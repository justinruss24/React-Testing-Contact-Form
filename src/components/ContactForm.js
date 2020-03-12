import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();
  const [user, setUser] = useState([
    {
      firstName: "abc",
      lastName: "123",
      email: "",
      notes: "",
      id: 111
    }
  ]);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const handleChange = event => {
    setUser({...user, [event.target.name]: event.target.value });
  }

  const onSubmit = data => {
    setData(data);
    const newUser = {
      ...user,
      id: Date.now()
    };
    setUser([...user, newUser])
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="bill"
            onChange={event => handleChange(event)}
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
          id="lastName"
            name="lastName"
            placeholder="luo"
            onChange={event => handleChange(event)}
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input name="email" id="email" onChange={event => handleChange(event)} ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" onChange={event => handleChange(event)} ref={register({ required: false })} />
        </div>
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input type="submit" data-testid="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
