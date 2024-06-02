"use client"
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const CustomNavbar = () => {
    const pathname = usePathname()

    const isPublishModelHidden = useMemo(()=>{
        return pathname.includes("marketplace/create")
    },[pathname])
    return (
        <div className="navbar bg-gray-700 text-primary-content">
            <div className="flex-1">
                <a className="btn btn-ghost text-white text-header1">DeAI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    { !isPublishModelHidden && 
                    <li className="nline-block rounded-lg bg-indigo-500 px-8 mx-5 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"><Link href="/marketplace/create">Publish AI Model</Link></li> }
                    { isPublishModelHidden && 
                    <li className="nline-block rounded-lg bg-indigo-500 px-8 mx-5 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"><Link href="/marketplace">Marketplace</Link></li> }
                   
                    <li><ConnectKitButton showBalance/></li>
                </ul>
            </div>
        </div>
    )
}

export default CustomNavbar;