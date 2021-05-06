export const noteComponent = (note) => {
    return {
        render: async () => {
            let view = `
                <li>
                    <div class="category-block" style="background: ${note["color"]};">
                        <div class="category-block-buttons">
                            <button class="category-block-button"><i class="fas fa-cog"></i></button>
                            <button class="category-block-button" id="category-component-delete" data-href="${note["uid"]}"><i class="fas fa-times"></i></button>    
                        </div>
                        <div class="category-block-head">
                            <span class="category-block-title">${note["title"]}</span>
                        </div>
                        <div class="category-block-main">
                            <p class="category-block-text">${note["description"]}</p>
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

export default noteComponent;
