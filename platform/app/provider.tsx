'use client'

import * as React from 'react'
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from 'wagmi'
import { config } from '../wagmi'

type ProvidersProps = Readonly<{
    children: React.ReactNode;
}>;

const queryClient = new QueryClient()

export function WagmiCustomProvider({ children }: ProvidersProps) {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])
    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <ConnectKitProvider theme="retro">
                {mounted && children}
            </ConnectKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
}