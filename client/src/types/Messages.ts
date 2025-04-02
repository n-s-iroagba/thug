import { Chat } from "./Chat";

export type Message = {
    id: number;
    senderId: number;
    content: string;
    contactType: "text" | "video" | "voice" | "image";
    mediaUrl: string | null;
    isSeen: boolean;
    createdAt: Date;
    chat:Chat;
    chatId:number
  }
  