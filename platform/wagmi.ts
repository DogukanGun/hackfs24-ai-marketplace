import { http, createConfig } from 'wagmi'
import { filecoin,filecoinCalibration, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [filecoin, filecoinCalibration,sepolia],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
    [sepolia.id]:http()
  },
})