export type Transaction = {
  amount: number;
  receiverId: string;
  receiverName: string;
  senderId: string;
  reason: string;
  emoji: string;
  at: Date;
}

async function storeTransaction(transaction: Transaction): Promise<void> {

}
