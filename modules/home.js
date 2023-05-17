// generate a login page using procedural code
const homePageHTML = `
    <p>CacheLoads: ${cacheLoads}</p>
    <h2>Home</h2>
    <a href="/?page=login">Login</a>
`

if(page === "home")
{
    rootElement.innerHTML = homePageHTML
}
