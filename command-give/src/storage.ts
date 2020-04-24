import {Firestore, DocumentReference, DocumentData, WriteResult} from '@google-cloud/firestore';
import {v4 as uuid} from 'uuid';

export type IncomingTransaction = {
  amount: number;
  receiverId: string;
  receiverName: string;
  senderId: string;
  reason: string;
  emoji: string;
  at: Date;
};

interface Transaction extends IncomingTransaction {
  id: string;
}

const db = new Firestore({
  projectId: process.env.GCP_PROJECT,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export async function storeTransaction(transaction: IncomingTransaction): Promise<DocumentReference<DocumentData>> {
  console.log('Store transaction:', JSON.stringify(transaction));
  const docRef = await db.collection('transactions').add(transaction).then(ref => {
    console.log(`Transaction stored, id: ${ref.id}`);
    return ref;
  });
  return docRef;
}

export async function setWalletBalance(userId: string, balance: number) {
  console.log(`Update wallet for ${userId}: set balance to ${balance}`);
  const docRef = db.collection('wallets').doc(userId);
  return await docRef.set({totalBalance:balance}, {merge: true}).then(ref => {
    console.log('Wallet balance updated, id:', JSON.stringify(docRef));
    return ref;
  })
}

export async function updateWalletEmoji(userId: string, emoji: string, emojiBalance: number): Promise<WriteResult>{
  console.log(`Update wallet for ${userId}: set ${emoji} balance to ${emojiBalance}`);
  const docRef = db.collection('wallets').doc(userId);
  return await docRef.set({emojiBalances:{[emoji]: emojiBalance}}, {merge: true}).then(ref => {
    console.log('Wallet balance updated, id:', JSON.stringify(docRef));
    return ref;
  })
}
