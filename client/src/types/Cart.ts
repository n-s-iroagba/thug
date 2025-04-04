import { Charity } from "./Charity";
import { ClubMembership } from "./ClubMembership";
import { Fan } from "./Fan";


export type CartItem = {
    fanId: number
    itemType: "ClubMembership" | "Charity" ;
    itemId: number;
    fan:Fan
    item:ClubMembership | Charity;
}