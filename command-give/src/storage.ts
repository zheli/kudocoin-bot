import {Firestore, DocumentReference, DocumentData} from '@google-cloud/firestore';
import {v4 as uuid} from 'uuid';

export type Transaction = {
  amount: number;
  receiverId: string;
  receiverName: string;
  senderId: string;
  reason: string;
  emoji: string;
  at: Date;
};

const db = new Firestore({
  projectId: process.env.GCP_PROJECT,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export async function storeTransaction(transaction: Transaction): Promise<DocumentReference<DocumentData>> {
  console.log('Store transaction:', JSON.stringify(transaction));
  const docRef = await db.collection('transactions').add(transaction).then(ref => {
    console.log(`Transaction stored, id: ${ref.id}`);
    return ref;
  });
  return docRef;
}
