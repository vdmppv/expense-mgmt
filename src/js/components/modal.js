export const modal = (content) => ({

        render: async () => {
            let view =  `
                <div id="modal-content" class="modal-wrap">${await content.render()}</div>
            `
            return view;
        },
        after_render: async () => {
            await content.after_render();
            const modal = document.getElementById("modal_id");
            modal.addEventListener("click", (event) => {
                document.body.removeChild("modal");
            });
            const modalContent = document.getElementById("modal-content");
            modalContent.addEventListener("click", (event) => {
                event.stopPropagation();
            });
        }
    }
)
export default modal;
