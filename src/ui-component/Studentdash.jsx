import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./styledash.css";

const Studentdash = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch projects from the backend when the component mounts
    axios.get('http://localhost:3000/project')
      .then(response => {
        console.log('Fetched data:', response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${email}/selected-project`);
      console.log('User details:', response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const registration = async () => {
    try {
      if (!selectedProject) {
        console.error('No project selected');
        return;
      }

      // Send registration request to the backend
      const response = await axios.post('http://localhost:3000/selectedproject', {
        projectId: selectedProject._id,
        title: selectedProject.title,
        email: email,
      });

      console.log('Registration successful:', response.data);

      // Fetch user details after successful registration
      fetchUserDetails();
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      // Close the modal whether registration was successful or not
      handleClose();
    }
  };

  const handleShow = (project) => {
    // Set the selected project and show the modal
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleClose = () => {
    // Close the modal and reset state
    setShowModal(false);
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter your registered email to continue</Modal.Title>
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
      <Link to={userDetails}>
        <Button variant="primary">Go to Selected Project Page</Button>
      </Link>

      {/* Display user details and selected project details */}
      {userDetails && (
        <div>
          <h3>User Details</h3>
          <p>Email: {userDetails.email}</p>
          <p>Selected Project: {userDetails.selectedProject.title}</p>
        </div>
      )}
    </div>
  );
};

export default Studentdash;
