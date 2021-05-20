import Utils from "./helpers/utils.js"
import Header from "./components/header.js"
import NotFoundPage from "./pages/notFoundPage.js"

export class Router {
    static _instance = null;
    routes;

    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', event => this._onPopState(event));
    }

    _onPopState() {
        this.loadPage(this.parseCurrentURL());
    }

    static init(routes) {
        if (Router._instance != null) {
            return Router._instance;
        }

        const path = window.location.pathname;
        window.history.replaceState({path}, path, path);
        const router = new Router(routes);
        Router._instance = router;
        firebase.auth().onAuthStateChanged(() => {
            router._loadInitial();
        });
        return router;
    }

    navigate(url, render = true) {
        history.pushState({}, "", url);
        this.loadPage(url);
    }

    async loadPage(url) {
        const content = document.getElementById('page_id');

        const header = document.getElementById('header_id');
        header.innerHTML = await Header.render();
        await Header.after_render();

        let currentPage = NotFoundPage;
        for (const {path, page} of Router._instance.routes) {
            if (path === url) {
                currentPage = page;
            }
        }
        content.innerHTML = await currentPage.render();
        await currentPage.after_render();
    }

    parseCurrentURL() {
        let request = Utils.parseRequestURL()
        return (request.resource ? '/' + request.resource : '/')
            + (request.id ? '/' + request.id : '')
            + (request.verb ? '/' + request.verb : '');
    }

    async _loadInitial() {
        this.navigate(this.parseCurrentURL());
    }
}
