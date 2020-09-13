export class Transaction {
    constructor({amount, place, description, category_id, date, type, image}) {
        this.amount = amount;
        this.place = place;
        this.description = description;
        this.category_id = category_id;
        this.date = date;
        this.type = type;
        this.image = image;
    }
}
