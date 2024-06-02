"use client"
import {
    checkAndSignAuthMessage,
} from '@lit-protocol/auth-browser';
import axios from 'axios';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { useState } from 'react';


const Subscribe = () => {

    const [hash, setHash] = useState("")
    // Instantiate a LitNodeClient
    const litNodeClient = new LitNodeClient({
        litNetwork: "manzano",
        debug: true,
    });

    async function generateAuthSig() {
        await litNodeClient.connect();
        let nonce = await litNodeClient.getLatestBlockhash();
        try {
            const newAuthSig = await checkAndSignAuthMessage({
                chain: 'mumbai',
                walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
                nonce: nonce
            });
            const res = await axios.post("http://localhost:8000/lit/encrpt", {
                sign: newAuthSig
            })
            setHash(res.data as string)
        } catch (err) {
            console.error(err);
        }
    }
    return <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Publish Your Model</h2>
            <p className="block text-center mb-3 text-sm text-gray-500">Please connect ypur wallet before publish the model</p>
            <div className="mx-auto max-w-lg rounded-lg border">
                {hash !== "" && <div className='text-black'>
                    {hash}
                </div>}
                <div className="flex flex-col gap-4 p-4 md:p-8">
                    <button onClick={generateAuthSig} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Publish</button>
                </div>
            </div>
        </div>
    </div>
}

export default Subscribe;