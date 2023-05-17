window.rootElement = document.querySelector("#root");
window.cacheLoads = 0;

const cachedModules = {};

export function updateRouteInformation()
{
    window.route = window.location.pathname;
    window.queryData = new URLSearchParams(window.location.search);
    window.page = queryData.get('page') || "home";
}

export async function importModules()
{
    updateRouteInformation();
    cachedModules.home = await import("/modules/home.mjs");
    cachedModules.login = await import("/modules/login/login.mjs");
}

export function replaceLinks()
{
    // replace all <Link> elements with <a> elements and add event listeners
    document.querySelectorAll("Link")?.forEach(link =>
    {
        const linkHref = link.getAttribute("href");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", linkHref);
        anchor.innerText = link.dataset.value;

        anchor.addEventListener("click", async(event) =>
        {
            event.preventDefault();
            const linkQueryData = new URLSearchParams(linkHref);
            const linkPage = linkQueryData.get("page");

            await navigate(linkPage, linkQueryData);
        });

        link.replaceWith(anchor);
    });
}

function convertQueryDataToString(qd)
{
    let queryString = "";
    
    if(!qd)
    {
        return queryString;
    }
    
    const keys = qd.keys();
    
    for(let key of keys)
    {
        // ignore page key
        if(key === "/?page")
        {
            continue;
        }
        
        console.log(key);
        
        queryString += `&${key}=${qd.get(key)}`;
    }

    return queryString;
}

export async function navigate(moduleName, moduleQueryData)
{
    moduleName = moduleName || window.page || "home";
    window.history.pushState({}, moduleName, `/?page=${moduleName}${convertQueryDataToString(moduleQueryData)}`);

    const AppStyles = await import('/local.css', {assert: {type: 'css'}});

    document.adoptedStyleSheets = [AppStyles.default];

    await importModules();
    window.cacheLoads++;

    if(!cachedModules[moduleName])
    {
        rootElement.innerHTML = `
            <h2>404</h2>
            <p>CacheLoads: ${cacheLoads}</p>
            <p>Page: ${page} was not found...</p>
        `;
    }
    else
    {
        console.log("navigating to", moduleName);
        await cachedModules[moduleName]?.default();
    }

    replaceLinks();
}

export async function interpolate(content, params)
{
    const names = Object.keys(params);
    const values = Object.values(params);
    return new Function(...names, `return \`${content}\`;`)(...values);
}

export async function loadHTML(path)
{
    const response = await fetch(path, {method: 'GET', headers: {'Content-Type': 'text/html'}});
    if(!response.ok)
    {
        return null;
    }

    return await response?.text();
}