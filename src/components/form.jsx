import React, { Component } from 'react';
import Joi from 'joi-browser';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) {
      return null;
    }

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    this.doSubmit();
  };

  renderInput = (name, label, type, rest) => {
    const { data, errors } = this.state;
    const error = errors[name];

    return (
      <TextField
        {...rest}
        error={!!error}
        onChange={this.handleChange}
        value={data[name]}
        type={type}
        label={error || label}
        name={name}
        fullWidth
      />
    );
  };

  renderButton = (label, rest) => {
    return (
      <Button disabled={!!this.validate()} {...rest}>
        {label}
      </Button>
    );
  };
}

export default Form;