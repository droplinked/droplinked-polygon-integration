import { record_merch } from "./src/polygonRecordProduct";
import { PolygonLogin } from "./src/metamaskLogin";
import { publish_request } from "./src/polygonPublishRequest";
import { approve_request } from "./src/polygonApproveRequest";
import { cancel_request } from "./src/polygonCancelRequest";
import { disapprove } from "./src/polygonDisapprove";
import { provider } from "./src/polygonConstants";
import { ethers } from "ethers";
import { getTransactionEvents } from "./src/polygonWeb3";

// let account_information = await PolygonLogin();
// let product_title = "test product";
// let discription = "test product description";
// let image_url = "https://i.imgur.com/removed.png";
// let price = 200; // It is actually 2 dollars (the price should be multiplied by 100)
// let amount = 2000;
// let comission = 1234; // It is actually 12.34% (the comission should be multiplied by 100)
// let tx_hash = await record_merch({
//     "type" : "t-shirt",
//     "size" : "large",
//     "color" : "red"
// } , account_information.address, product_title , discription, image_url, price, amount, comission);
// console.log(tx_hash);

// let producer_address = "0x89281F2dA10fB35c1Cf90954E1B3036C3EB3cc78";
// let token_id = 1;
// publish_request(account_information.address, producer_address, token_id);

// let request_id = 1;
// approve_request(account_information.address, request_id);

// cancel_request(account_information.address, 2);

// disapprove(account_information.address, 1);

console.log(await getTransactionEvents("0xd3a49c903b131080c66b1166993928dc575061b078f0a3d1397627929e5551f0"));