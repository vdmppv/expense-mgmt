import {Router} from "../router.js";
import {parseFrom} from "../helpers/parseForm.js";
import {firebaseService} from "../services/index.js";

let RegisterPage = {
    render: async () => {
        let view =  /*html*/`
            <form class="sign-in-form">
                <h2 class="sign-in-title">Create new Expenser account</h2>
                <input required name="email" type="email" class="sign-in-input" placeholder="E-mail">
                <input required name="name" type="text" class="sign-in-input" placeholder="First Name">
                <input required name="surname" type="text" class="sign-in-input" placeholder="Last Name">
                <input required name="username" type="text" class="sign-in-input" placeholder="Username">
                <input required name="pass" type="password" minlength="6" class="sign-in-input" placeholder="Password">
                <input required name="repeat-pass" type="password" minlength="6" class="sign-in-input" placeholder="Repeat Password">
                <input class="sign-in-button" type="submit" value="Register">
            </form>
            
            <div class="sign-up-img">
        `
        return view;
    },

    after_render: async () => {
        let form = document.querySelector(".sign-in-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formValues = parseFrom(form);
            if (formValues["pass"] != formValues["repeat-pass"]) {
                alert("Passwords do not match!");
            } else {
                registerUser(formValues);
            }
        });
    }
}

function registerUser(values) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(values["email"], values["pass"])
        .then((res) => {
            return res.user.updateProfile({displayName: values["username"]})
                .then(() => {
                    firebaseService.writeUserData(auth.currentUser, values["email"], values["username"], values["name"], values["surname"]);
                    localStorage.setItem("username", values["username"])
                    Router._instance.navigate("/profile");
                })
        }).catch(error => {
            alert(error);
        });
}

export default RegisterPage;
