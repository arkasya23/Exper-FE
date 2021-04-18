export class GroupExpenseResponseModel {
  id: string;
  description: string;
  amount: number;
  divideBetweenAllMembers: boolean;
  tripId: string;
  createdBy: {
    id: string,
    email: string
  };

  users: {
    id: string, 
    email: string
  }[];
}