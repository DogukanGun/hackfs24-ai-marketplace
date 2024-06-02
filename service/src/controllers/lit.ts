import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { Request, Response, NextFunction } from "express"
import { AuthSig } from "../data/litSign";
import { LitAccessControlConditionResource, LitAbility } from '@lit-protocol/auth-helpers';
import { ethers } from "ethers";

export const litEncrpt = async (req: Request, res: Response, next: NextFunction) => {
  const litNodeClient = new LitNodeClient({
    litNetwork: "manzano",
  });
  const authSign: AuthSig = req.body.sign
  await litNodeClient.connect();
  //TODO Cem your code should be placed here
  const litActionCode = `
  const go = async () => {  
    const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
    const resp = await fetch(url).then((response) => response.json());
    const temp = resp.properties.periods[0].temperature;
   
    
    // this requests a signature share from the Lit Node
    // the signature share will be automatically returned in the HTTP response from the node
    // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
    const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
  };
  
  go();
  `;
  // Create the Lit Resource keyed by `someResource`
  const litResource = new LitAccessControlConditionResource('*');
  const ethersWallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const { capacityDelegationAuthSig } =
    await litNodeClient.createCapacityDelegationAuthSig({
      uses: '1',
      dAppOwnerWallet: ethersWallet,
      delegateeAddresses: [ethersWallet.address],
    });
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: "ethereum",
    resourceAbilityRequests: [
      {
        resource: litResource,
        ability: LitAbility.AccessControlConditionDecryption
      }
    ],
    capacityDelegationAuthSig,  // here is where we add the delegation to our session request
  });
  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs: sessionSigs,
    jsParams: {
      authSig: authSign,
      chain: "ethereum",
    },
  });
  console.log("signatures: ", signatures);

  res.sendStatus(200)
}
