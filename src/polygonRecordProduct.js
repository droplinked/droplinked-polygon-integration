import {NFTStorage} from "nft.storage";
import {ethers} from 'ethers';
import {abi, contractAddress, provider} from './polygonConstants'
const client = new NFTStorage({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ1MjMzMDAzNDY0YzcyNkNhY2QyOEIyMTkyYWFBNDdhMDg2MmJmQzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTE3NzYwNzI1NywibmFtZSI6ImRyb3BsaW5rZWRfTkZUIn0.B44NWDZ7GAORBwXB36hLEw3VuWG8tOYRl8g6QNOUv-Q" });
async function uploadToIPFS(metadata) {
    if (typeof(metadata) == typeof({}) || typeof(metadata) == typeof([])){
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash;
}

export async function record_merch(sku_properties, address, product_title, discription, image_url , price , amount, comission){
    const signer = await provider.getSigner();
    console.log(signer.address);
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let metadata = {
        "name" : product_title,
        "description" : discription,
        "image" : image_url,
        "properties" : sku_properties
    }
    let ipfs_hash = await uploadToIPFS(metadata);
    try{
    let tx = await contract.mint(`ipfs://${ipfs_hash}`,price,comission, amount);
    return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}