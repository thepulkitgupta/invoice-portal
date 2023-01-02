import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { Box,Stack } from '@mui/material';
import { Typography } from '@mui/material';
//Component Imports
import Navigation from './components/Navigation/Navigation'
import Home from './components/Home/Home'
//Invoice Components
import DetailedTaxInvoice from './components/Invoice/DetailedTaxInvoice';
import SearchAndDownload from './components/Invoice/SearchAndDownload';
import VatProcessPeriod from './components/Invoice/VatProcessPeriod';
//ECommerce Components
import WebInvoice from './components/Ecommerce/WebInvoice';
import RePrintInvoice from './components/Ecommerce/RePrintInvoice'
import TrxToUrbantz from './components/Ecommerce/TrxToUrbantz';
import TransactionLog from './components/Ecommerce/TransactionLog';
//Marketplace Components
import SellerComission from './components/Marketplace/SellerComission'
import SellerInvoice from './components/Marketplace/SellerInvoice'

import NoMatch from './components/NoMatch'



export default function App() {
  return (
    <Box sx={{
      height: '100vh',
      display:'flex',
      flexDirection: 'column',
      backgroundColor:'white',
      }}>
{/* Header Section  */}
    <Box pl="10vw" pr="10vw" component="header" sx={{ backgroundColor:'white',}}>
        <Navigation/>
    </Box>
{/* Main Section  */}
    <Box mt="10px" pl="10vw" pr="10vw"  component="main" flexGrow="0.95" >
      
      <Routes>
              <Route index element={<Home/>}></Route>
              {/* Invoice Section  */}
              <Route path="/invoice">
                  <Route path="detailedinvoice" element={<DetailedTaxInvoice/>}></Route>
                  <Route path="searchdownload" element={<SearchAndDownload/>}></Route>
                  <Route path="vatperiod" element={<VatProcessPeriod/>}></Route>
              </Route>
                  
              {/* Marketplace Section */}
              <Route path="/marketplace" >
                   <Route path="sellerComission" element={<SellerComission/>}></Route>
                   <Route path="sellerInvoices" element={<SellerInvoice/>}></Route>
              </Route>
                 
              {/* Ecommerce Section */}
              <Route path="/ecommerce" >
                  <Route path="webinvoice" element={<WebInvoice/>} ></Route>
                  <Route path="transacLog" element={<TransactionLog/>}></Route>
                  <Route path="trxToUrbtz" element={<TrxToUrbantz/>} ></Route>
                  <Route path="reprintinvoice" element={<RePrintInvoice/>}></Route>
              </Route>
              <Route path="*" element={<NoMatch />} />    
      </Routes>   
    </Box>  
{/* Footer Section */}
      <Stack direction='row' justifyContent='center'>
         <Typography variant='body2'> © 2022 - Carrefour</Typography>
      </Stack>

    </Box>

  );
}


//find a way to fix the list elements in the navbar 

