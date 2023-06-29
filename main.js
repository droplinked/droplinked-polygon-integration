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

/*              RECORD PRODUCT EXAMPLE      */
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




/*              PUBLISH REQUEST EXAMPLE      */
// let producer_address = "0x89281F2dA10fB35c1Cf90954E1B3036C3EB3cc78";
// let token_id = 1;
// publish_request(account_information.address, producer_address, token_id);



/*              APPROVE REQUEST EXAMPLE      */
// let request_id = 1;
// approve_request(account_information.address, request_id);



/*              CANCEL REQUEST EXAMPLE      */
// cancel_request(account_information.address, 2);



/*              DISAPPROVE EXAMPLE      */
// disapprove(account_information.address, 1);


/*              GET TRANSACTION EVENTS EXAMPLE      */
console.log(await getTransactionEvents("0x18c823e04acd69066e4f28f3bf377df1edb5f564dae6ddda06579a5e02439eeb"));