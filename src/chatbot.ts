import OpenAI from 'openai';
import * as readline from 'readline';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  // Creates basic io stream
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Handles user input and returns a promise object that when resolved returns a string
  // `resolve` is a function that, when called, changes the state of the promise from "pending" to "fulfilled" with a value of the argument passed
  function getUserInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      // prompts "You" to the user, waits for user input, and then resolves with input an argument
      rl.question(prompt, resolve);
    });
  }

  // Initial message array to store the conversation history
  let messages = [];

  while (true) {  // Infinite loop to keep the chat going until the program is terminated
    const userMessage = await getUserInput('You: ');  // Get user input
    messages.push({ role: 'user', content: userMessage });  // Push to array, SDK expects either `role` or `assistant`

    // Make the API call to OpenAI with the updated messages array
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });

    const assistantMessage = chatCompletion.choices[0]?.message.content.trim(); // Gets first response and trims whitespace
    console.log(`Assistant: ${assistantMessage}`);  // Display response

    messages.push({ role: 'assistant', content: assistantMessage });
  }
}

main();