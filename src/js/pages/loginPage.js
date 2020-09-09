import {Router} from "../router.js";
import {parseFrom} from "../helpers/parseForm.js";

let LoginPage = {
    render: async () => {
        let view =  /*html*/`
            <form class="sign-in-form">
                <h2 class="sign-in-title">Log In</h3>
                <span class="sign-in-text">Log in to the existing account</span>
                <input required name="email" type="text" class="sign-in-input" placeholder="E-mail">
                <input required name="pass" type="password" class="sign-in-input" placeholder="Password">
                <div>
                    <input class="sign-in-button" type="submit" value="Log in">
                </div>
            </form>

            <div class="sign-in-img">
        `
        return view;
    },
    after_render: async () => {
        let form = document.querySelector(".sign-in-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formValues = parseFrom(form);
            loginUser(formValues["email"], formValues["pass"]);
        });
    }
}

function loginUser(email, pass) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            Router._instance.navigate("/profile");
        })
        .catch(error => {
            alert(error);
        });
}

export default LoginPage;
