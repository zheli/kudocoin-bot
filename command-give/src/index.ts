"use strict";

export async function handleGiveHttp(req, res) {
  const reg = /(\d+) :(.+): to <@(.+)\|(.+)> for (.*)/;
  const match = reg.exec(req.body.text);
  // console.log(req);
  console.log(req.body);
  // console.log(match);

  // const at = new Date;
  // const transaction = {
  //   amount: Number.parseInt(match[1]),
  //   emoji: match[2],
  //   receiverId: match[3],
  //   receiverName: match[4],
  //   reason: match[5],
  //   senderId: req.body.user_id,
  //   at,
  // };

  // console.log(transaction);

  res.send({
    response_type: 'in_channel',
    // text: `Ok, I've transferred ${transaction.amount} :${transaction.emoji}: to ${transaction.receiverName}. Showing your appreciation is #caring! :heart:`
    text: 'This is a test'
  });
}
