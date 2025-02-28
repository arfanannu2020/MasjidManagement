import React from 'react';
import axios from 'axios';

const DownloadButton = () => {
    const handleDownload = async () => {
        try {
          // Fetch data from the Spring Boot API
          const response = await axios.get('http://localhost:8080/generate-data');
          const data = response.data; // The data to be converted into PDF
    
          // Create a new jsPDF instance
          const doc = new jsPDF();
    
          // Add the fetched data as content to the PDF
          doc.text(data, 10, 10); // 10, 10 is the starting point for the text
    
          // Save the generated PDF with a specified filename
          doc.save('generated-file.pdf');
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};

export default DownloadButton;
