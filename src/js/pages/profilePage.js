import {firebaseService} from "../services/index.js";

let user;

let ProfilePage = {
    render: async () => {
        user = firebase.auth().currentUser;
        const userInfo = await firebaseService.readUserData(user);
        let view =  /*html*/`
            <div class="profile-wrap">
                <div class="profile-card">
                    <div class="profile-img"><img height="170px" src="img/ProfileDefault.png"></div>
                    <div class="profile-title">${user.displayName ? user.displayName : localStorage.getItem("username")}</div>
                    <div class="profile-item">
                        <span class="profile-def">Email:</span>
                        <span class="profile-desc">${userInfo["email"]}</span>
                    </div>
                    <div class="profile-item">
                        <span class="profile-def">Name:</span>
                        <span class="profile-desc">${userInfo["name"]}</span>
                    </div>
                    <div class="profile-item">
                        <span class="profile-def">Surname:</span>
                        <span class="profile-desc">${userInfo["surname"]}</span>
                    </div>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {
    }
}

export default ProfilePage;
