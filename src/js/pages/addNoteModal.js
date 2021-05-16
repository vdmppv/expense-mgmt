import {firebaseService} from "../services/index.js";
import {closeModal} from "../services/modalService.js";
import {Note} from "../models/note.js";

let AddNoteModal = {
    render: async () => {
        let view = `
            <form class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">New note</h2>
                </div>
                
                <div class="modal-main">
                    <input required id="category-title" maxlength="50" class="modal-input" type="text" placeholder="Title">
                    <input required id="category-description" maxlength="256" class="modal-input" type="text" placeholder="Description">
                    <input required id="category-color" class="choose-color" type="color" value="#38a9ff"> 
                    <input required id="note-timer" class="modal-input" type="time">
                </div>
    
                <div class="modal-footer">
                    <button id="add-category-button" class="modal-button">Add Note</button>
                    <button id="category-close-button" class="modal-button-red">Close</button> 
                </div>
            </form>
        `;
        
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;
        const noteTitle = document.getElementById("category-title");
        const noteDescripton = document.getElementById("category-description");
        const noteColor = document.getElementById("category-color");
        const noteTimer = document.getElementById("note-timer");
        const form = document.querySelector(".modal");
        const dateTime = new Date();
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const note = new Note(
                {
                    title: noteTitle.value,
                    description: noteDescripton.value,
                    color: noteColor.value,
                    timeCreated: dateTime.toLocaleString(),
                    timeAlarm: noteTimer.value
                }
            );
            await firebaseService.writeNote(user, note);
            closeModal();
        });

        const noteCloseButton = document.getElementById("category-close-button");
        noteCloseButton.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    }
}

export default AddNoteModal;
