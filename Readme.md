![image](https://github.com/DogukanGun/hackfs24-ai-marketplace/assets/45531291/ec64baa6-1b63-4e31-8d97-c0beb1ecdbe4)# Nextown

A decentralized AI computation and storage platform allowing users to run AI models via LilyPad, encrypt results with their public key, and securely store outputs on lighthouse, accessible only by the user’s private key.

We made a marketplace to run AI models. First users subscribe to our channel to run pre-existing AI models or to be able to add new models. Then they select AI models from the UI, which are executed on the LilyPad decentralized compute network. The results are then encrypted using the user’s public key to ensure privacy via Lit Protocol and stored on the lighthouse. This setup ensures that only the user can decrypt and access the results using their private key. Our site is deployed on Fleek CDN and can be accessible via its ENS name which nextown.eth, or directly with is DNS name which is nextown.xyz.

## Technologies Used

- **Smart Contracts**: Solidity
- **Decentralized Compute**: LilyPad
- **Encryption**: Lit Protocol
- **Decentralized Storage**: Lighthouse Storage
- **Backend**: Node.js, Express.js
- **Frontend**: Next.js

## How it is made? 

The front end, built with React.js + Fleek template, allows users to select AI models and submit computation requests. These requests are sent to the backend, an Express.js server, which handles the execution of LilyPad CLI commands.
The backend captures the output from LilyPad, encrypts it using the user’s public key with Lit protocol, and stores the encrypted results on Lighthouse. The integration with Lighthouse ensures that data is stored in a decentralized manner.
Our website is hosted on Fleek and can be accessed via its ENS name which is nextown.eth. Can also be accessible via nextown.xyz as its DNS name. 

![image](https://github.com/DogukanGun/hackfs24-ai-marketplace/assets/45531291/bb793ed4-805b-4cd2-a1f4-a39ac5435af2)


## Some transactions made as proof

https://sepolia.etherscan.io/tx/0x6e58e25016643b6adf0de1860f15f09ff15fced78de1557c7ddf94cc7e2d3151

https://sepolia.etherscan.io/address/0x003b9e82bae69c98be749f63390bff246eb0a244#events

https://sepolia.etherscan.io/tx/0x6b54b23ae5097ad83afd1a6a5726d08abcd0c934edbfd9f3457e009a91821b23

![image](https://github.com/DogukanGun/hackfs24-ai-marketplace/assets/45531291/02997b76-b085-46b9-a24d-9c0a68e83d7d)

![image](https://github.com/DogukanGun/hackfs24-ai-marketplace/assets/45531291/ddbc06ad-1a29-499d-b3c5-c7e3a0aa3a93)
