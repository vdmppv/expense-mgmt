export const noteComponent = (note) => {
    return {
        render: async () => {
            let view = `
                <li>
                    <div class="note-block" style="background: ${note["color"]};">
                        <div class="note-block-buttons">
                            <button class="note-block-button"><i class="fas fa-cog"></i></button>
                            <button class="note-block-button" id="note-component-delete" data-href="${note["uid"]}"><i class="fas fa-times"></i></button>    
                        </div>
                        <div class="note-block-head">
                            <span class="note-block-title">${note["title"]}</span>
                        </div>
                        <div class="note-block-main">
                            <p class="note-block-text">${note["description"]}</p>
                        </div>
                        <div class="note-block-bottom">
                            <span class="note-block-text">${note["timeCreated"]}</span>
                            <span class="note-block-text" id="note-time-alarm">${note["timeAlarm"]}</span>
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
