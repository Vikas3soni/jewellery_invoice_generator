import React,{useEffect} from 'react';
import { Typography } from '@mui/material'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./Products.css"

// Grand total calculation


const ProductDetails = ({ formData, setValue}) => {
  const discountValue = 0;
  const subTotal = formData.products.reduce((acc, product) => {
  const productCost = parseFloat(product.totalCost.value) || 0; // Convert to number or default to 0
    return acc + productCost;
  }, 0);
  const cgst  = formData?.isGstEnabled? parseFloat(Math.round(subTotal * (1.5 / 100))): 0; // assupmption - GST is 3%
  const sgst  = formData?.isGstEnabled? parseFloat(Math.round(subTotal * (1.5 / 100))): 0;
  const grandTotal = subTotal +sgst+ cgst  - discountValue;

  

  useEffect(() => {
    const calculatedGrandTotal = subTotal + sgst + cgst - discountValue;
    console.log(calculatedGrandTotal,'total') 
    setValue("discount",discountValue);
    setValue("gst",sgst+cgst);
    setValue("grandTotal",calculatedGrandTotal);
    return () => {
    
    };
  }, [subTotal, sgst, cgst, discountValue]);

  return (
    <div className='base' style={{ display: "flex", flexDirection: "column" }}>
    <TableContainer component={Paper} classes={{ root: 'tableContainer' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell classes={{ root: "colHeader"}} >Product Name</TableCell>
            <TableCell classes={{ root: "colHeader"}} align="right">
              HSIN Code
            </TableCell>
            <TableCell classes={{ root: "colHeader"}} align="right">
              Total Weight
            </TableCell>
            <TableCell classes={{ root: "colHeader"}} align="right">
              Net Weight
            </TableCell>
            <TableCell classes={{ root: "colHeader"}} align="right">
              Rate/Gram
            </TableCell>
            {formData.isPurityEnabled && (
            <TableCell classes={{ root: "colHeader"}} align="right">
              Purity
            </TableCell>
            )}
         
            <TableCell classes={{ root: "colHeader"}} align="right">
              Making Charge/Gram
            </TableCell>
            <TableCell classes={{ root: "colHeader"}} align="right">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(formData?.products ?? []).map(
            ({
              productName,
              hsnCode,
              totalWeight,
              netWeight,
              perGramRate,
              purity,
              productCost,
              makingCharge,
              totalCost,
            }) => {
              if (!productName?.value) {
                return null;
              }
              //const rowClass = index !== 0 ? 'withBorder' : '';
              return (
                
                <TableRow
                key={productName?.value}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  
                  <TableCell component="th" scope="row">
                    {productName?.value}
                  </TableCell>
                  <TableCell align="right">{hsnCode?.value}</TableCell>
                  <TableCell align="right">{totalWeight?.value}</TableCell>
                  <TableCell align="right">{netWeight?.value}</TableCell>
                  <TableCell align="right">{perGramRate?.value}</TableCell>
                  {formData.isPurityEnabled && (<TableCell align="right">{purity?.value}</TableCell> )}
               
                  <TableCell align="right">{makingCharge?.value}</TableCell>
                  <TableCell align="right">{totalCost?.value}</TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>

     {/* Added section for Discount, Grand Total, and Payment Mode */}
     <div className="summaryAndPayment">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Payment Mode:</TableCell>
              <TableCell align="right">{formData?.paymentMode}</TableCell>
            </TableRow>
            {formData.billType === 'GST Bill' && (
            <TableRow>
              <TableCell align="right">CGST</TableCell>
              <TableCell align="right">{cgst}</TableCell>
            </TableRow>
            )}
            {formData.billType === 'GST Bill' && (
            <TableRow>
              <TableCell align="right">SGST</TableCell>
              <TableCell align="right">{sgst}</TableCell>
            </TableRow>
            )}
            <TableRow>
              <TableCell align="right">Discount:</TableCell>
              <TableCell align="right">{discountValue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Grand Total:</TableCell>
              <TableCell align="right">{grandTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Balance Due:</TableCell>
              <TableCell align="right">{formData?.paymentPending}</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      
      </div>
  
    <div className="termsAndConditions">
    <Typography variant="body1" sx={{ minWidth: 650 , mt: 2 }}>
      Terms and Conditions:
    </Typography>
    <Typography variant="body2">
      {formData.invoice_tnc}    
    </Typography>
    </div>  
</div>
  );
};

export default ProductDetails;
