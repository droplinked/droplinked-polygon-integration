import { PolygonLogin } from "./src/metamaskLogin";
let account_info = await PolygonLogin();
console.log(account_info);