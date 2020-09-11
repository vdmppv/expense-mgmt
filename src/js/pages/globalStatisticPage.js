import {Router} from "../router.js";
import {firebaseService} from "../services/index.js";
import {chartComponent} from "../components/chartComponent.js"

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

                    <div class="statistics-transactions" id="chart-pie-container">
                    </div>
                </form>
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

        const chartContainer = document.getElementById("chart-pie-container");
        const form = document.querySelector(".statistics-main");
        const fromDate = document.getElementById("from-date");
        const toDate = document.getElementById("to-date");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const stat = await getTransactionDateStatistic(user, fromDate.value, toDate.value);
            const categories = await firebaseService.getCategoriesDict(user);
            chartContainer.innerHTML = chartComponent(stat);
            const incomeChartCanvas = document.getElementById("income-chart");
            const expenseChartCanvas = document.getElementById("expense-chart");
            createPieChart(incomeChartCanvas, createDataForChart(stat["incomeTransactionsInfo"], categories));
            createPieChart(expenseChartCanvas, createDataForChart(stat["expenseTransactionsInfo"], categories));
        });

    }
}

async function getTransactionDateStatistic(user, fromDate, toDate) {
    const transactions = await firebaseService.getTransactionsFromDate(user, fromDate);
    var incomeTransactionsInfo = {};
    var incomeAmount = 0;
    var expenseTransactionsInfo = {};
    var expenseAmount = 0;
    for (const transaction of transactions) {
        if (transaction["date"] <= toDate) {
            if (transaction["type"] == "income") {
                incomeAmount += transaction["amount"];
                if (!incomeTransactionsInfo[transaction["category_id"]]) {
                    incomeTransactionsInfo[transaction["category_id"]] = transaction["amount"];
                } else {
                    incomeTransactionsInfo[transaction["category_id"]] += transaction["amount"];
                }
            } else {
                expenseAmount += transaction["amount"]
                if (!expenseTransactionsInfo[transaction["category_id"]]) {
                    expenseTransactionsInfo[transaction["category_id"]] = transaction["amount"];
                } else {
                    expenseTransactionsInfo[transaction["category_id"]] += transaction["amount"];
                }
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

function createDataForChart(categoriesAmount, categories) {
    return {
        datasets: [{
            data: Object.values(categoriesAmount),
            backgroundColor: Object.keys(categoriesAmount).map(key => categories[key].color),

        }],
        labels: Object.keys(categoriesAmount).map(key => categories[key].title),
    }
}

function createPieChart(ctx, data) {
    return new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export default GlobalStatisticPage;
