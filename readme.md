# droplinked-binance-integration
The toolkit for integrating Binance into droplinked, including login, gating, record, affiliate, and payment

---

## Sections of this repository

### 0. Installation

```bash
npm install moralis @moralisweb3/common-evm-utils
npm i @metamask/sdk
npm i eth-sig-util
npm install nft.storage
npm install events
npm install buffer --save
```

### 1.1 Login using Metamask (Front-end)

You can use the PolygonLogin function like like below 

```js
import { PolygonLogin } from "./src/metamaskLogin";
let account_info = await PolygonLogin();
console.log(account_info);
```

The result would be like : 

```
{
    "address": "0x89281f2da10fb35c1cf90954e1b3036c3eb3cc78",
    "network": "TestNet",
    "signature": "0x9ba56709ce42f8a022e6dd0fe81639e3a31da0017f922eb3ec355dcf579bb8380a85641d6b771473d26902c64b42411308dfab0837c121a3c29cdda705a4c2111c"
}
```

### 1.2 Signature Verifiaction (Back-end)

Use the `verifyEVMSignature` function from the `src/verifySignature.js` to verify a signature like this :

```js
console.log(verifyEVMSignature("0x89281f2da10fb35c1cf90954e1b3036c3eb3cc78" , "0x9ba56709ce42f8a022e6dd0fe81639e3a31da0017f922eb3ec355dcf579bb8380a85641d6b771473d26902c64b42411308dfab0837c121a3c29cdda705a4c2111c"));
```

It would return a `true` or `false` value based on the signature check.

### 2. Polygon Gating (Backe-end and Front-end)

You can use the gating logic like this : 

```js
import {getMaxDiscount , gatedPassesRules} from './src/polygonGating'
let ruleset = {
    "rules":[
    {
        "addresses": [ 
            "0xEa072EB2c7FBC875DcB1B58F240fAF8755399f7e"
        ],
        "discountPercentage": 10,
        "nftsCount": 20,
        "description": "description",
        "_id": "637a043fa0581bf9d5c568c5"
    }
],
"redeemedNFTs" : [],
"gated" : false
};

let address = "0x2bc12061c8912505978472c21d4a23db43af62aa"; // owns 31 NFTs
let max_discount = await getMaxDiscount(address,ruleset);
console.log("Max discount percentage : " , max_discount.discountPercentage);
console.log("NFTs passed : " , max_discount.NFTsPassed);

let ruleset2 =  {
    "_id": "636b61c5422f885bc43bacf0",
    "collectionID": "636ac267913374ba96de3d0b",
    "rules": [
        {
            "addresses": [
                "0xEa072EB2c7FBC875DcB1B58F240fAF8755399f7e",
            ],
            "discountPercentage": null,
            "nftsCount": 2,
            "description": "asdfasdf",
            "_id": "63c549c4a2bf46798e499531"
        }
    ],
    "redeemedNFTs": [],
    "gated": true,
    "ownerID": "636ac1e6a8a01cfc350ac117",
    "webUrl": "behdad.com",
    "createdAt": "2022-11-09T08:16:05.360Z",
    "updatedAt": "2023-01-16T12:57:40.669Z",
    "__v": 0
};

if (await gatedPassesRules(address, ruleset2)){
    console.log("You can pass the gate")
}else{
    console.log("You can't pass the gate")
}
```

Result : 
```
Max discount percentage :  10
NFTs passed :  ["0xEa072EB2c7FBC875DcB1B58F240fAF8755399f7e"]
You can pass the gate
```

### 3. Polygon Record Product (Front-end)

Simple usage : 

```js
// Get Account information from login
let account_information = await PolygonLogin();

let product_title = "test product";
let discription = "test product description";
let image_url = "https://i.imgur.com/removed.png";
let price = 200; // It is actually 2 dollars (the price should be multiplied by 100)
let amount = 2000;
let comission = 1234; // It is actually 12.34% (the comission should be multiplied by 100)
let tx_hash = await record_merch({
    "type" : "t-shirt",
    "size" : "large",
    "color" : "red"
} , account_information.address, product_title , discription, image_url, price, amount, comission);
console.log(tx_hash);
```

throws "Transaction Rejected" error if the user rejects the transaction on Metamask.


Will return a `tx_hash` like this : 

```
0x70e363b3a62caa2c1699adcfb682179d8c8ed3a412edcc8809b69aded15cc6de
```

### 3. Polygon Publish Request (Front-end)

Should be used by the publisher who wants to publish a product.

Simple usage : 

```js
let account_information = await PolygonLogin();
let producer_address = "0x89281F2dA10fB35c1Cf90954E1B3036C3EB3cc78";
let token_id = 1;
publish_request(account_information.address, producer_address, token_id);
```

throws "Transaction Rejected" error if the user rejects the transaction on Metamask.

Will return a `tx_hash` like this : 

```
0x70e363b3a62caa2c1699adcfb682179d8c8ed3a412edcc8809b69aded15cc6de
```

### 4. Polygon Approve Request (Front-end)

Should be used by the owner of the product.

Simple usage : 

```js
let account_information = await PolygonLogin();
let request_id = 1;
approve_request(account_information.address, request_id);
```

throws "Transaction Rejected" error if the user rejects the transaction on Metamask.


Will return a `tx_hash` like this : 

```
0x70e363b3a62caa2c1699adcfb682179d8c8ed3a412edcc8809b69aded15cc6de
```

### 5. Polygon Cancel Request (Front-end)

Should be used by the publisher who requested the product.

Simple usage : 

```js
let account_information = await PolygonLogin();
let request_id = 1;
cancel_request(account_information.address, 2);
```

throws "Transaction Rejected" error if the user rejects the transaction on Metamask.


Will return a `tx_hash` like this : 

```
0x70e363b3a62caa2c1699adcfb682179d8c8ed3a412edcc8809b69aded15cc6de
```

### 6. Polygon Disapprove Request (Front-end)

Should be used by the owner of the product.

Simple usage : 

```js
let account_information = await PolygonLogin();
let request_id = 1;
disapprove(account_information.address, request_id);
```

throws "Transaction Rejected" error if the user rejects the transaction on Metamask.


Will return a `tx_hash` like this : 

```
0x70e363b3a62caa2c1699adcfb682179d8c8ed3a412edcc8809b69aded15cc6de
```


### 7. Polygon Web3 Events & Transaction verification (Web3)

Use the `polygonWeb3.js` file on the web3 project, and use the `getTransactionEvents` function which will return the events of a transaction.

If the transaction is not verified, it will throw an error.
If the transaction is verified, it will return the events of the transaction.

Simple usage : 

```js
console.log(await getTransactionEvents("0xd3a49c903b131080c66b1166993928dc575061b078f0a3d1397627929e5551f0"));
```

Will return a transaction events object like this : 

```
{
    event : "approve_request_event",
    data : [{
        name : "request_id",
        value : 1n
    }]
}
```

List of all events and their result can be found below (Ignore the values in the result, they are just examples) : 

mint_event : 

    - Event name : `mint_event`

    - Data : 

        - `token_id` : `1n`

        - `recipient` : `0x89281F2dA10fB35c1Cf90954E1B3036C3EB3cc78`

        - `amount` : `2000n`

publish_request_event : 

    - Event name : `publish_request_event`

    - Data : 

        - `request_id` : `1n`

        - `token_id` : `1n`

approve_request_event : 

    - Event name : `approve_request_event`

    - Data : 

        - `request_id` : `1n`

cancel_request_event :
    
        - Event name : `cancel_request_event`
    
        - Data : 
    
            - `request_id` : `1n`

disapprove_request_event :

    - Event name : `disapprove_request_event`

    - Data : 

        - `request_id` : `1n`