import inquirer from "inquirer";
import { getAllQuotesFromFile, writeQuoteArrayToFile } from "../util/writeQuote";
import { Quote } from "../util/Quote";

export async function promptWithTui() {
  try {
    const answers = await getQuoteTuiAnswers();
    
    // read all quotes in file
    const allQuotes = await getAllQuotesFromFile();

    // append
    allQuotes.push(answers as Quote)

    // write to file
    await writeQuoteArrayToFile(allQuotes);
  } catch (promptError) {
    console.error("Failed to obtain quote details from TUI:", promptError);
  }
}

export async function getQuoteTuiAnswers(): Promise<object> {
  const response = await inquirer.prompt(questions);
  return response;
}

const questions: any = [
  {
    type: "input",
    name: "quote",
    message: "Enter the quote",
  },
  {
    type: "input",
    name: "by",
    message: "Enter the source of the quote",
  },
  {
    type: "list",
    name: "type",
    message: "Enter quote type",
    choices: ["quote", "lyric"],
  },
  {
    type: "confirm",
    name: "isExplicit",
    message: "Is this quote explicit?",
  }
];
