import React from 'react';
import { useLocation } from 'react-router-dom';

const SelectedProjectPage = () => {
  // Use the useLocation hook to get the state passed through the Link component
  const location = useLocation();
  const selectedProject = location.state?.selectedProject;

  if (!selectedProject) {
    return <div>No project selected</div>;
  }

  return (
    <div>
      <h2>Selected Project</h2>
      
    </div>
  );
};

export default SelectedProjectPage;
