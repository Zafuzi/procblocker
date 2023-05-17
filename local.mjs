window.cacheLoads = 0;

async function importModules()
{
    window.route = window.location.pathname;
    window.queryData = new URLSearchParams(window.location.search);
    window.page = queryData.get('page') || "home";
    window.rootElement = document.querySelector("#root");
    window.cacheLoads++;
    
    console.log(`route: ${window.route}${window.page}`);
    
    await fetch("/modules/home.js").then(r => r.text()).then(r => eval(r));
    await fetch("/modules/login.js").then(r => r.text()).then(r => eval(r));
    
    document.querySelectorAll("a")?.forEach( links => {
        links.addEventListener("click", async (event) =>
        {
            const anchor = event.target;
            const href = anchor.getAttribute("href");
            const queryData = new URLSearchParams(href.split("?")[1]);
            const page = queryData.get("page");

            if(page)
            {
                console.log("cacheload page:", page);
                event.preventDefault();
                window.history.pushState({}, page, href);
                await importModules();
            }
        });
    });
}


importModules().then(r => {});