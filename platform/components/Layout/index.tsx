import { WagmiCustomProvider } from "@/app/provider";
import { Inter } from "next/font/google";
import { HTMLProps } from "react";
import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

const MainWrapper = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    return (
        <WagmiCustomProvider>
            <body className={inter.className}>
                <CustomNavbar/>
                {children}
                <Footer/>
            </body>
        </WagmiCustomProvider>
    )
}

export default MainWrapper;