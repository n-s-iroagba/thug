export type Payment = {
    itemType: "ClubMembership" | "Charity" | "MeetGreet" | "Event";
    amount:number
    date:Date
    itemId:number
    fanId:number
}