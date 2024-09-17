class userDTO {

    id;
    name;
    username;
    email;

    constructor(id, name, username, email) {
        this.id = id
        this.name = name
        this.username = username
        this.email = email
    }
}

module.exports = userDTO