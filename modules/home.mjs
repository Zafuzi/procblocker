export default async function()
{
    const styles = await import('/modules/home.css', {
        assert: { type: 'css' }
    });
    document.adoptedStyleSheets.push(styles.default);

    // generate a login page using procedural code
    rootElement.innerHTML = `
        <p>CacheLoads: ${cacheLoads}</p>
        <h2>Home</h2>
    `
}
