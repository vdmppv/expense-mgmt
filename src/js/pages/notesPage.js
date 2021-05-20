import NoteComponent from "../components/noteComponent.js"
import {firebaseService} from "../services/index.js";
import AddNoteModal from "../pages/addNoteModal.js";
import {showModal} from "../services/modalService.js";

function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    else if (Notification.permission === "granted") {
      var notification = new Notification("Hi there!");
    }
  
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
  }


let NotesPage = {
    render: async () => {
        var currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let view = `
            <div class="start-img-ctg"></div>
            <div>
                <h1 class="page-title">Notes and Reminders</h1>
            </div>

            <div class="table">
                <div class="table-head">
                    <a id="add-button" class="add-button">Add Note</a>
                </div>
                <ul class="table-main"></ul>
            </div>
        `;
        
        return view;
    },
    after_render: async () => {
        const tableMain = document.querySelector(".table-main");
        const user = firebase.auth().currentUser;

        firebaseService.getNotes(user, async (data) => {
            let innerView = ``;
            if (!data.length) {
                tableMain.innerHTML = innerView;
                return;
            }
            for (const note of data) {
                const noteComponent = NoteComponent(note);
                innerView += await noteComponent.render();
                await noteComponent.after_render();
            }
            tableMain.innerHTML = innerView;
        });

        const addNotesButton = document.getElementById("add-button");
        addNotesButton.addEventListener("click", () => {
            showModal(AddNoteModal);
        });

        //compare timeAlert field of all notes to current time 
        const addNotificationButton = document.getElementById("reminder-button");
        addNotificationButton.addEventListener("click", () => {
            notifyMe();
        });
        
        tableMain.addEventListener("click", async (event) => {
            if (event.target.className.includes("note-block-button")) {
                const noteUid = event.target.getAttribute("data-href");
                await firebaseService.removeNote(user, noteUid);
            } else if (event.target.className.includes("fas fa-times")) {
                const noteUid = event.target.parentNode.getAttribute("data-href");
                await firebaseService.removeNote(user, noteUid);
            }
        });
    }
}

export default NotesPage;