class FirebaseService {

    async readUserData({uid}) {
        const snapshot = await firebase.database().ref("users/").child(uid).once("value");
        const data = snapshot.val();
        return data;
    }

    usersRef() {
        return firebase.database().ref("/users");
    }

    async writeUserData({uid}, email, username, name, surname) {
        await this.usersRef().child(uid).set(
            {
                email: email,
                username: username,
                name: name,
                surname: surname,
            }
        );
    }

    getData(callback, ref) {
        ref.on("value", (snapshot) => {
            if (snapshot.exists()) {
                callback(Object.values(snapshot.val()));
            } else {
                callback([]);
            }
        });
    }

    uploadImage(uid, image, callback) {
        const imageId = new Date().getTime();
        const imageUploadTask = firebase.storage().ref(`/images/${imageId}`).put(image);
        imageUploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            () => {},
            () => {},
            async () => {
                callback(imageId);
            }
        );
    }

    async retrieveImage(imageId) {
        return await firebase.storage().ref(`/images/${imageId}`).getDownloadURL();
    }
}

export default FirebaseService;
