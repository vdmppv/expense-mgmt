import {firebaseService} from "../services/index.js";
import {showModal} from "../services/modalService.js";
import AddTransactionModal from "../pages/addTransactionModal.js"
import TransactionComponent from "../components/transactionComponent.js";


let TransactionsPage = {
    render: async () => {
        let view = `
            <div class="start-img-tr"></div>
            <div>
                <h1 class="page-title">Transactions</h1>
            </div>

            <div class="table">
                <div class="table-head">
                    <a id="add-transaction-button" class="add-button">Add transaction</a>
                </div>
                
                <ul class="table-main"></ul>
            </div>
        `;

        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const tableMain = document.querySelector(".table-main");

        firebaseService.getTransactions(user, async (data) => {
            let innerView = ``;
            if (!data.length) {
                tableMain.innerHTML = innerView;
                return;
            }
            for (const transaction of data) {
                const transactionComponent = TransactionComponent(transaction);
                innerView += await transactionComponent.render();
                await transactionComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addTransactionsButton = document.getElementById("add-transaction-button");
        addTransactionsButton.addEventListener("click", () => {
            showModal(AddTransactionModal);
        });

        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("category-block-button")) {
                const transactionUid = event.target.getAttribute("data-href");
                await firebaseService.removeTransaction(user, transactionUid);
            } else if (event.target.className.includes("fas fa-times")) {
                const transactionUid = event.target.parentNode.getAttribute("data-href");
                await firebaseService.removeTransaction(user, transactionUid);
            }
        });
    }
}

export default TransactionsPage;
