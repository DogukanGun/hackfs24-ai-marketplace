import lighthouse from '@lighthouse-web3/sdk'
import { LighthouseRes } from '../data/lighthouse.data'
import { getApiKey } from './getApiKey';

/*
// Sample response
{
  data: {
    Name: 'shikamaru',
    Hash: 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
    Size: '91'
  }
}
*/
const saveTextToLighthouse = async(text:any):Promise<LighthouseRes> => {
    const res = await getApiKey();
    const response = await lighthouse.uploadText(text, res.data.apiKey)
    return response.data as LighthouseRes
}

export default saveTextToLighthouse;