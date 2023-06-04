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


//Some test cases
// e9b2141e91239f7c476d26cad7b724b0723f60c5cc962ddcab939d6803992d2d : 80%, gated
// c3be20f1f8f95a3db877beea01eb93ee51925f89ba2dca70cf619488ba942667 : 10%, gated
