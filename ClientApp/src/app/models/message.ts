import { Msg } from "./enum";

export interface Message {
    id: string;
    ownerType: Msg;
    text: any;
}