import React, { useState, useEffect } from 'react';
import { Typography, Divider } from '@mui/material';
import axios from 'axios';
import ProductDetails from './components/Products';
import { useAuth0 } from '@auth0/auth0-react';
import './InvoicePreview.css';
  

const InvoicePreview = ({ formData, customers, returnData, setValue}) => {
  // const invoiceRef = useRef(null);

  // const generatePDF = useMemo(() => {
  //   const doc = new jsPDF();

  //   return () => {
  //     if (invoiceRef.current) {
  //       html2canvas(invoiceRef.current)
  //         .then((canvas) => {
  //   const invoiceElement = invoiceRef.current;
  //   html2canvas(invoiceElement)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png'); // Convert to image data
  //       doc.addImage(imgData, 'PNG', 0, 0);
  //       doc.save('invoice.pdf');
  //     });
  //   });
  //   } else {
  //     console.error('Invoice preview element not found for PDF generation.');
  //   }
  // };
  // }, []);

  const handleValuesReturned = (returnedValues) => {
    const { handleGrandTotal, handleDiscount, handleCGST, handleSGST } = returnedValues;
    // Use the functions here (e.g., setGrandTotal(handleGrandTotal()))
  }

  const [jewelerData, setJewelerData] = useState({
    firm_name: 'SunarMs JEWELLERS',
    gst: '09AAKFKJ8L1ZN',
    pan:'AAKFJ1879L'
  });

  const ip = 'dev.sunarms.co.in';
  const [billNumber, setBillNumber] = useState(null);
  const [cDate, setCDate] = useState(""); 
  const { user }= useAuth0();
  useEffect(() => {
    const fetchJewelerData = async () => {
      try {
        const response = await fetch(`https://${ip}/get_profile_by_id?jeweller_id=${user.nickname}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setJewelerData(data[0]);
          
        } else {
          console.warn('No jeweler data found in the API response.');
        }
      } catch (error) {
        console.error('Error fetching jeweler data:', error);
      }
    };

    fetchJewelerData();
  }, []);

  useEffect(() => {
    const { cDate, billNumber } = generateBillNumber();
    setBillNumber(billNumber);
    setCDate(cDate); 
    returnData(billNumber);
    return () => {
     
    };
  }, []); 

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function generateBillNumber() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const series = generateRandomString(4);
    const billNumber = `${year}${month}${day}-${series}`;
    const date = `${year}/${month}/${day}`;

    return {
      cDate: date,
      billNumber: billNumber
    };
  }
  const { customerGst, customerPan } = formData;
  const {name: customerName}  = (customers || []).find(({id}) =>  id === formData?.customerName) || {}
  formData.invoice_tnc = jewelerData.invoice_tnc
  return (
    
    <div className="invoicePreview">
      <Typography sx={{ textDecoration: 'underline' }} align="center">
        TAX INVOICE
      </Typography>
      <Typography variant="h4">{jewelerData.firm_name}</Typography>
      <Typography variant="h6">{jewelerData.address}</Typography>
      {formData.billType === 'GST Bill' && (
          <Typography variant="caption">
            <b>GSTIN:</b> {jewelerData.gst}
          </Typography>)}
          {formData.billType === 'GST Bill' &&
         ( <Typography sx={{ mb: 2 }} variant="caption">
            <b>PAN:</b> {jewelerData.pan}
          </Typography>)
      }
      <Divider orientation="horizontal" variant="middle" flexItem />
      <div className="customerDetails">
        <div>
          <Typography
            sx={{ textDecoration: 'underline', mb: 2 }}
            variant="body1"
          >
            <b>Customer Name & Address</b>
          </Typography>
          <Typography variant="body1">{customerName}</Typography>
          <Typography variant="body1">{formData?.address}</Typography>
          <Typography variant="body1">Phone: {formData?.phone}</Typography>       
          {formData?.customerGst && (
            <Typography variant="body1">GST: {customerGst}</Typography>
          )}
          {formData?.customerPan && (
            <Typography variant="body1">PAN: {customerPan}</Typography>
          )}
        </div>
        <div>
          <Typography sx={{ mb: 2 }} variant="body1">
            Date: {cDate}
          </Typography>
          <Typography sx={{ mb: 2 }} variant="body1">
            Bill no: {billNumber}
          </Typography>
        </div>
      </div>
      <Divider orientation="horizontal" variant="middle" flexItem />
      <ProductDetails formData={formData} setValue={setValue}/>
    </div>
    
  );
};

export default InvoicePreview;
