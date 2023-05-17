window.rootElement = document.querySelector("#root");
window.cacheLoads = 0;

const cachedModules = {};

function updateRouteInformation()
{
    window.route = window.location.pathname;
    window.queryData = new URLSearchParams(window.location.search);
    window.page = queryData.get('page') || "home";
}

async function importModules()
{
    updateRouteInformation();
    cachedModules.home = await import("/modules/home.mjs");
    cachedModules.login = await import("/modules/login.mjs");
}

function replaceLinks()
{
    // replace all <Link> elements with <a> elements and add event listeners
    document.querySelectorAll("Link")?.forEach( link => {
        const linkHref = link.getAttribute("href");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", linkHref);
        anchor.innerText = link.dataset.value; 
        
        anchor.addEventListener("click", async (event) =>
        {
            event.preventDefault();
            const linkQueryData = new URLSearchParams(linkHref.split("?")[1]);
            const linkPage = linkQueryData.get("page");
            
            await navigate(linkPage);
        });
        
        link.replaceWith(anchor);
    });
}

async function navigate(moduleName)
{
    moduleName = moduleName || window.page || "home";
    window.history.pushState({}, moduleName, `/?page=${moduleName}`);
    document.adoptedStyleSheets = [];

    await importModules();
    
    if(!cachedModules[moduleName])
    {
        rootElement.innerHTML = `
            <h2>404</h2>
            <p>Page: ${page} was not found...</p>
            <Link href="/?page=home" data-value="Go Home"/>
        `;
    }
    else {
        console.log("navigating to", moduleName);
        await cachedModules[moduleName]?.default();
        window.cacheLoads++;
    }
    
    replaceLinks();
}

updateRouteInformation();
navigate();