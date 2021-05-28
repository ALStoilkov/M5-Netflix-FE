import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import { withRouter } from "react-router";
import { EasybaseProvider, useEasybase } from "easybase-react";
class Registration extends Component {
  state = {
    formValid: false,
    inputs: {
      firstName: "",
      surName: "",
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      date: new Date(1909, 1, 17),
      id: "",
    },
  };

  saveUser = () => {};

  handleChange = (e) => {
    this.setState(
      (state) => {
        return {
          inputs: { ...this.state.inputs, [e.target.id]: e.target.value },
        };
      },
      () => {
        this.checkForm();
      }
    );
  };

  checkForm = () => {
    const check = [
      ...document
        .querySelector(".registrationForm")
        .querySelectorAll(".form-control"),
    ].every((element) => {
      return element.classList.contains("is-valid");
    });
    if (check) {
      this.setState((state) => {
        return { formValid: true, id: nanoid() };
      });
    }
  };

  submitForm = () => {
    this.saveUser();
    this.props.history.push(`/Register/${this.state.id}`);
  };

  render() {
    return (
      <Row className='mb-5 ml-2'>
        <Col md={6} className='mx-auto'>
          <h3>Register NOW with the ridiculous long form</h3>
          <Form
            onSubmit={(e) => e.preventDefault()}
            className='registrationForm'>
            <Form.Row>
              <Form.Group as={Col} controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='First name'
                  required
                  value={this.state.inputs.firstName}
                  className={
                    this.state.inputs.firstName.length >= 2
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='surName'>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Surname'
                  required
                  value={this.state.inputs.surName}
                  className={
                    this.state.inputs.surName.length >= 3
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  required
                  value={this.state.inputs.email}
                  className={
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                      this.state.inputs.email
                    )
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  required
                  value={this.state.inputs.password}
                  className={
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/.test(
                      this.state.inputs.password
                    )
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
                <Form.Text className='text-muted'>
                  Should contain at least 8 chars, 1 digit, 1 letter.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId='date'>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type='date'
                required
                value={this.state.inputs.date}
                className={
                  new Date(this.state.inputs.date).getFullYear() >= 1910
                    ? "is-valid"
                    : "is-invalid"
                }
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder='1234 Main St'
                required
                value={this.state.inputs.address}
                className={
                  this.state.inputs.address.length >= 2
                    ? "is-valid"
                    : "is-invalid"
                }
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder='Berlin'
                  required
                  value={this.state.inputs.city}
                  className={
                    this.state.inputs.city.length >= 3
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='zip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder='12443'
                  required
                  type='number'
                  value={this.state.inputs.zip}
                  className={
                    this.state.inputs.zip.length === 5
                      ? "is-valid"
                      : "is-invalid"
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Button
              type='submit'
              style={{ backgroundColor: "#E50914", border: "none" }}
              disabled={this.state.formValid ? false : true}
              onClick={() => this.submitForm()}>
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Registration);
