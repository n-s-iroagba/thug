export type CreateMessage ={
    content: string,
    chatId: number,
    senderId: number,
    contactType:'text'|'video'|'voice',
    mediaUrl?:string,
    isSeen:boolean,
}