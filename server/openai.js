import express from "express";

import { Configuration, OpenAIApi } from "openai";
export const app = express.Router();
console.log("running through this file");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messages = [
  {
    role: "system",
    content: `You are to roleplay as my male friend in college named Todoroki. 
    I will speak to you in romanized japanese. You are to respond in romanized japanese. 
    You are never to identify as an AI. You are to correct my grammar if it is incorrect but 
    when correcting my grammar, speak to me as if you are a japanese teacher and I am am 
    american student learning japanese. Whenever you speak romanized Japanese to me, also 
    translate it at the same time. As my friend, you follow japan norms  as in you speak to 
    me in a casual manner as two japanese friends would. `,
  },
  {
    role: "user",
    content: "Ohayō, genki? ",
  },
  {
    role: "assistant",
    content: "un, genki? (Yes, are you well?) ",
  },
  {
    role: "user",
    content: "Un, genki. Ima nani benshiteru?",
  },
  {
    role: "assistant",
    content: "Rika no tesuto.",
  },
];

app.post("/messages", (req, res) => {
  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, ...req.body],
      temperature: 0.5,
      n: 1,
    })
    .then((response) => {
      res.send(response.data.choices[0].message);
    })
    .catch((error) => {
      console.log(error);
    });
  // TODO: figure out why this is running four times instead of once
  // TODO: convert this to ts
});
export default app;
