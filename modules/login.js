// generate a login page using procedural code
const loginPageHTML = `
    <p>CacheLoads: ${cacheLoads}</p>
    <h2>Login</h2>
    <a href="/?page=home">Home</a>
    <form action="/login" method="post">
        <label>Username:</label>
        <input type="text" name="username" />
        
        <label>Password:</label>
        <input type="password" name="password" />
        
        <input type="submit" value="Log In" />
    </form>
`

// inject the login page into the DOM
if(page === "login")
{
    rootElement.innerHTML = loginPageHTML;
    
    setTimeout(async () => {
       console.log("simulating ajax load of data, login route is dirty... reloading!"); 
       await importModules();
    }, 5000);
}
