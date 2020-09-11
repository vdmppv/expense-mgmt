import {Router} from "../router.js";
import {firebaseService} from "../services/index.js";

let GlobalStatisticPage = {
    render: async () => {
        let view =  `
            <div>
                <nav>
                    <ul class="main-nav">
                        <li class="main-nav-item">
                            <a>Global</a>
                        </li>
                        <li class="main-nav-item main-nav-item-clicked" id="statistic-category-button">
                            <a>Category</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <h1 class="page-title">Statistics</h1>
            </div>

            <div class="statistics-table">
                <form class="statistics-main">
                    <div class="statistics-inputs">
                        <input type="date" id="from-date" class="statistics-input">
                        <input type="date" id="to-date" class="statistics-input">
                        <button class="statistics-button" type="submit">Result</button>
                    </div>
                </form>

                <div class="statistics-transactions" id="chart-pie-container">
                </div>
            </div>
        `;
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const statisticCategoryButton = document.getElementById("statistic-category-button");
        statisticCategoryButton.onclick = () => {
            Router._instance.navigate("/statistics/category");
        }

        const form = document.querySelector(".statistics-main");
        const fromDate = document.getElementById("from-date");
        const toDate = document.getElementById("to-date");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
        });

    }
}

export default GlobalStatisticPage;
