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

    categoryRef(uid) {
        return firebase.database().ref(`/category${uid}`);
    }

    async writeCategory({uid}, category) {
        const categoryNode = await this.categoryRef(uid).push();
        await categoryNode.set(
            {
                title: category.title,
                description: category.description,
                color: category.color,
                uid: categoryNode.key,
            }
        );
    }

    getCategories({uid}, callback) {
        this.getData(callback, this.categoryRef(uid));
    }

    async getCategoriesList({uid}) {
        const snapshot = await this.categoryRef(uid).once("value");
        return Object.values(snapshot.val() ?? []);
    }

    async getCategoriesDict({uid}) {
        const snapshot = await this.categoryRef(uid).once("value");
        return snapshot.val();
    }

    async removeCategory({uid}, categoryId) {
        await this.categoryRef(uid).child(categoryId).remove();
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
