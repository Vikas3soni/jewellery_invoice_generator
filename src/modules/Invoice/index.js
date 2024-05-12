import React, {useEffect, useState} from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import axios from 'axios';
import './Invoice.css';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { Alert, AlertTitle } from '@mui/material';

const Invoice = () => {
  const ip = 'dev.sunarms.co.in';
  const [customers, setCustomers] = useState([])
  const [returnedValue, setReturnedValue] = useState(null);
  const { user }= useAuth0();
  const [pdfUrl, setPdfUrl] = useState(null);
  const { watch, control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      products: [
          {
            productName: {
              value: '',
            },
            hsnCode: {
              value: '',
            },
            totalWeight: {
              value: '',
            },
            netWeight: {
              value: '',
            },
            perGramRate: {
              value: '',
            },
            purity: {
              value: '',
            },
            productCost: {
              value: '',
            },
            makingCharge: {
              value: '',
            },
            totalCost: {
              value: '',
            } 
          
          },
      ],
      bill_number: '',
      jeweller_id: `${user.nickname}`,
      invoice_tnc: '',
      grandTotal:0, 
      discount: 0,
      gst:''
    },
  });

  const {
    fields: productFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'products',
  });

  const formData = watch();

  useEffect( () => {
    
    const fetchJewelerData = async () => {
      try {
        const response = await fetch(`https://${ip}/list_customers?jeweller_id=${user.nickname}`);
        if (response.ok) {
          const customersData = await response.json();
          setCustomers(customersData);
          console.log(customersData)
        } else {
          console.error('Failed to fetch customers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching customers:', error.message);
      }
    };

    fetchJewelerData(); 
  }, [])
  
  console.log(formData, 'formData');

  const handleReturnedValue = (value) => {
      // Do something with the returned value
      console.log("bill value:", value);
      setReturnedValue(value);
  };

  const addProductField = () => {
    append({
      productName: '',
      hsnCode: '',
      totalWeight: '',
      netWeight: '',
      perGramRate: '',
      purity: '',
      productCost: '',
      makingCharge: '',
      totalCost: '',
    });
  };

  const removeProductField = remove


  // const onFormSubmit = async (formData) => {
  //   try {
  //     formData.bill_number = returnedValue;
  //     const response = await axios.post('http://localhost:5000/save_invoice', formData);
  //     console.log('Invoice data saved successfully:', response.data);
  //     console.log(formData ,'formvikas')
      
  //   } catch (error) {
  //     console.error('Error saving invoice data:', error.message);
  //   }
  // };

  const onFormSubmit = async (formData) => {
    try {
      // Prompt for confirmation before saving
      const confirmSave = window.confirm('Are you sure you want to save this invoice?');
  
      if (confirmSave) {
        formData.bill_number = returnedValue;
  
        // Prompt for locking confirmation (optional)
        const lockInvoice = window.confirm('Do you want to lock this invoice after saving?');
  
        formData.lock_status = lockInvoice ? 'locked' : 'unlocked'; // Set lock status based on confirmation
  
        const response = await axios.post(`https://${ip}/save_invoice`, formData);
        console.log('Invoice data saved successfully:', response.data);
        console.log(formData, 'formvikas');
      } else {
        // Handle user canceling save
        console.log('Invoice save canceled.');
      }
    } catch (error) {
      console.error('Error saving invoice data:', error.message);
      // Optionally display an error alert using Material-UI Alert:
      <Alert severity="error">
        <AlertTitle>Error!</AlertTitle>
        An error occurred while saving the invoice. Please try again later.
      </Alert>
    }
  };


  const generatePDF = async () => {
    const invoiceRef = document.getElementById('invoicePreview');

    if (invoiceRef) {
      const doc = new jsPDF();
      const scale = 0.8;
      html2canvas(invoiceRef, { scale })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 6, 3);
          doc.save(`invoice_bill_${formData.customer}_${formData.phone}.pdf`);
          const savedUrl = 'path/to/your/saved/pdf.pdf'; 
          setPdfUrl(savedUrl);
          alert('Hope you have saved the invoice, If not please save invoice.');
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('Invoice preview element not found for PDF generation.');
    }
  };

  const shareOnWhatsApp = async () => {
    await generatePDF();
    if (pdfUrl) {
      // Leverage deep linking to open WhatsApp Web with pre-filled message
      const encodedMessage = encodeURIComponent(`Hello ${formData.customer}, I am sharing Bill invoice with you. Please check it out.\nThanks`);
      const whatsAppUrl = `https://web.whatsapp.com/send?text=${encodedMessage}&phone=+${formData.phone}&source=&data=`; // Replace with user's number
      window.open(whatsAppUrl, '_blank'); // Open link in new tab
    } else {
      alert('Please download the PDF before sharing on WhatsApp.');
    }
  };

  
  const handlePrint = () => {
    window.print();
  };
  

  return (
    <div id="root" className="root">
      <div>
        <InvoiceForm className='form'
        setValue={setValue}
        customers={customers}
        register={register}
        productFields={productFields}
        addProductField={addProductField}
        onSubmit={onFormSubmit}
        handleSubmit={handleSubmit}
        removeProductField={removeProductField}
        />
        <div className='option'>
          <button 
          variant="contained" color="success" type="submit" onClick={handlePrint}>Print</button>
          <button sx={{ mr: 2, mb: 2 }}
          variant="contained" color="success" type="submit" onClick={generatePDF}>Download</button>
          <button onClick={shareOnWhatsApp}>Share/WhatsApp</button>
        </div>
      </div>

      <div id="invoicePreview" className='preview'>
        <InvoicePreview customers={customers} control={control} formData={formData} setValue={setValue}
        returnData={handleReturnedValue}/>
      </div>
      
    </div>
    
  );
};

export default Invoice;
