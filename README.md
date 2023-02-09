# EMS - Concept of a web3 notarization service

This is the frontend to my [Web3Grad](https://web3grad.com/) final fullstack project, albeit slightly improved in terms of design. To give the website more of a look that I desired, I used ready-made frontend components from [chakra](https://chakra-ui.com) and tweaked them to my liking.

Functionality-wise, I made the switch from react.js to next.js, and event data from my smart contracts is now indexed with [The Graph](https://thegraph.com/en). All other major components stayed the same.

## What is the 'Evidence Management System'?

The Evidence Management System is a Web3 notary service. Users are able to share confidential documents with a designated counterpart. Using a special access token, it will only be possible for the user and the designated counterpart(s) to decrypt files shared on this platform. Document metadata is immutably stored on the blockchain while the files themselves are encrypted and stored in decentralized storage.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Issues and improvements

There are many additions I will still have to implement. The first one to be named in this respect is, of course, the implementation of the jury panel and jury selection process. There should be a curated list of vetted notaries but there could also be a community vetting and rating system of jurors in some kind of marketplace environment.

Another obvious issue is the current lack of documentation and guidance throughout the website. This service definitely needs some explaining, so there need to be step-by-step instructions as well as a help and FAQ section that will support users navigating through the site and using the service. In particular, a pricing section needs to be added to the nav bar.

The current website almost entirely lacks a feedback system, so there are currently hardly any status and progress messages displayed when the user interacts with the service. So upon case creation, a status toast should appear. Similarly, upon successfully uploading files to decentralized storage, the user should see some feedback about the success of the operation. And while decrypting files, users should see directly on the button that the process is currently running.

The connect button provides only rudimentary functionality, i.e. it only properly connects if MetaMask is switched to the Polygon network. A better connect functionality would automatically detect the network and request switching to the proper network if necessary. Currently, only injected providers are supported. Adding a WalletConnect provider would improve accessibility.

Currently, there are no file size and file type limits implemented for the document upload form. There should be some checking that only a certain type of files can be uploaded, like `.png`, `.pdf`, `.docx`, `.txt`, etc., as well as files do not exceed a size limit of, say, 20 MB.

To improve user friendliness, a search function for documents needs to be integrated. Search results, as well as displayed files and cases, should be paginated. User also should not have to remember the weird case ID, but should be able to give their cases names or other descriptive features that will be stored in and retrieved from a traditional database.

Component re-use needs to be optimized as well. The way files are displayed now using the `Files.jsx` component is less than ideal because it contains logic that should be moved upwards, so that the actual display and decypting functionality is decoupled from data fetching. This would enable component re-use in the `Involvements` component.

Using NextJS as my framework of choice, I should better make use of the server-side functionality provided. While most of the data fetching is dynamic and depends on user interactions, some of the logic could be placed on the server side.

From a design perspective, a lot of stuff still needs to be polished. Also, I would like to add a dark mode, and work a bit more on mobile optimization.
