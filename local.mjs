import {navigate, updateRouteInformation} from "./lib.mjs";

updateRouteInformation();
navigate().then(() => {
    console.log("loaded", page);
});