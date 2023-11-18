import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import './Admin.css'

export default function Admin() {

    const [formDataList, setFormDataList] = useState([]);
      
    useEffect(() => {
        // Fetch form data from the server
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-printouts`);
                console.log(response.data);
                setFormDataList(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(formDataList);

    const openPdfInNewTab = (pdfBuffer) => {
        const uint8Array = new Uint8Array(pdfBuffer);
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);

        // Open PDF in a new tab
        window.open(pdfUrl, '_blank');

        //  // Create a download link
        //  const link = document.createElement('a');
        //  link.href = URL.createObjectURL(blob);
        //  link.download = 'document.pdf';
 
        //  // Append the link to the document
        //  document.body.appendChild(link);
 
        //  // Trigger a click on the link to start the download
        //  link.click();
 
        //  // Remove the link from the document
        //  document.body.removeChild(link);
    };

    return (
        <div className="admin-page">
            <h2>Form Data Display</h2>
            {formDataList.map((formData) => (
                <div key={formData.uuid} className='admin-container'>
                    <p>Display Name: {formData.display_name}</p>
                    <p>Total Pages: {formData.total_pages}</p>
                    <p>Copies: {formData.copies}</p>
                    <p>PDF:</p>
                    <button onClick={openPdfInNewTab(formData.pdf.data)}>Open file</button>
                </div>
            ))}
        </div>
    )
}