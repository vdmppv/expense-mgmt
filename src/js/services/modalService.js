import {modal} from "../components/modal.js"

const modalRoot = document.getElementById("modal_id");

export const showModal = async (content) => {
    const modalContent = modal(content);
    modalRoot.innerHTML = await modalContent.render();
    await modalContent.after_render();
};

export const closeModal = async () => {
    modalRoot.innerHTML = "";
};
