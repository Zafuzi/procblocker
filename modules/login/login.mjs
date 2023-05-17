import {interpolate, loadHTML} from "/lib.mjs";

function registerTemplate(isRegister)
{
    if(isRegister)
    {
       return (`
            <label for="email">Email:</label>
            <input id="email" type="email" name="email" required/>
       `) 
    }
    
    return "";
}

export default async function()
{
    const isRegister = queryData.get("register") === "true";
    const template = await loadHTML("/modules/login/login.html");

    
    // generate a login page using procedural code
    rootElement.innerHTML = await interpolate(template, {
        registerTemplate,
        isRegister,
        registerLink: isRegister ? "/?page=login" : "/?page=login&register=true",
        registerText: isRegister ? "Login" : "Register",
    });
}
