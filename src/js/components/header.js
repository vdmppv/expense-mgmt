import {Router} from "../router.js";
import {linkNavigationHelper} from "../helpers/linkNavigationHelper.js";
import {getRate} from "../helpers/getRates.js";

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
                        <li class="navigation-item">
                            <a class="navigation-link" href="/notes" id="header-notes">Daily Reminders</a>
                        </li>
                        <li class="navigation-item">
                            <a class="navigation-link" href="/feed" id="header-feed">Feed</a>
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
                <div class="rate-block">
                <p class="navigation-link">$:<span id='usd'></span>
                                    €:<span id='eur'></span></p>
                </div>
            </div>
            ${headerView}
        `
        return view;
    },
    after_render: async () => {
        getRate();
        let user = firebase.auth().currentUser;
        if (user) {
            const transactionButton = document.getElementById("header-transactions");
            transactionButton.onclick = linkNavigationHelper;

            const categoriesButton = document.getElementById("header-categories");
            categoriesButton.onclick = linkNavigationHelper;

            const statisticsButton = document.getElementById("header-statistics");
            statisticsButton.onclick = linkNavigationHelper;
            
            const usernameButton = document.getElementById("header-username");
            usernameButton.onclick = linkNavigationHelper;

            const notesButton = document.getElementById("header-notes");
            notesButton.onclick = linkNavigationHelper;

            const feedButton = document.getElementById("header-feed");
            feedButton.onclick = linkNavigationHelper;

            const logoutButton = document.getElementById("header-logout");
            logoutButton.onclick = (event) => {
                firebase.auth().signOut();
                linkNavigationHelper(event);
                Router._instance.navigate("/");
            };
        } else {
            const loginButton = document.getElementById("header-login");
            loginButton.onclick = linkNavigationHelper;

            const registerButton = document.getElementById("header-signup");
            registerButton.onclick = linkNavigationHelper;
        }
    }
}
export default header;
