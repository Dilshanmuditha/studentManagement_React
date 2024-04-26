import React, { useState } from 'react';

function Module() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [expandedModule, setExpandedModule] = useState('');

  const courseOptions = [
    'Data Science',
    'Digital Marketing',
    'Project Management',
    'Business Analytics',
    'UX/UI Design'
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setExpandedModule('');
  };

  const dataScienceModules = [
    {
      name: 'Statistics',
      content: [
        { text: 'Descriptive statistics (mean, median, variance, etc.)', pdfLink: '/statistics.pdf' },
        { text: 'Inferential statistics (hypothesis testing, confidence intervals)', pdfLink: '/statistics.pdf' },
        { text: 'Probability distributions (normal, binomial, etc.)', pdfLink: '/statistics.pdf' }
      ]
    },
    {
      name: 'Programming and Tools',
      content: [
        { text: 'Python or R programming', pdfLink: '/programming.pdf' },
        { text: 'Data manipulation with pandas or dplyr', pdfLink: '/data_manipulation.pdf' },
        { text: 'Data visualization using matplotlib, seaborn, or ggplot2', pdfLink: '/data_visualization.pdf' }
      ]
    },
    {
      name: 'Machine Learning',
      content: [
        { text: 'Supervised learning (regression, classification)', pdfLink: '/programming.pdf' },
        { text: 'Unsupervised learning (clustering, dimensionality reduction)', pdfLink: '/data_manipulation.pdf' },
        { text: 'Model evaluation and selection', pdfLink: '/data_visualization.pdf' }
      ]
    },
    {
      name: 'Data Preprocessing',
      content: [
        { text: 'Data cleaning (handling missing values, outliers)', pdfLink: '/programming.pdf' },
        { text: 'Feature engineering (creating new features)', pdfLink: '/data_manipulation.pdf' },
        { text: 'Data scaling and normalization', pdfLink: '/data_visualization.pdf' }
      ]
    },
    {
      name: 'Big Data and Cloud Computing',
      content: [
        { text: 'Hadoop, Spark, or AWS', pdfLink: '/programming.pdf' },
        { text: 'Distributed computing for large datasets', pdfLink: '/data_manipulation.pdf' },
      ]
    },
    {
      name: 'Deep Learning',
      content: [
        { text: 'Neural networks, TensorFlow, or PyTorch', pdfLink: '/programming.pdf' },
        { text: 'Convolutional neural networks (CNNs) and recurrent neural networks (RNNs)', pdfLink: '/data_manipulation.pdf' },
      ]
    },
    {
      name: 'Business Acumen',
      content: [
        { text: 'Understanding domain-specific problems', pdfLink: '/programming.pdf' },
        { text: 'Communicating results to stakeholders', pdfLink: '/data_manipulation.pdf' },
      ]
    },
   
  ];


  const digitalMarketingModules = [
    {
      name: 'Introduction to Digital Marketing',
      content: [
        { text: 'Why Internet Marketing', pdfLink: '/Why Internet Marketing.pdf' },
        { text: 'Assignments', pdfLink: '/Assignments.pdf' }
      ]
    },
    
  ];

  const projectManagementModules = [
    {
      name: 'Introduction',
      content: [
        { text: 'Conception: ‘The journey begins’', pdfLink: '/What is a project?.pdf' },
        { text: 'The project environment: strategic planning', pdfLink: '/statistics.pdf' }
      ]
    },
    
    {
      name: 'Feasibility',
      content: [
        { text: 'The feasibility study', pdfLink: '/feasibility study.pdf' },
      ]
    },
   
  ];

  const businessAnalyticsModules = [
    {
      name: 'Introduction',
      content: [
        { text: 'Getting Started with Spreadsheet Modeling and Business Analytics', pdfLink: '/statistics.pdf' },
        { text: 'Harvesting Spreadsheet Data', pdfLink: '/statistics.pdf' },
        { text: 'Visualizing and Communicating Insights In Excel', pdfLink: '/statistics.pdf' }
      ]
    },
    {
      name: 'Making Predictions and Forecasts with Data',
      content: [
        { text: 'Using Prescriptive Analytics in Excel', pdfLink: '/programming.pdf' }
      ]
    },
   
  ];



  const handleModuleClick = (moduleName) => {
    if (expandedModule === moduleName) {
      setExpandedModule('');
    } else {
      setExpandedModule(moduleName);
    }
  };

  
  return (
    <div>
      <label htmlFor="course">Select course:</label>
      <select id="course" value={selectedCourse} onChange={handleCourseChange}>
        <option value="">--Select a course--</option>
        {courseOptions.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      {selectedCourse === 'Data Science' && (
        <div>
          <h2>Data Science Course Modules</h2>
          <ul>
            {dataScienceModules.map((module, index) => (
              <li key={index}>
                <h3 onClick={() => handleModuleClick(module.name)} style={{ cursor: 'pointer' }}>
                  {module.name}
                </h3>
                {expandedModule === module.name && (
                  <ul>
                    {module.content.map((item, subIndex) => (
                      <li key={subIndex}>
                        <div>{item.text}</div>
                        <div>
                          <a href={item.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

{selectedCourse === 'Digital Marketing' && (
        <div>
          <h2>Data Science Course Modules</h2>
          <ul>
            {digitalMarketingModules.map((module, index) => (
              <li key={index}>
                <h3 onClick={() => handleModuleClick(module.name)} style={{ cursor: 'pointer' }}>
                  {module.name}
                </h3>
                {expandedModule === module.name && (
                  <ul>
                    {module.content.map((item, subIndex) => (
                      <li key={subIndex}>
                        <div>{item.text}</div>
                        <div>
                          <a href={item.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Module;