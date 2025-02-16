import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Message } from '../../app/models/message';
import { AddMessage, UpdateMessage, DeleteMessage, DestroyMessages } from './../actions/message.action';

export class MessageStateModel {
    messageData: Message[];

    constructor() {
        this.messageData = [];
    }
}

@State<MessageStateModel>({
    name: 'messageData',
    defaults: {
        messageData: []
    }
})
export class MessageState {
    @Selector()
    static getMessage(state: MessageStateModel) {
        return state.messageData;
    }

    @Action(AddMessage)
    AddChat({ getState, patchState }: StateContext<MessageStateModel>, { message }: AddMessage) {
        const state = getState();
        patchState({
            messageData: [...state.messageData, message]
        });
    }

    @Action(UpdateMessage)
    UpdateMessage({ getState, patchState }: StateContext<MessageStateModel>, { id, message }: UpdateMessage) {
        if (message !== null && message !== undefined) {
            patchState({
                messageData: getState().messageData.map((c: Message) => {
                    if (c.id === id) {
                        return message;
                    }
                    return c;
                })
            });
        }
    }

    @Action(DeleteMessage)
    DeleteMessage({ getState, patchState }: StateContext<MessageStateModel>, { id }: DeleteMessage) {
        patchState({
            messageData: getState().messageData.filter((a: Message) => a.id != id)
        });
    }

    @Action(DestroyMessages)
    DestroyMessages({ getState, patchState }: StateContext<MessageStateModel>, {}: DestroyMessages) {
        patchState({
            messageData: getState().messageData = []
        });
    }
}