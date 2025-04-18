import React from "react";
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

import { Outlet } from "react-router-dom";


export default function Layout(){

    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>  
        </>
    )
}