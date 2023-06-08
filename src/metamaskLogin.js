// This File Includes the Functionality to be used with Metamask Including
//      .MetaMask Login
//      .Is MetaMask Installed?

import { Buffer } from "buffer";

/**
 * 
 * @returns {boolean} true if Metamask is installed on the browser otherwise false
 */
export const isMetamaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

async function getAccounts(){
    return await ethereum.request({method : 'eth_accounts'});
}

export async function isWalletConnected(){
    let accounts = await getAccounts();
    return accounts && accounts[0] > 0;
}

async function requestAccounts(){
    try{
        return await ethereum.request({method : 'eth_requestAccounts'});
    }
    catch(error){
        console.error(error);
    }
}

export async function getBalance(address){
    return Number(await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }));
}

export async function MetaMaskLogin(){
    if(!isMetamaskInstalled()){
        return null;
    }
    if (!await isWalletConnected()){
        await requestAccounts();
    }
    let address = (await getAccounts())[0];
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    //await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{eth_accounts:{}}] });
    
    const siweMessage = `${window.location.host} wants you to sign in with your Ethereum account:\n${address}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${window.location.host}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`;
    let msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;
    console.log(msg);
    const signature = await window.ethereum.request({ method: 'personal_sign', params: [msg,address]});
    const publicKey = await window.ethereum.request({method : 'eth_getEncryptionPublicKey', params : [address]});
    
    return {
        address : address,
        isPolygon : Number(chainId) == 137 || Number(chainId) == 80001,
        isMainNet : Number(chainId) == 137,
        isTestnet : Number(chainId) == 80001,
        publicKey : publicKey,
        signature : signature
    };
}