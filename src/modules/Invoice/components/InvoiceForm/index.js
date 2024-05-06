import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import {  Autocomplete, Chip, FormControl, InputLabel} from '@mui/material';

import './InvoiceForm.css';

const bill_type = [
  {
    value: 'GST Bill',
    label: 'GST Bill',
  },
  {
    value: 'Quotation',
    label: 'Quotation',
  },
];

const payment_status = [
  {
    value: 'Full Payment',
    label: 'Full Payment',
  },
  {
    value: 'Partial Payment',
    label: 'Partial Payment',
  },
  {
    value: 'Advance Payment',
    label: 'Advance Payment',
  },

];

const payment_mode = [
  {
    value: 'CASH',
    label: 'Cash',
  },
  {
    value: 'CARD',
    label: 'Card',
  },
  {
    value: 'UPI',
    label: 'UPI',
  },
  {
    value: 'NEFT',
    label: 'NEFT/IMPS',
  },
];

const purity = [
  {
    value: '14K',
    label: '14K',
  },
  {
    value: '16K',
    label: '16K'
  },
  {
    value: '18K',
    label: '18K',
  },
  {
    value: '20K',
    label: '20K',
  },
  {
    value: '22K',
    label: '22K',
  },
  {
    value: '',
    label: '',
  },
];

const InvoiceForm = ({
  setValue,
  customers,
  register,
  onSubmit,
  productFields,
  handleSubmit,
  addProductField,
  removeProductField,
}) => {
  const [isGstEnabled, setIsGstEnabled] = useState(false);
  const [isPurityEnabled, setIsPurityEnabled] = useState(false);
  const [extraCustomerDetails, setextraCustomerDetails] = useState(false);

  const handleCustomerChange = (event, newCustomer) => {
    console.log(newCustomer,'newCustomer')
    if (newCustomer) { // Update form state only if a customer is selected
      setValue('customerName',newCustomer.name);
      setValue('phone', newCustomer.phone || ''); // Handle potential undefined phone
      setValue('address', `${newCustomer.mail_address_line_1 || ''}, ${newCustomer.mail_city || ''}`); // Handle potential undefined address fields
    } else { // Clear form state on deselect
      setValue('customerName', '');
      setValue('phone', '');
      setValue('address', '');
    }
  };

  return (
    <form className="invoiceForm" onSubmit={handleSubmit(onSubmit)}>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Bill Type"
          //defaultValue="GST"
          helperText="Please select Bill Type"
          onChange={(event) => {
            register('billType')
            setValue("billType", event.target.value)
          }}
        >
          
          {bill_type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>

      <FormControlLabel
          control={<Checkbox checked={isGstEnabled} onChange={(event) => setIsGstEnabled(event.target.checked)} />}
          label="Include GST"
          {...register(`isGstEnabled`)}
        />

      <FormControlLabel
          control={<Checkbox checked={isPurityEnabled} onChange={(event) => setIsPurityEnabled(event.target.checked)} />}
          label="Include Purity"
          {...register(`isPurityEnabled`)}
        /> 
      <Typography variant="h6" sx={{ mb: 2 }}>
        Customer Details
      </Typography>
      <div className="fieldRow">
        <Select
          shrink
          sx={{ width: '45%', mr: 2, mb: 2 }}
          name = 'Customer Name'
          label="Customer Name"
          {...register('customerName')}
          onChange={(event) => {
            register('customerName').onChange(event)
            

            const customerDetails = customers.find(({id}) =>  id === event.target.value)
            setValue("phone", customerDetails.phone)
            setValue("address", `${customerDetails.mail_address_line_1}, ${customerDetails.mail_city}`)
            setValue('customer', customerDetails.name)
          }}
        >
          <option value="">-- Select Customer --</option>
          {customers.map(({id, name}) => <MenuItem value={id}>{name}</MenuItem>)}
          
        </Select>
        
        {/* <FormControl sx={{ width: '45%', mr: 2, mb: 2 }}>
      <InputLabel htmlFor="customer-name">Customer Name</InputLabel>
      <Autocomplete
        //multiple
        freeSolo
        options={customers.map((customer) => customer.name)}
        value={register('customerName')} // Set initial value from form state
        onChange={handleCustomerChange} // Pass handleCustomerChange as a prop
        renderInput={(params) => (
          <TextField {...params} label="Customer Name" />
        )}
        renderTags={(customer, getTagProps) => (
          <Chip key={customer} label={customer} {...getTagProps({ index: 0 })} />
        )}
      />
    </FormControl> */}

        <TextField
          className="formField"
          InputLabelProps={{ shrink : true }}
          label="Customer Phone No"
          {...register('phone')}
        />
      </div>
      <div>
        <TextField
        sx={{ mr: 2, mb: 2 }}
          fullWidth
          InputLabelProps={{ shrink : true }}
          label="Customer Address"
          {...register('address')}
        />
      </div>
      <FormControlLabel
                control={<Checkbox checked={extraCustomerDetails} onChange={(event) => setextraCustomerDetails(event.target.checked)} />}
                label="Additional Details"
              />
          { extraCustomerDetails &&
          (<div  className="fieldRow">
            <TextField
              sx={{ mr: 2, mb: 2 }}
              fullWidth
              InputLabelProps={{ shrink : true }}
              label="Customer PAN"
              {...register('customerPan')}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink : true }}
              label="Customer GST"
              {...register('customerGst')}
            />
          </div>)
          }
      <Typography variant="h6" sx={{ my: 2 }}>
        Product Details
      </Typography>
      {productFields.map((productField, index) => {
        //console.log(productField, 'productField');
        return (
          
          <div key={productField.id}>
            <div className="productHeader">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Item {index + 1}
              </Typography>
              {index !== 0 && (
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon onClick={removeProductField} />
                </IconButton>
              )}
            </div>
            <div key={productField?.id} className="fieldRow">
              <TextField
                className="formField"
                sx={{ mr: 2, mb: 2 }}
                shrink
                label="Product Name"
                {...register(`products.${index}.productName.value`)}
              />
              <TextField
                className="formField"
                shrink
                label="HSN Code"
                {...register(`products.${index}.hsnCode.value`)}
              />
            </div>
            <div className="fieldRow">
              <TextField
                className="formField"
                sx={{ mr: 2, mb: 2 }}
                shrink
                label="Total Weight"
                {...register(`products.${index}.totalWeight.value`)}
              />
              <TextField
                className="formField"
                shrink
                label="Net Weight"
                {...register(`products.${index}.netWeight.value`)}
              />
            </div>
            <div className="fieldRow">
              <TextField
                className="formField"
                sx={{ mr: 2, mb: 2 }}
                shrink
                label="Rate Per Gram"
                {...register(`products.${index}.perGramRate.value`)}
              />
 
              <TextField className="formField"
                id="outlined-select-purity"
                //shrink
                select
                label="Purity"
                
                // helperText="Please select Payment Mode"
                onChange={(event) => {
                  
                  register(`products.${index}.purity.value`)
                  setValue(`products.${index}.purity.value`, event.target.value)
                }}
                >
                {purity.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

            </div>
            <div className="fieldRow">
              <TextField
                className="formField"
                sx={{ mr: 2, mb: 2 }}
                shrink
                label="Gold/Stone cost"
                {...register(`products.${index}.productCost.value`)}
              />
              <TextField
                className="formField"
                shrink
                label="Making Charge"
                {...register(`products.${index}.makingCharge.value`)}
              />
            </div>
            
            <div>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                shrink
                label="Total Cost"
                {...register(`products.${index}.totalCost.value`)}
              />
            </div>
          </div>
          
          
        );
      })}
      <Button
        sx={{ mb: 5, width: '25%' }}
        color="success"
        variant="contained"
        onClick={addProductField}
      >
        Add Product
      </Button>
       
      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment Details
      </Typography>
      <div>
        <TextField sx={{ mr: 2, mb: 2 }}
            id="outlined-select-currency"
            select
            label="Payment Mode"
            helperText="Please select Payment Mode"
            onChange={(event) => {
              register('paymentMode')
              setValue("paymentMode", event.target.value)
            }}
          >
          
          {payment_mode.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="outlined-select-currency"
            select
            label="Payment Status"
            helperText="Please select Payment Status"
            onChange={(event) => {
              register('paymentStatus')
              setValue("paymentStatus", event.target.value)
            }}
          >
          
          {payment_status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
              sx={{ mr: 2, mb: 2 }}
              fullWidth
              InputLabelProps={{ shrink : true }}
              label="Balance Pending"
              {...register('paymentPending')}
            />
      </div>
      <Button variant="contained" color="success" type="submit">
        Save Invoice
      </Button>
    </form>
  );
};

export default InvoiceForm;
