import inquirer from "inquirer";
import { getAllQuotesFromFile, writeQuoteArrayToFile } from "../util/writeQuote";
import { Keyword, Quote } from "../util/Quote";
import { exit } from "process";

export async function addQuoteWithTui() {
  try {
    const answers = await getQuoteTuiAnswers();

    // check if we should write to file
    if (answers["writeToFile"] == false) {
      // exit and don't write to file
      console.log("Exiting without writing to file.");
      return;
    }

    // read all quotes in file
    const allQuotes = await getAllQuotesFromFile();

    const quoteToPush: Quote = answersToQuote(answers);

    // append to quote list
    allQuotes.push(quoteToPush);

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

// this is used to filter out fields that aren't necessary for the quote
// but may be relevant for other functionality
export function answersToQuote(answer: object): Quote {
  return {
    quote: answer['quote'],
    by: answer['by'],
    type: answer['type'],
    isExplicit: answer['isExplicit'],
    keywords: answer['keywords']
  } 
}

// the prompts that are sent to inquirer to query the user for quote information
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
  },
  {
    type: "checkbox",
    message: "Select keywords for this quote",
    name: 'keywords',
    choices: [
      "funny",
      "inspirational",
      "critical",
      "thought-provoking"
    ]
  },
  {
    type: "confirm",
    name: "writeToFile",
    message: "Write this quote to file?"
  }
];
