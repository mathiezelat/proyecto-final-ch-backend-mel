class MessageDto {
    constructor(message) {
        this.id = message._id;
        this.email = message.email;
        this.message = message.message;
        this.type = message.type;
        this.timestamp = message.timestamp;
    }
}

module.exports = MessageDto;