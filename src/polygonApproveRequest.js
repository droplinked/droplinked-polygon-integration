import {ethers} from 'ethers';
import {abi, contractAddress, provider} from './polygonConstants'
/**
 * 
 * @param {string} address of the 
 * @param {number} request_id 
 * @returns {string} transaction hash
 */
export let approve_request = async function(address,request_id){
    const signer = await provider.getSigner();
    console.log(signer.address);
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try{
        let tx = await contract.approve_request(request_id);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}
