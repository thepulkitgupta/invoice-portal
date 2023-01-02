import { Collapse,Stack, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField,Typography} from '@mui/material';
import { format,sub } from 'date-fns'
import React, { useEffect, useState } from 'react';
export default function SearchAndDownload() {

    const [searchData, setSearchData]=useState({
        fromDate: {value:format(sub(new Date(),{days:1}),'yyyy-MM-dd')},
        toDate : {value:format(new Date(), 'yyyy-MM-dd')},
        searchTypeValue : {value:'Loyalty'},
        searchTextValue : {value:'', labelText: 'Search Text', isError:false, helperText:""},
        diplayPhoneHelperTextorNot:false, 
        displaySearchResultData:false
    });

    //Handle Changes on Date Filter, Seach Type and Search Text
   const handleChange = (event)=>{
       event.preventDefault();
       let flag=searchData.diplayPhoneHelperTextorNot;
       if(event.target.name==="searchTypeValue"){
           if(event.target.value==="Phone No")
            flag=true;
            else 
            flag=false;
       } 
       
       setSearchData(prevState=>({
            ...prevState,
            [event.target.name]:{
                ...prevState[event.target.name],
                value : event.target.value
            }, 
            diplayPhoneHelperTextorNot:flag
       }));
 }
    //Handle Form Submit and Validate Empty Text Field
    const handleSearchFormSubmit=(event)=>{
        event.preventDefault(); 
        console.log("request received for submit");

        if(searchData.searchTextValue.value===''){
            setSearchData({
                ...searchData,
               searchTextValue:{
                  ...searchData["searchTextValue"],
                  isError:true,
                  labelText:"Required Field",
            }  
            })}
        else{
            //Perform API Call or Submit Details to the Server
            setSearchData({
                ...searchData,
                searchTextValue:{
                  ...searchData["searchTextValue"],
                  isError:false,
                  labelText:"Search Text"    
             },
             displaySearchResultData:true
             })
        }
    }

    useEffect(()=>{
        console.log(searchData);
    })

//.........................................

    return (  
        <Stack direction='column' >
        <Typography variant='h4'>Search &amp; Download Invoices</Typography>
        <Typography variant='h6'>Tool to download e-Commerce, GoGreen Invoices</Typography>
        {/*Seller Country */}
        <Stack direction='row' marginTop={'20px'} alignItems='center'>
            <FormLabel sx={{width:'170px'}}>Date Filter&nbsp;:</FormLabel>
            <TextField size='small'  name='fromDate' type='date' value={searchData.fromDate.value} onChange={handleChange}></TextField>
            <Typography  ml={'30px'} mr={'30px'}>To</Typography>       
            <TextField size='small' name="toDate" type='date' value={searchData.toDate.value} onChange={handleChange}></TextField>
         
        </Stack>
      

        {/*Search Type */}
       <Stack direction='row' marginTop={'20px'} alignItems={"center"}>
        {/* Search Type Radio Button */}
        <FormControl sx={{marginBottom:'10px'}}>
                <Stack direction='row' alignItems={"center"}>
                    <FormLabel sx={{width:'170px'}}>Search Type&nbsp;:</FormLabel>
                    <RadioGroup row={true} name={"searchTypeValue"} value={searchData.searchTypeValue.value} onChange={handleChange}>    
                        <FormControlLabel value={"Email"} control={<Radio/>} label='Email'></FormControlLabel>
                        <FormControlLabel value={"Loyalty"} control={<Radio/>} label='Loyalty Card'></FormControlLabel>
                        <FormControlLabel value={"Phone No"} control={<Radio/>} label='Phone No'></FormControlLabel>
                        <FormControlLabel value={"Receipt No"} control={<Radio/>} label='Receipt No'></FormControlLabel>
                    </RadioGroup>
                </Stack>
        </FormControl>  
        </Stack>

        {/* Search Text */}
        <Stack marginTop={'20px'} marginBottom={'20px'} direction='row' component='form' onSubmit={handleSearchFormSubmit} alignItems="center">
            <FormLabel sx={{width:'170px'}}>Search Text&nbsp;:</FormLabel>
            <TextField size='small' name="searchTextValue" value={searchData.searchTextValue.value} onChange={handleChange} variant='outlined' error={searchData.searchTextValue.isError} label={searchData.searchTextValue.labelText} helperText={searchData.searchTextValue.helperText} ></TextField>
            <Button size='small' type="submit" variant="contained"  sx={{ marginLeft:'30px' }}>Search</Button>   
            <Collapse in={searchData.diplayPhoneHelperTextorNot} sx={{marginLeft:'20px'}}>
                <Typography variant='body1'>{"Phone search format >> 52xxxxxxxx (without 0 and without country prefix)"}</Typography>
            </Collapse>
        </Stack>      

        <Collapse in={searchData.displaySearchResultData}>
                <Typography variant='h6'>{"Search Result"}</Typography>
        </Collapse>
   </Stack>
    );
}

