import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";
import {Category} from "../models/category.js";

let AddCategoryModal = {
    render: async () => {
        let view = `
            <div class="model-wrap">
                <form class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">New category</h3>
                    </div>

                    <div class="modal-main">
                        <input required id="category-title" maxlength="50" class="modal-input" type="text" placeholder="Title">
                        <input required id="category-description" maxlength="256" class="modal-input" type="text" placeholder="Description">
                        <input required id="category-color" class="choose-color" type="color" value="#38a9ff"> 
                    </div>
        
                    <div class="modal-footer">
                        <button id="add-category-button" class="modal-button">Add Category</button>
                        <button id="category-close-button" class="modal-button-red">Close</button> 
                    </div>
                </form>
            </div>
        `;
        
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const categoryTitle = document.getElementById("category-title");
        const categoryDescripton = document.getElementById("category-description");
        const categoryColor = document.getElementById("category-color");
        const form = document.querySelector(".modal");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const category = new Category(
                {
                    title: categoryTitle.value,
                    description: categoryDescripton.value,
                    color: categoryColor.value
                }
            );

            await firebaseService.writeCategory(user, category);
            closeModal();
        });

        const categoryCloseButton = document.getElementById("category-close-button");
        categoryCloseButton.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    }
}

export default AddCategoryModal;
