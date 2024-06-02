# Nextown

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
