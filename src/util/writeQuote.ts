import { Quote } from "./Quote";
import { promises as fs } from 'fs'

const QUOTE_FILE_PATH = "/home/matt/quotes.json"

export async function getAllQuotesFromFile(): Promise<Quote[]> {
  // read the file 
  const quoteFileContents = await fs.readFile(QUOTE_FILE_PATH, { encoding: 'utf8' }) 
  const allQuotes: Quote[] = JSON.parse(quoteFileContents);

  return allQuotes; 
}

export async function writeQuoteArrayToFile(allQuotes: Quote[]) {
  await fs.writeFile(QUOTE_FILE_PATH, JSON.stringify(allQuotes))
}
