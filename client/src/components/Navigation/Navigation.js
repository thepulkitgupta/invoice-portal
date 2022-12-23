import React, { useState } from 'react';
import {Link as RouterLink} from "react-router-dom"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button,Box ,Stack, Typography} from '@mui/material';
import { Link } from '@mui/material';


//Staic Data for NavList 
const navList = {
    home : {
        name:"Home",
        linkto:'/',
        values : null
    },
    invoiceList : {
        name:"Invoice",
        linkto:"/invoice",
        values:[{linkName : "Detailed Vat Invoice", linkto:'/detailedinvoice'},{linkName : "Search & Download", linkto:'/searchdownload'} ,{linkName : "Vat Invoices - Previous Period", linkto:'/vatperiod'}]
    }, 
    ecommerceList : {
        name:"ECommerce",
        linkto:"/ecommerce",
        values:[{linkName : "Web Invoice", linkto:'/webinvoice'},{linkName : "Transaction Log", linkto:'/transacLog'} ,{linkName : "Trx to Urbantz", linkto:'/trxToUrbtz'},{linkName : "Re-Print Invoice to eCom Printer", linkto:'/reprintinvoice'}]
    },
    marketplaceList : {
        name:"Marketplace",
        linkto:"/marketplace",
        values:[{linkName : "Seller Comission", linkto:'/sellerComission'},{linkName : "Seller Invoices", linkto:'/sellerInvoices'}]
    }
 
}

//Create List Array to be displayed in Navigation Comonent
let finalNavbar = function(){
    let resultArray=[]
    for (let key in navList) {
      resultArray.push(GenerateNavItems(navList[key]));
    }
    return resultArray;
}

//Navigation Function to Generate full Nav Bar
export default function Navigation() {
    let data = finalNavbar();
    return (
        // Navigation Bar Stack  
        <Stack component="nav" direction="row"  sx={{
            backgroundColor:'white',
            flexWrap:'wrap', 
            justifyContent:'space-around'
        }}>
           {/* Carrefour Logo */}
           <Stack direction="row" alignItems={'center'}>
                <Link  component={RouterLink} to='/' underline='none'>
                    <img src="https://i.ibb.co/ynVxrTM/Carrefour-High-Res-New.png" height="40px" alt="carrefour_logo"/> 
                </Link>
                <Link  ml={'5px'} component={RouterLink} to='/' underline='none'>
                <Typography  variant='h6'>DPL Portal</Typography>
                </Link>
                
            </Stack>
            {/* Nav Options */}
            <Stack direction='row' sx={{
                    marginLeft:'30px',
                    flexGrow:1,
                }}>
                {data}
            </Stack >
            {/* User Details  */}
           <Stack justifyContent={"center"} > 
                <Button >Admin</Button>
           </Stack>
        </Stack>
    );
}

//Function to generate Lists Structure based on the data provided in NavList
function GenerateNavItems(obj){
    let [listFlag, setListFlag]=useState(false);
    // Generate List for Nav Item with no Dropdown Values
    if(obj.values==null)    
    return(
        <List key={obj.name}>
            <ListItem disablePadding sx={{marginRight:'10px'}}>
                    <ListItemText>
                        <Link component={RouterLink} to={obj.linkto} underline='none'>{obj.name}</Link>
                    </ListItemText>
            </ListItem>
        </List>
    )
    
    //Function to set style of Dropdown onMouseLeave and onMouseOver Event
    function getDesing(flag){
       let obj1={
            zIndex:100, 
            width:'max-content  ',
            position:'absolute', 
            backgroundColor:'white',
        }
        if(flag===true){ 
            return {
                ...obj1,
                display:"block"
            } 
        }
        else 
        return {
            ...obj1,
            display:'none'
        }
    
    }
   
    return(
        <List key={obj.name} onMouseOver={()=>setListFlag(true)} onMouseLeave={()=>setListFlag(false) } 
            sx={{
                marginRight:'10px',
                position:'relative',
            }} >
            {/* Nav Links */}
                <ListItem disablePadding>
                        <Link  underline='none'>
                            <ListItemText sx={{textDecoration:'none'}}>{obj.name}</ListItemText>
                        </Link>
                </ListItem>
            {/* Dropwdowns*/}
            <List sx={getDesing(listFlag)}>
                {obj.values.map( (val,index) => {
                 return  <ListItem key={val+index} sx={{padding:0,paddingLeft:"5px", paddingRight:"4px"}}>
                                <Link component={RouterLink} to={obj.linkto + val.linkto} underline='none'>  
                                    <ListItemText>{val.linkName}</ListItemText>
                                </Link>
                          </ListItem>
            })}
                 </List>
            </List>
        
)}



