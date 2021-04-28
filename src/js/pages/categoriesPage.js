import CategoryComponent from "../components/categoryComponent.js"
import {firebaseService} from "../services/index.js";
import AddCategoryModal from "../pages/addCategoryModal.js";
import {showModal} from "../services/modalService.js";

let CategoriesPage = {
    render: async () => {
        let view = `
            <div class="start-img-ctg"></div>
            <div>
                <h1 class="page-title">Categories</h1>
            </div>

            <div class="table">
                <div class="table-head">
                    <a id="add-button" class="add-button">Add Category</a>
                </div>
                <ul class="table-main"></ul>
            </div>
        `;
        
        return view;
    },
    after_render: async () => {

        const tableMain = document.querySelector(".table-main");
        const user = firebase.auth().currentUser;

        firebaseService.getCategories(user, async (data) => {
            let innerView = ``;
            if (!data.length) {
                tableMain.innerHTML = innerView;
                return;
            }
            for (const category of data) {
                const categoryComponent = CategoryComponent(category);
                innerView += await categoryComponent.render();
                await categoryComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addCategoriesButton = document.getElementById("add-button");
        addCategoriesButton.addEventListener("click", () => {
            showModal(AddCategoryModal);
        });
        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("category-block-button")) {
                const categoryUid = event.target.getAttribute("data-href");
                await firebaseService.removeCategory(user, categoryUid);
            } else if (event.target.className.includes("fas fa-times")) {
                const categoryUid = event.target.parentNode.getAttribute("data-href");
                await firebaseService.removeCategory(user, categoryUid);
            }
        });
    }
}

export default CategoriesPage;
