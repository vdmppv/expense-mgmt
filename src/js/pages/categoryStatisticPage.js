import {firebaseService} from "../services/index.js";
import {categoryStatisticComponent} from "../components/categoryStatisticComponent.js";
import {selectCategoryComponent} from "../components/selectCategoryComponent.js";
import {Router} from "../router.js";

let CategoryStatisticPage = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let categories = await firebaseService.getCategoriesList(user);
        let view = `
            <div>
                <nav>
                    <ul class="main-nav">
                        <li class="main-nav-item main-nav-item-clicked" id="statistic-category-global">
                            <a>Global</a>
                        </li>
                        <li class="main-nav-item">
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
                        ${await selectCategoryComponent("statistics-input statistics-select", categories).render()}
                        <button class="statistics-button" type="submit">Result</button>
                    </div>

                    <div class="statistics-transactions" id="statistics-transactions">
                    </div>
                </form>
            </div>
        `;
        
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const form = document.querySelector(".statistics-main");
        const statisticContainer = document.getElementById("statistics-transactions");
        const fromDate = document.getElementById("from-date");
        const toDate = document.getElementById("to-date");
        const categorySelector = document.getElementById("category-selector");
        
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const selectedCategoryId = categorySelector.options[categorySelector.selectedIndex].id;
            const stat = await getCategoryStatistic(user, fromDate.value, toDate.valueOf,  selectedCategoryId);
            statisticContainer.innerHTML = await categoryStatisticComponent(stat);
        });

        const statisticCategoryGlobal = document.getElementById("statistic-category-global");
        statisticCategoryGlobal.onclick = () => {
            Router._instance.navigate("/statistics/global");
        }

    }
}

async function getCategoryStatistic(user, fromDate, toDate, categoryId) {
    const transactions = await firebaseService.getTransactionsFromCategory(user, categoryId);
    var incomeTransactionsInfo = [];
    var incomeAmount = 0;
    var expenseTransactionsInfo = [];
    var expenseAmount = 0;
    for (const transaction of transactions) {
        if (fromDate <= transaction["date"] && transaction["date"] <= toDate) {
            if (transaction["type"] == "income") {
                incomeTransactionsInfo.push(transaction);
                incomeAmount += transaction["amount"];
            } else {
                expenseTransactionsInfo.push(transaction);
                expenseAmount += transaction["amount"];
            }
        }
    }
    return {
        "incomeTransactions": incomeTransactionsInfo,
        "incomeAmount": incomeAmount,
        "expenseTransactions": expenseTransactionsInfo,
        "expenseAmount": expenseAmount,
    };
}

export default CategoryStatisticPage;
