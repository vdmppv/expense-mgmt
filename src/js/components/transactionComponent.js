import {firebaseService} from "../services/index.js";

export const transactionComponent = (transaction) => {
    return {
        render: async () => {
            let user = firebase.auth().currentUser;
            let categories = await firebaseService.getCategoriesDict(user);
            let checkIncome = transaction["type"] == "income";
            let imageLink = transaction["image"] ? await firebaseService.retrieveImage(transaction["image"]) : "img/";

            let view = `
                <li>
                    <div class="transaction-card transaction-card-margin" style="background: ${categories[transaction["category_id"]]["color"]};">
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
                </li>
            `;
            
            return view;
        },
        after_render: async () => {
        }
    }
}

export default transactionComponent;
