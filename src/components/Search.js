import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';

class Search extends Component {

  emptyItem = {
    firstName: '',
    lastName: '',
    pageNo: 0,
    count: 100

  };

  constructor(props) {
    super(props);
    this.state = { students: [], isLoading: false, item: this.emptyItem };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }


  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    this.setState({isLoading: false});
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }).then(response => response.json())
    .then(data => this.setState({students: data, isLoading: true}));
  }

  render() {

    const { students, isLoading } = this.state;
    const studentList = students.map(student => {

      return <tr key={student.id}>
        <td>{student.firstName}</td>
        <td>{student.lastName}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/students/" + student.id}>Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });


    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="text" name="firstName" id="firstName" onChange={this.handleChange} autoComplete="firstName" />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="text" name="lastName" id="lastName" />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Search</Button>
            </FormGroup>
          </Form>
          {isLoading ?
            <Table className="mt-4">
              <thead>
                <tr>
                  <th width="20%">First Name</th>
                  <th width="20%">Last Name</th>
                  <th width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentList}
              </tbody>
            </Table>
            : null
          }

        </Container>
      </div>
    );
  }
}

export default Search;