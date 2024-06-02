"use client"
import { useState } from "react"
import factoryAbi from '@/public/factory.json'
import { useWriteContract, useSimulateContract } from 'wagmi'


const CreateAIModel = () => {

    const [image, setImage] = useState("")
    const [model, setModel] = useState("")
    const [subscriptionFee, setSubscriptionFee] = useState("")
    const [erc20, setErc20] = useState("")
    const { data } = useSimulateContract({
        address: '0x37848464f6E0AAA275B3F70d68127f318d9bD355',
        abi: factoryAbi,
        functionName: 'deployModel',
        args: [image, model, Number(subscriptionFee), erc20],
    })
    const { writeContract } = useWriteContract()

    const createAIModel = () => {
        if(Boolean(data?.request)){
            writeContract(data!.request)
        }
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Publish Your Model</h2>
                <p className="block text-center mb-3 text-sm text-gray-500">Please connect ypur wallet before publish the model</p>
                <div className="mx-auto max-w-lg rounded-lg border">
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div>
                            <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Image Name</label>
                            <input value={image} onChange={(event) => setImage(event.target.value)} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Model Name</label>
                            <input value={model} onChange={(event) => setModel(event.target.value)} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Subscription Price</label>
                            <input value={subscriptionFee} onChange={(event) => setSubscriptionFee(event.target.value)} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">ERC20 Token Address (Payment Currency)</label>
                            <input value={erc20} onChange={(event) => setErc20(event.target.value)} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <button onClick={createAIModel} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Publish</button>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreateAIModel