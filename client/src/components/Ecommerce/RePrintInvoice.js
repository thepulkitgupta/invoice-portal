import { Stack, Button, FormLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
export default function RePrintInvoice() {

    const [invoiceNumberValue, setInvoiceNumberValue]=useState({
        value:'', 
        labelText: 'Consignment No.', 
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
                labelText: 'Consignment No.', 
        })
        }
    }

    return (  
        <Stack direction='column'>
           <Typography variant='h4'>Print Invoice</Typography>
           <Typography variant='h6'>Enter Consignment No. to reprint...</Typography>
           <Stack direction='row' mt={'30px'} alignItems={"center"}>
               <FormLabel sx={{marginRight:'30px'}}>Consignment No.&nbsp;:</FormLabel>
               <TextField name="invoiceNumberValue" id="rePrintinvoiceNumberValueId" variant="outlined" size="small" error={invoiceNumberValue.isError} label={invoiceNumberValue.labelText} value={invoiceNumberValue.value} onChange={handleinvoiceNumberValueChange}> </TextField>
               <Button sx={{marginLeft:'30px'}} size="small" variant='contained' onClick={handleClick}>Print Invoice</Button>
           </Stack>
       </Stack>
    );
}

