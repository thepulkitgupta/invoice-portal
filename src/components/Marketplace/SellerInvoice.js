import { Stack, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, InputLabel, Typography, Select, MenuItem } from '@mui/material';
import React, {  useState } from 'react';
export default function SellerInvoice() {

    const [periodValue, setPeriodValue] = useState({
        selectCountry : {value : "KSA"}, 
        sellerType : {value : "Filter by TRN"}, 
        period_month : {value:'MAR'},
        period_year : {value:'2021'}, 
        displayCodeOrNot : false,
        seller_code_trn: {value:'', labelText: 'Enter Code', isError:false}
    })

    const handlePeriodFormChange = (event)=>{
        event.preventDefault();
        let flag=periodValue.displayCodeOrNot;
        if(event.target.name==="sellerType"){
            if(event.target.value!=="All Sellers")
                 flag=true;
            else if(event.target.value==="All Sellers")
                 flag=false;
        }
        
        setPeriodValue({
            ...periodValue,
                [event.target.name]:{
                  ...periodValue[event.target.name],
                value : event.target.value
            }, 
            displayCodeOrNot: flag 
        })
    }
    //Handle Period Form Subit
    const handlePeriodFormSubmit=(event)=>{
        event.preventDefault(); 
        console.log("request received for submit");

        if(periodValue.displayCodeOrNot===true && periodValue.seller_code_trn.value===''){
            setPeriodValue({
                ...periodValue,
                seller_code_trn:{
                  ...periodValue["seller_code_trn"],
                  isError:true,
                  labelText:"Required Field",
            }  
            })}
        else{
            //Perform API Call or Submit Details to the Server
            setPeriodValue({
                ...periodValue,
                seller_code_trn:{
                  ...periodValue["seller_code_trn"],
                isError:false,
                labelText: 'Enter Code', 
             } })
        }
    }
//.........................................

    return (  
        <Stack direction='column' >
        <Typography variant='h4'>Seller Invoice</Typography>
        <Typography variant='h6'>Download for a Period</Typography>
        {/*Seller Country */}
        <FormControl>
            <Stack direction='row' marginTop={'20px'} alignItems={"center"}>
                <FormLabel sx={{width:'170px'}}>Select Country&nbsp;:</FormLabel>
                <RadioGroup row={true} name={"selectCountry"} value={ periodValue["selectCountry"].value} onChange={handlePeriodFormChange}>
                    <FormControlLabel value={"UAE"} control={<Radio/>} label='UAE'></FormControlLabel>
                    <FormControlLabel value={"KSA"} control={<Radio/>} label='KSA'></FormControlLabel>
                </RadioGroup>
            </Stack>
        </FormControl>

        {/*Seller Type */}
       <Stack direction='row' alignItems={"center"}>
        {/* Seller Type Radio Button */}
        <FormControl sx={{marginBottom:'10px'}}>
                <Stack direction='row' alignItems={"center"}>
                    <FormLabel sx={{width:'170px'}}>Choose Seller Type&nbsp;:</FormLabel>
                    <RadioGroup row={false} name={"sellerType"} value={periodValue["sellerType"].value} onChange={handlePeriodFormChange}>    
                        <FormControlLabel value={"All Sellers"} control={<Radio/>} label='All Sellers'></FormControlLabel>
                        <FormControlLabel value={"Filter by Seller Code"} control={<Radio/>} label='Filter by Seller Code'></FormControlLabel>
                        <FormControlLabel value={"Filter by TRN"} control={<Radio/>} label='Filter by TRN'></FormControlLabel>
                    </RadioGroup>
                </Stack>
        </FormControl>  
           <TextField size='small' name="seller_code_trn" value={periodValue.seller_code_trn.value} onChange={handlePeriodFormChange} variant='outlined' error={periodValue.seller_code_trn.isError} label={periodValue.seller_code_trn.labelText} ></TextField>
       </Stack>

        {/* Period  */}
        <Stack direction='row' component='form' onSubmit={handlePeriodFormSubmit} alignItems="center">
        {/* Period Label */}
        <FormLabel id="period_lable_sellerInvoice" sx={{width:'170px'}}>Period&nbsp;:</FormLabel>
        {/* Period Month */}
        <FormControl sx={{marginRight:'20px'}}>
            {/* Period Year */}    
                <InputLabel id="period-select-month">Month</InputLabel>
                <Select size="small" name={"period_month"} value={periodValue["period_month"].value} labelId="period-select-month" label="Month" onChange={handlePeriodFormChange}>
                {
                    ["JAN","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEPT","OCT","NOV","DEC"]
                    .map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)
                }
                </Select>
        </FormControl>
        {/* Period Year */}
        <FormControl>
                <InputLabel id="period-select-year">Year</InputLabel>
                <Select size='small' name="period_year" value={periodValue["period_year"].value} labelId="period-select-year" label="Year" onChange={handlePeriodFormChange}>
                {
                    ["2022","2021","2020"]
                    .map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)
                }
                </Select>
        </FormControl>
       <Button size='small' type="submit" variant="contained"  sx={{ marginLeft:'30px' }}>Download Invoice</Button>
        </Stack>
   </Stack>
    );
}


