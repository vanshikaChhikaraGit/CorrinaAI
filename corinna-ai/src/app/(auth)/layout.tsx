import Navbar from "@/components/navbar";
import { ReactNode } from "react";

const Layout = ({children}:{children:ReactNode})=>{
    return(
    <body className="">
    <Navbar></Navbar>
    {children}
    </body>)
}

export default Layout;