import Celebrity from "./Celebrity";
import { Fan } from "./Fan";


export type Message = {
  
    id: number;
       fanId:number
        celebrityId:number
          isSeen:boolean
          fan:Fan
          celebrity:Celebrity
    content: string;

  }
  