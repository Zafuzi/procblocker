export default function()
{
    // generate a login page using procedural code
    rootElement.innerHTML = `
        <p>CacheLoads: ${cacheLoads}</p>
        <h2>Home</h2>
        
        <Link href="/?page=login" data-value="Login"/>
        <Link href="/?page=butter" data-value="404 Butter route"/>
    `
}
