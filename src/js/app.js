import {Router} from "./router.js";
import {routes} from "./routes.js";

document.addEventListener("DOMContentLoaded", () => {
    Router.init(routes);
});
