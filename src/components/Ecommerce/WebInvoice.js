import { Collapse,Box,Stack, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, ButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function WebInvoice () {
    const [webInvoiceRadioValue,setWebInvoiceRadioValue]=useState("con_receipt")
    const [orderNumberValue, setOrderNumberValue]=useState({
        value:'', 
        labelText: 'Order No.', 
        isError:false
    });

    //Handle Radio Button Change for Choose Type
    const handleRadioChange=(event)=>{
        event.preventDefault();
        setWebInvoiceRadioValue(event.target.value);
        console.log("new value is ", webInvoiceRadioValue)
    }
    //Handle Input Value of Order Number
    const handleOrderNumberValueChange=(event)=>{
        event.preventDefault();
        setOrderNumberValue({
            ...orderNumberValue, 
            value:event.target.value
        });
    }
    //Handle API Call via Clickinb Button
    const handleClick=(event)=>{
        event.preventDefault(); 
        if(orderNumberValue.value===''){
            setOrderNumberValue({
                ...orderNumberValue, 
                isError:true,
                labelText:"Required Field"
            })}
        else{
            //Perform API Call or Submit Details to the Server
            setOrderNumberValue({
                ...orderNumberValue, 
                isError:false,
                labelText: 'Order No.', 
        })
        }
    }
    
    return (  
       <Stack direction='column'>
           <Typography variant='h4'>Ecommerce Invoice</Typography>
           <Typography variant='h6'>Tool to download e-Commerce, GoGreen Invoices</Typography>
           <FormControl>
            <Stack direction='row' marginTop={'20px'} alignItems={"center"}>
                <FormLabel sx={{marginRight:'30px'}}>Choose Type&nbsp;:</FormLabel>
                <RadioGroup name="webinvoice-radio-group" value={webInvoiceRadioValue} onChange={handleRadioChange}>
                    <FormControlLabel value={"con_receipt"} control={<Radio/>} label='Download by Consignment No. / Receipt No.'></FormControlLabel>
                    <FormControlLabel value={"order_no"} control={<Radio/>} label='Download by Order No.'></FormControlLabel>
                </RadioGroup>
            </Stack>
           </FormControl>
           <Stack direction='row' mt={'30px'} alignItems={"center"}>
               <FormLabel sx={{marginRight:'30px'}}>Order No.&nbsp;:</FormLabel>
               <TextField name="orderNumberValue" id="orderNumberValueId" variant="outlined" size="small" error={orderNumberValue.isError} label={orderNumberValue.labelText} value={orderNumberValue.value} onChange={handleOrderNumberValueChange}> </TextField>
               <Button sx={{marginLeft:'30px'}} size="small" variant='contained' onClick={handleClick}>Download Invoice</Button>
           </Stack>
       </Stack>
    );
}

;