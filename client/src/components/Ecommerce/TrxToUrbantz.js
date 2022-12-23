import { Stack, Button, FormLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
export default function TrxToUrbantz() {

    const [invoiceNumberValue, setInvoiceNumberValue]=useState({
        value:'', 
        labelText: 'Invoice No.', 
        isError:false
    })

    const handleinvoiceNumberValueChange=(event)=>{
        event.preventDefault();
        setInvoiceNumberValue({
            ...invoiceNumberValue, 
            value:event.target.value
        });
    }
    //Handle API Call via Clickinb Button
    const handleClick=(event)=>{
        event.preventDefault(); 
        if(invoiceNumberValue.value===''){
            setInvoiceNumberValue({
                ...invoiceNumberValue, 
                isError:true,
                labelText:"Required Field"
            })}
        else{
            //Perform API Call or Submit Details to the Server
            setInvoiceNumberValue({
                ...invoiceNumberValue, 
                isError:false,
                labelText: 'Invoice No.', 
        })
        }
    }

    return (  
        <Stack direction='column'>
           <Typography variant='h4'>Send Hybris Order to Urbantz</Typography>
           <Stack direction='row' mt={'30px'} alignItems={"center"}>
               <FormLabel sx={{marginRight:'30px'}}>Invoice No / Hyrbis Order No.&nbsp;:</FormLabel>
               <TextField name="invoiceNumberValue" id="trxToinvoiceNumberValueId" variant="outlined" size="small" error={invoiceNumberValue.isError} label={invoiceNumberValue.labelText} value={invoiceNumberValue.value} onChange={handleinvoiceNumberValueChange}> </TextField>
               <Button sx={{marginLeft:'30px'}} size="small" variant='contained' onClick={handleClick}>Send</Button>
           </Stack>
       </Stack>
    );
}

