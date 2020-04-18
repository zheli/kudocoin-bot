"use strict";

function getTransaction(match, req) {
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
  const reg = /(\d+) :(.+): to <@(.+)\|(.+)> for (.*)/;
  const match = reg.exec(req.body.text);
  console.log("body");
  console.log(req.body);
  console.log("match");
  console.log(match);

  const at = new Date;
  const transaction = getTransaction(match, req);
  if (!transaction) {
    res.send({
      response_type: 'in_channel',
      text: 'Something went wrong'
    })
    return;
  } else {
    console.log(transaction||"undefined transaction");

    res.send({
      response_type: 'in_channel',
      // text: `Ok, I've transferred ${transaction.amount} :${transaction.emoji}: to ${transaction.receiverName}. Showing your appreciation is #caring! :heart:`
      text: 'This is a test'
    });
  }

  return;
}
