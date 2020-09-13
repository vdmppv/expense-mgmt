import {firebaseService} from "../services/index.js";

export const transactionStatisticComponent = (transaction) => {
    return {
        render: async () => {
            let checkIncome = transaction["type"] == "income";
            let imageLink = transaction["image"] ? await firebaseService.retrieveImage(transaction["image"]) : "/img";
            let view = `
                <div class="transaction-card ${checkIncome ? "transaction-card-green" : "transaction-card-red"}">
                    <div class="transaction-left">
                        <span class="transaction-item">Place: ${transaction["place"]}</span>
                        <span class="transaction-item">Desc:  ${transaction["description"]}</span>
                        <span class="transaction-item">Date:  ${transaction["date"]}</span>
                    </div>
                    <div class="transaction-right">
                        <span class="transaction-amount">${checkIncome ? "+" : "-"}${transaction["amount"]}</span>
                        <img class="transaction-img" src="${imageLink}" height="75px">
                    </div>    
                </div>
            `;

            return view;
        },
        after_render: async () => {
        }
    }
}

export default transactionStatisticComponent;
