export class GroupExpenseModel {
  description: string;
  amount: number;
  divideBetweenAllMembers: boolean;
  tripId: string;
  userIds: string[];

  constructor(groupExpensePayload) {
    this.description = groupExpensePayload.description;
    this.amount  = groupExpensePayload.amount;
    this.divideBetweenAllMembers = groupExpensePayload.divideBetweenAllMembers;
    this.tripId = groupExpensePayload.tripId;
    this.userIds = groupExpensePayload.userIds;
  }
}