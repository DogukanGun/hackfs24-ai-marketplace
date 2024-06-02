import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { Request, Response, NextFunction } from "express"
import { AuthSig } from "../data/litSign";
import { LitAccessControlConditionResource, LitAbility } from '@lit-protocol/auth-helpers';
import { ethers } from "ethers";
import executeLilypad from "../utils/lilypad";
import saveTextToLighthouse from "../utils/saveTextToLighthouse";

export const litEncrpt = async (req: Request, res: Response, next: NextFunction) => {
  const litNodeClient = new LitNodeClient({
    litNetwork: "manzano",
  });
  const authSign: AuthSig = req.body.sign
  await litNodeClient.connect();
  const resFromLilypad = executeLilypad(req.body.message)
  const litActionCode = `
  const go = async () => {  
    const sigShare = await LitActions.signEcdsa({ ${resFromLilypad}, publicKey , sigName });
  };
  go();
  `;
  // Create the Lit Resource keyed by `someResource`
  const litResource = new LitAccessControlConditionResource('*');
  const ethersWallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  try {
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
  const lighhouseRes = await saveTextToLighthouse(signatures)
  res.send(lighhouseRes.Hash).status(200)
  } catch (error) {
    res.send("QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8").status(200)
  }
  
}
