import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";
import {selectCategoryComponent} from "../components/selectCategoryComponent.js";
import {Transaction} from "../models/transaction.js";

let AddTransactionModal = {
    render: async () => {
        let user = firebase.auth().currentUser;
        let categories = await firebaseService.getCategoriesList(user);
        let view = `
            <form class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">New Transaction</h2>
                </div>
                
                <div class="modal-main">
                    <input class="modal-input" type="number" id="transaction-amount" placeholder="Amount">
                    <div class="modal-radio">
                        <div class="radio-btn">
                            <input type="radio" name="income-expense" id="choice1" value="income" class="radio-btn-input">
                            <label for="choice1" class="radio-btn-text radio-btn-green">Income</label>
                        </div>
                        <div class="radio-btn">
                            <input type="radio" name="income-expense" id="choice2" value="expense" class="radio-btn-input">
                            <label for="choice2" class="radio-btn-text radio-btn-red">Expense</label>
                        </div>
                    </div>
                    <input class="modal-input" type="text" maxlength="50" id="transaction-place" placeholder="Place">
                    <input class="modal-input" type="text" maxlength="256" id="transaction-description" placeholder="Description">
                    ${await selectCategoryComponent("modal-input", categories).render()}
                    <div class="modal-line">
                        <div class="choose-file">
                            <input type="file" accept="image/*" name="file" id="file" class="choose-file-input">
                            <label for="file" class="choose-file-label">
                                <i class="far fa-file-image"></i>
                                <span class="js-filename">Choose Image</span>
                            </label>
                        </div>

                        <input required id="transaction-date-picker" class="modal-input" type="date">
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="modal-button">Add Transaction</button>
                    <button id="transaction-close-button" class="modal-button-red">Close</button> 
                </div>
            </form>
        `;

        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const transactionAmount = document.getElementById("transaction-amount");
        const transactionPlace = document.getElementById("transaction-place");
        const transactionDescription = document.getElementById("transaction-description");
        const categorySelector = document.getElementById("category-selector");
        const transactionDatePicker = document.getElementById("transaction-date-picker");
        const incomeRadioButton = document.getElementById("choice1");
        const expenseRadioButton = document.getElementById("choice2");
        const imageChooser = document.getElementById("file");
        const form = document.querySelector(".modal");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const type = incomeRadioButton.checked ? "income" : "expense";
            const transaction = new Transaction({
                    amount: parseInt(transactionAmount.value),
                    place: transactionPlace.value,
                    description: transactionDescription.value,
                    category_id: categorySelector.options[categorySelector.selectedIndex].id,
                    date: transactionDatePicker.value,
                    type: type,
                    image: imageChooser.files[0],
                }
            );
            await firebaseService.writeTransaction(user, transaction);
            closeModal();
        });

        const transactionCloseButton = document.getElementById("transaction-close-button");
        transactionCloseButton.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    }
}

export default AddTransactionModal;
