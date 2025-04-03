import { Charity } from "./Charity";
import { ClubMembership } from "./ClubMembership";
import { Fan } from "./Fan";
import { Souvenir } from "./Souvenir";
import { Ticket } from "./Ticket";
import { Tour } from "./Tour";

export type Cart = {
    fanId: number
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    itemId: number;
    fan:Fan
    item:ClubMembership | Charity| Ticket | Souvenir | Tour;
}