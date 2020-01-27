export default class Message {
    public messageText: string;
    public userId: string;
    public conversationId: string;
    public createdAt: Date;
    constructor(
        messageText: string,
        userId: string,
        conversationId: string,
    ) {
        this.messageText = messageText;
        this.userId = userId;
        this.conversationId = conversationId;
        this.createdAt = new Date();
    }
}