import {transactionStatisticComponent} from "./transactionStatisticComponent.js";

export const categoryStatisticComponent = async (statistic) => {

    let displayTransactionComponents = async (transactions) => {
        let innerView = ``;
        for (const transaction of transactions) {
            innerView += await transactionStatisticComponent(transaction).render();
        }
        return innerView;
    }

    let view = `
        <div>
            <div class="total-card">
                <span class="total-card-text total-card-green">${statistic["incomeAmount"]}</span>
                <span class="total-card-text">Total Income</span>
            </div>

            ${await displayTransactionComponents(statistic["incomeTransactions"])}
        </div>

        <div>
            <div class="total-card">
                <span class="total-card-text total-card-red">${statistic["expenseAmount"]}</span>
                <span class="total-card-text">Total Expense</span>
            </div>
            ${await displayTransactionComponents(statistic["expenseTransactions"])}
        </div>
    `;

    return view;
}
