import  Message, { MessageCreationAttributes }  from "../models/Message";

export class MessageService {

  static async postMessage(createMessageData:Omit<MessageCreationAttributes,'isSeen'>): Promise<Message> {
    const {fanId, celebrityId, content,} = {...createMessageData}
    try {
      const shoutout = await Message.create({
        content,
        isSeen:false ,
        fanId,
        celebrityId
       
      });
      return shoutout;
    } catch (error:any) {
      throw new Error(`Failed to create shoutout: ${error.message}`);
    }
  }



  static async markMessageAsSeen(messageId: number) {
    try {
      const message = await Message.findByPk(messageId);
      if (message) {
        message.isSeen = true;
        await message.save();
        return message;
      } else {
        throw new Error('Message not found');
      }
    } catch (error) {
      throw new Error('Failed to mark message as seen');
    }
  }


}
