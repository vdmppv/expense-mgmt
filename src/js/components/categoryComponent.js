export const categoryComponent = (category) => {
    return {
        render: async () => {
            let view = `
                <li>
                    <div class="category-block" style="background: ${category["color"]};">
                        <div class="category-block-buttons">
                            <button class="category-block-button"><i class="fas fa-cog"></i></button>
                            <button class="category-block-button" id="category-component-delete" data-href="${category["uid"]}"><i class="fas fa-times"></i></button>    
                        </div>
                        <div class="category-block-head">
                            <span class="category-block-title">${category["title"]}</span>
                        </div>
                        <div class="category-block-main">
                            <p class="category-block-text">${category["description"]}</p>
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

export default categoryComponent;
