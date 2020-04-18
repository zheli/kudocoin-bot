"use strict";

type Transaction = {
  amount: number;
  receiverId: string;
  receiverName: string;
  senderId: string;
  reason: string;
  emoji: string;
  at: Date;
}

function getTransaction(match, req): Transaction {
  const at = new Date;

  try {
    return {
      amount: Number.parseInt(match[1]),
      emoji: match[2],
      receiverId: match[3],
      receiverName: match[4],
      reason: match[5],
      senderId: req.body.user_id,
      at,
    };
  } catch(e) {
    console.error(e);
    return undefined;
  }
}

export async function handleGiveHttp(req, res) {
  // command text: <amount> <emoji> to <someone> <reason>
  const reg = /(\d+)\s:(.+):\sto\s<@(.+)\|(.+)>\sfor\s(.*)/;
  const match = reg.exec(req.body.text);
  console.log("Request body: ", JSON.stringify(req.body));

  const transaction = getTransaction(match, req);
  if (!transaction) {
    res.send({
      response_type: 'in_channel',
      text: 'Something went wrong'
    })
    return;
  } else {
    console.log("Generate transaction: ", JSON.stringify(transaction));

    res.send({
      response_type: 'in_channel',
      text: `Ok, I've transferred ${transaction.amount} :${transaction.emoji}: to ${transaction.receiverName}. Showing your appreciation is #caring! :heart:`
    });
  }

  return;
}
