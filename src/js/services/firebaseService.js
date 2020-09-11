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
    
    transactionRef(uid) {
        return firebase.database().ref(`/transaction${uid}`);
    }

    async writeTransaction({uid}, transaction) {
        const transactionNode = await this.transactionRef(uid).push();
        await transactionNode.set(
            {
                amount: transaction.amount,
                place: transaction.place,
                description: transaction.description,
                category_id: transaction.category_id,
                date: transaction.date,
                type: transaction.type,
                uid: transactionNode.key,
                image: null
            }
        );
        if (transaction.image) {
            this.uploadImage(uid, transaction.image,  async (imageId) => {
                await transactionNode.update(
                    {
                        image: imageId,
                    }
                );
            });
        }
    }

    getTransactions({uid}, callback) {
        this.getData(callback, this.transactionRef(uid));
    }

    async getTransactionsFromCategory({uid}, categoryId) {
        const snapshot = await this.transactionRef(uid).orderByChild("category_id").equalTo(categoryId).once("value");
        return Object.values(snapshot.val() ?? []);
    }

    async getTransactionsFromDate({uid}, fromDate) {
        const snapshot = await this.transactionRef(uid).orderByChild("date").startAt(fromDate).once("value");
        return Object.values(snapshot.val() ?? []);
    }

    async removeTransaction({uid}, transactionId) {
        await this.transactionRef(uid).child(transactionId).remove();
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
