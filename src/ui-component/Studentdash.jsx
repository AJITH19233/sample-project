import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./styledash.css";
const Studentdash = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/project')
      .then(response => {
        console.log('Fetched data:', response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const registration = async () => {
    try {
      if (!selectedProject) {
        console.error('No project selected');
        return;
      }

      const response = await axios.post('http://localhost:3000/register', {
        projectId: selectedProject._id,
        title: selectedProject.title,
        email: email,
      });

      console.log('Registration successful:', response.data);

      // Optionally, you can handle success, e.g., show a success message, redirect, etc.
      // ...

    } catch (error) {
      console.error('Error during registration:', error);
      // Optionally, you can handle the error, e.g., show an error message, etc.
    } finally {
      // Close the modal whether registration was successful or not
      handleClose();
    }
  };

  const handleShow = (project) => {
    setSelectedProject(project);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProject(null);
    setEmail('');
  };

  return (
    <div>
      <h2>Projects</h2>
      <div className="card-container">
        {projects.map(project => (
          <div key={project._id} className="card">
            <img src={project.img} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Button onClick={() => handleShow(project)}>Go to Other Page</Button>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter your registered mail to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={registration}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* React Router Link to navigate to another page */}
      <Link to="/selected-project">
        <Button variant="primary">Go to Selected Project Page</Button>
      </Link>
    </div>
  );
};

export default Studentdash;
