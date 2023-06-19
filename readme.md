# droplinked-binance-integration
The toolkit for integrating Binance into droplinked, including login, gating, record, affiliate, and payment

---

## Sections of this repository

### 0. Installation

```bash
npm install moralis @moralisweb3/common-evm-utils
npm i @metamask/sdk
npm i web3
npm i eth-sig-util
```

Also, add 
```html
<script>
      if (global === undefined) {
        var global = window;
      }
    </script>
```

into the `</head>` part of your html (I'll fix this issue more properly later)

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

### 2. Polygon Gating

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

