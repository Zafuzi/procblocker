export default function()
{
    // generate a login page using procedural code
    rootElement.innerHTML = `
        <p>CacheLoads: ${cacheLoads}</p>
        <h2>Login</h2>
        
        <form action="/login" method="post">
            <label>Username:</label>
            <input type="text" name="username" />
            
            <label>Password:</label>
            <input type="password" name="password" />
            
            <input type="submit" value="Log In" />
        </form>
    `;
}
