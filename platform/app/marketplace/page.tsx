"use client"
import Link from "next/link"
import { useAccount, useContractRead, useContractWrite, useSimulateContract, useSwitchAccount, useSwitchChain, useWriteContract } from "wagmi";
import factoryAbi from '@/public/factory.json'
import erc20 from '@/public/erc20.json'
import aisub from '@/public/aisub.json'
import { AIModel } from "./data/Model.data";
import { useEffect, useMemo, useState } from "react";
import { sepolia } from "viem/chains";


const MarketPlace = () => {

    const [index, setIndex] = useState(0)
    const account = useAccount()
    const { switchChain } = useSwitchChain()
    const [aiModels, setAiModels] = useState<AIModel[]>()
    const [predefinedOn, setPredefinedOn] = useState(false)
    const [selectedSubs, setSelectedSubs] = useState<`0x${string}`>("0x0")
    const { data, isError, isSuccess, refetch, isFetched } = useContractRead({
        address: '0x37848464f6E0AAA275B3F70d68127f318d9bD355',
        abi: factoryAbi,
        functionName: 'aiModels',
        args: [index],
    });
    const { data: simulateAllowance } = useSimulateContract({
        address: '0x003b9E82BaE69c98Be749F63390bfF246Eb0A244',
        abi: erc20,
        functionName: 'allowance',
        args: [account.address, selectedSubs],
    })
    const { data: subscribeOnChain } = useSimulateContract({
        address: selectedSubs,
        abi: aisub,
        functionName: 'subscribe',
        args:[]
    })
    const { writeContract } = useWriteContract()
    const isNextStepOn = useMemo(() => {
        return (!isError && isSuccess)
    }, [isError, isSuccess])

    useEffect(() => {
        if (account.chain != sepolia) {
            switchChain({ chainId: sepolia.id })
            return
        }
        if (!isFetched) {
            refetch()
            return
        }
        if (isSuccess) {
            const arrData = data as any[]
            const mappedData = {
                modelName: arrData[0],
                contractAddress: arrData[1],
                subscriptionFee: arrData[2],
                totalSubscribed: arrData[3],
                subscriptionContractAddress: arrData[4]
            } as AIModel
            if (aiModels === undefined) {
                setAiModels([mappedData])
            } else {
                setAiModels([...aiModels, mappedData])
            }
        }
        if (isNextStepOn) {
            setIndex(index + 1)
            console.log(index);
            refetch()
        }
    }, [isNextStepOn, account.chain, data, isFetched])

    const subscribe = (subscriptionContract: string) => {
        setSelectedSubs(subscriptionContract as `0x${string}`)
    }

    useEffect(() => {
        if (Boolean(simulateAllowance?.request)) {
            writeContract(simulateAllowance!.request)
        }
    }, [Boolean(simulateAllowance?.request)])

    useEffect(() => {
        if (Boolean(subscribeOnChain?.request)) {
            writeContract(subscribeOnChain!.request)
        }
    }, [Boolean(subscribeOnChain?.request)])

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Listed AI Models</h2>
                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
                </div>
                <div>
                    <input checked={predefinedOn}
                        onChange={() => setPredefinedOn((prev) => !prev)} type="checkbox" className="toggle toggle-primary mx-4" />
                    <span className="text-black">{predefinedOn ? "Predefined Models" : "User Marketplace"}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                    {predefinedOn &&
                        <div className="flex flex-col gap-3 rounded-lg border p-4 md:p-6">
                            <div>
                                <span className="block text-sm text-black font-bold md:text-base">Stable Diffusion</span>
                            </div>
                            <Link href="/marketplace/subscribe" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Subscribe</Link>
                        </div>}
                    {
                        !predefinedOn && aiModels && aiModels.map((element) => {
                            return (
                                <div key={`element-${element}`} className="flex flex-col gap-3 rounded-lg border p-4 md:p-6">
                                    <div>
                                        <span className="block text-sm text-black font-bold md:text-base">{element.modelName}</span>
                                        <span className="block text-sm text-gray-500">{element.contractAddress}</span>
                                    </div>
                                    <p className="text-gray-600">The subscription fee is {element.subscriptionFee} and must be paid with interacting with this contract {element.subscriptionContractAddress}</p>
                                    <button onClick={() => subscribe(element.subscriptionContractAddress)} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Subscribe</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>


    )
}

export default MarketPlace