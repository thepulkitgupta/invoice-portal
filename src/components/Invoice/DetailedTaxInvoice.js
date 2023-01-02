import { Collapse,Box,Stack, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, ButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

export default function DetailedTaxInvoice() {

  const [radioValue, setRadioValue]=useState("taxCreditNote_Refund");
  const [receiptValue, setReceiptValue]=useState("");
  const [formSubmitResponseValue, setFormSubmitResopnseValue]=useState(false);
  const [errorOrNot, setErrorData]=useState({
    isError:false,
    labelText:"BarCode"
  })
  const [formData,setFormData] = useState({
    mobile : {name:"Mobile" , value : '', isRequired: true, isError:false , labelText:"Mobile" }, 
    trnNo : {name:"Transaction Number" ,value : '', isRequired: false,labelText:"Transaction Number"},
    customerName : {name:"Customer Name" ,value : '', isRequired: true, isError:false,labelText:"Customer Name"},
    addressLine1 : {name:"Address Line 1" ,value : '', isRequired: true, isError:false,labelText:"Address Line 1"},
    addressLine2 :{name:"Address Line 2" ,value : '', isRequired: false,labelText:"Address Line 2"},
    city : {name:"City" ,value : '', isRequired: false,labelText:"City"}, 
    country : {name:"Country" ,value : '', isRequired: false, labelText:"Country"},
    phone : {name:"Phone" ,value : '', isRequired: false,labelText:"Phone"}, 
    email : {name:"Email" ,value : '', isRequired: false,labelText:"Email"},
  });

  //Handle Radio Button Change 
  const handleRadioChange = (event)=>{
    event.preventDefault();
      setRadioValue(event.target.value);
  }
  //Handle Reciept Value Change 
  const handleReceiptChange = (event)=>{
    event.preventDefault();
    setReceiptValue(event.target.value);
  }
  //Handle Clear Button Click
  const handleClearButtonClick = (event)=>{
    event.preventDefault();
      setReceiptValue("");
      setFormSubmitResopnseValue(false);
  }
  //Handle Second Form Value Changes 
  const handleFormValueChange = (event)=>{
    event.preventDefault();
    setFormData({
      ...formData, 
      [event.target.name]:{
        ...formData[event.target.name], 
        value : event.target.value
      }
    })
    console.log(formData);
  }
  //Handle Inital Form Submit
  const handleFormSubmit= (event) =>{  
    event.preventDefault();
    //Check if data is present or not
    if(receiptValue===""){ 
      setErrorData({
        isError:true, 
        labelText:"Required Field"
      })
    }
    //If value is not empty then normal flow
    else{
        setFormSubmitResopnseValue(true);
        setErrorData({
        isError:false,
        labelText:"BarCode"
      })
      // Initialising Form Data here will reset the state every time the initial form is updated 
      //This can later be changed to whether there is an invoice or not.
      setFormData({
        mobile : {name:"Mobile" , value : '', isRequired: true, isError:false , labelText:"Mobile" }, 
        trnNo : {name:"Transaction Number" ,value : '', isRequired: false,labelText:"Transaction Number"},
        customerName : {name:"Customer Name" ,value : '', isRequired: true, isError:false,labelText:"Customer Name"},
        addressLine1 : {name:"Address Line 1" ,value : '', isRequired: true, isError:false,labelText:"Address Line 1"},
        addressLine2 :{name:"Address Line 2" ,value : '', isRequired: false,labelText:"Address Line 2"},
        city : {name:"City" ,value : '', isRequired: false,labelText:"City"}, 
        country : {name:"Country" ,value : '', isRequired: false, labelText:"Country"},
        phone : {name:"Phone" ,value : '', isRequired: false,labelText:"Phone"}, 
        email : {name:"Email" ,value : '', isRequired: false,labelText:"Email"},
      })
  }}
  //Handle Invoice To From Submit
  const handleInvoiceToFormSubmit= (event) =>{  
    event.preventDefault();
    for(let x in formData){
      if(formData[x].value==='' && formData[x].isRequired===true){ 
        setFormData(prevState => 
          ({...prevState, 
            [x]:{
              ...prevState[x], 
              isError:true,
              labelText:"Required Field"
            }})
      )
    }
    else if(formData[x].value!=='' && formData[x].isRequired===true){ 
      setFormData(prevState => 
        ({...prevState, 
          [x]:{
            ...prevState[x], 
            isError:false,
            labelText:prevState[x].name
          }})
    )
  }}
  console.log("second form submitted")
    }
  
  return (  
    <Stack direction='column'>
    <Typography variant='h4'>Detailed Tax Invoice</Typography>
        <Stack direction='column' component='form' onSubmit={handleFormSubmit} >
          {/* Transaction Type */}
          <FormControl>
            <Stack direction='row' alignItems={"center"}>
                <FormLabel id="detailed_tax_invoice_label" sx={{marginRight:'30px'}}>Transaction Type&nbsp;:</FormLabel>
                <RadioGroup name="taxInvoice-radio-group" value={radioValue} onChange={handleRadioChange} >
                  <FormControlLabel value={"taxInvoice"} control={<Radio/>} label="Tax Invoice" />
                  <FormControlLabel value={"taxCreditNote_Refund"} control={<Radio/>} label="Tax Credit Note / Refund" />
                </RadioGroup>
            </Stack>
          </FormControl> 
          {/* Receipt Value */}
            <Stack direction='row' marginTop={"20px"} alignItems="center"> 
            <FormLabel id="receipt_barcode" sx={{ marginRight:'30px'}} >Receipt Barcode&nbsp;:</FormLabel>
              <TextField value={receiptValue} onChange={handleReceiptChange} id="receipt_inputValue" variant='outlined' size="small" error={errorOrNot.isError} label={errorOrNot.labelText}></TextField>
              {/* Find and Clear Button */}
                <Button size='small' type="submit" variant="contained"  sx={{marginLeft:"30px", marginRight:"30px"}}>Find</Button>
                <Button size='small' variant="contained" onClick={handleClearButtonClick}>Clear</Button>
            </Stack>
        </Stack>
        {/* Invoice To Form */}
        <Collapse sx={{marginTop:'30px'}} in={formSubmitResponseValue} >
          <Stack direction='column'> 
            <Typography variant='h4'>Invoice To</Typography>
            <Stack direction='column' component='form' onSubmit={handleInvoiceToFormSubmit}>
             {
               Object.keys(formData).map((x)=>{
                 return <Stack key={x} direction="row" mt={'10px'} alignItems="center">
                 <FormLabel  sx={{display:'flex', width:"170px"}}>{formData[x].name}&nbsp;:</FormLabel>
                 <TextField  name={x} value={formData[x].value} onChange={handleFormValueChange} variant='outlined' size='small' error={formData[x].isError} label={formData[x].labelText}></TextField>  
                 </Stack>
               })
              }
          <Box><Button size='small' type="submit" variant="contained" sx={{marginTop:'10px'}}>Submit</Button></Box>
            </Stack>
          </Stack>
        </Collapse>
    </Stack>
  );
}
