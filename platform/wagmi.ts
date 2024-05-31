import { http, createConfig } from 'wagmi'
import { filecoin,filecoinCalibration } from 'wagmi/chains'

export const config = createConfig({
  chains: [filecoin, filecoinCalibration],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http()
  },
})