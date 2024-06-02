import axios from 'axios'
import { ethers } from 'ethers'
import lighthouse from '@lighthouse-web3/sdk'
import { apiKeyResponse } from '@lighthouse-web3/sdk/dist/Lighthouse/getApiKey'

const signAuthMessage = async(verificationMessage:string) =>{
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!)
  const signedMessage = await signer.signMessage(verificationMessage)
  return(signedMessage)
}

export const getApiKey = async():Promise<apiKeyResponse> =>{
  const wallet = {
    publicKey: process.env.PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!
  }
  const verificationMessage = (
    await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
    )
  ).data as string
  const signedMessage = await signAuthMessage(verificationMessage)
  const response = await lighthouse.getApiKey(wallet.publicKey, signedMessage)
  console.log(response)
  return response
}