import MetaMaskSDK from '@metamask/sdk';

const MMSDK = new MetaMaskSDK(options);
const ethereum = MMSDK.getProvider();
ethereum.request({ method: 'eth_requestAccounts', params: [] });

