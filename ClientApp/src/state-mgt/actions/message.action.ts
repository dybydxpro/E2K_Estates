import { Message } from "../../app/models/message";

export class AddMessage {
    static readonly type = '[Message] AddMessage';

    constructor(public message: Message) { }
}

export class UpdateMessage {
    static readonly type = '[Message] UpdateMessage';

    constructor(public id: string, public message?: Message) { }
}

export class DeleteMessage {
    static readonly type = '[Message] DeleteMessage';

    constructor(public id: string) { }
}

export class DestroyMessages {
    static readonly type = '[Message] DestroyMessages';

    constructor() { }
}