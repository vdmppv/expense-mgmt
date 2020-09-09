import {Router} from "../router.js";


export function linkNavigationHelper(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    Router._instance.navigate(url);
}
