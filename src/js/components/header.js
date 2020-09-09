import {Router} from "../router.js";
import {linkNavigationHelper} from "../helpers/linkNavigationHelper.js";

let header = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let username = localStorage.getItem("username");
        let headerView;
        if (user) {
            headerView = `
                <nav class="navigation-menu-block">
                    <ul class="navigation-menu">
                        <li class="navigation-item">
                            <a class="navigation-link" href="/transactions" id="header-transactions">Transactions</a>
                        </li>
                        <li class="navigation-item">
                            <a class="navigation-link" href="/categories" id="header-categories">Categories</a>
                        </li>
                        <li class="navigation-item">
                            <a class="navigation-link" href="/statistics/category" id="header-statistics">Statistics</a>
                        </li>
                    </ul>
                </nav>
                 
                <div class="user-block">
                    <ul class="navigation-menu">
                        <li class="navigation-item">
                            <a class="navigation-link" href="/profile" id="header-username">${user ? user.displayName : username}</a>
                        </li>
                        <li class="navigation-item">
                            <a class="navigation-link" id="header-logout">Log Out</a>
                        </li>
                    </ul>
                </div>
            `
        } else {
            headerView = `
                <nav class="navigation-auth-block">
                    <ul class="navigation-menu">
                        <li class="navigation-item">
                            <a class="navigation-link" href="/login" id="header-login">Log In</a>
                        </li>
                        <li class="navigation-item">
                            <a class="navigation-link" href="/register" id="header-signup">Sign Up</a>
                        </li>
                    </ul>
                </nav>
            `
        }
        let view =  /*html*/`
                <div class="logo-block">
                    <img class="user-img" src="/img/Logo.png"/>
                </div>

                ${headerView}
        `
        return view;
    },
    after_render: async () => {
        let user = firebase.auth().currentUser;
        if (user) {
            const transactionButton = document.getElementById("header-transactions");
            transactionButton.onclick = linkNavigationHelper;

            const categoriesButton = document.getElementById("header-categories");
            categoriesButton.onclick = linkNavigationHelper;
            const statisticsButton = document.getElementById("header-statistics");
            statisticsButton.onclick = linkNavigationHelper;

            
            const logoutButton = document.getElementById("header-logout");
            logoutButton.onclick = (event) => {
                firebase.auth().signOut();
                linkNavigationHelper(event);
            };

            const usernameButton = document.getElementById("header-username");
            usernameButton.onclick = linkNavigationHelper;

        } else {
            const loginButton = document.getElementById("header-login");
            const registerButton = document.getElementById("header-signup");

            loginButton.onclick = linkNavigationHelper;

            registerButton.onclick = linkNavigationHelper;
        }

    }
}
export default header;
