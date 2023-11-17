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

    return (
        <div>
            <h2>Form Data Display</h2>
            {formDataList.map((formData) => (
                <div key={formData.uuid}>
                    <p>Display Name: {formData.display_name}</p>
                    <p>Total Pages: {formData.total_pages}</p>
                    <p>Copies: {formData.copies}</p>
                    <p>PDF:</p>
                    <div >
                        <a href={`data:application/pdf;base64,${formData.pdf.data.toString('base64')}`} download={`myfile.pdf`}>
                            Download PDF
                        </a>
                    </div>
                    <button onClick={() => PdfViewer(formData.pdf.data.toString('base64'))}>
                        Open PDF in New Tab
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    )
}