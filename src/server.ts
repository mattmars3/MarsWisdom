import { Application, Request, Response } from 'express';
import express from 'express';
import { requestHasExtremelySecretSuperSecureTokenMiddleware } from './basicAuth';
import { getAllQuotesFromFile, writeQuoteArrayToFile } from './writeQuote';
import { Quote } from './Quote';

const SERVER_PORT = 2000;

export default async function setupServer() {
  console.log("Setting up server")
  
  const quoteApplication: Application = express();

  quoteApplication.use(express.json());
  quoteApplication.use(requestHasExtremelySecretSuperSecureTokenMiddleware);

  quoteApplication.get('/quote/', async (req: Request, res: Response) => await getQuoteRoute(req, res));

  quoteApplication.post(/quote/, async (req: Request, res: Response) => await addQuoteRoute(req, res));

  quoteApplication.listen(SERVER_PORT, () => {
    console.log(`Quote server is running on port ${SERVER_PORT}.`)
  })
}

async function getQuoteRoute(req: Request, res: Response) {
  // get all quotes
  const allQuotes = await getAllQuotesFromFile();

  const randomQuoteNumber = Math.floor(Math.random() * allQuotes.length);

  const randomQuote = allQuotes[randomQuoteNumber];

  return res.status(200).json({quote: JSON.stringify(randomQuote)})
}

async function addQuoteRoute(req: Request, res: Response) {
  // get all quotes
  const allQuotes: Quote[] = await getAllQuotesFromFile();

  // get quote from body parameters
  const requestBody = req.body;

  if (!requestBody) {
    return res.status(400).json({message: "no request body with quote"});
  }

  try {
    // parse quote
    const quoteBody: string = requestBody["quote"]

    console.log("QUOTEBODY:", JSON.parse(quoteBody));

    const quoteToAdd: Quote = JSON.parse(requestBody["quote"]) as Quote;


    allQuotes.push(quoteToAdd);
  } catch {
    return res.status(400).json({message: "Unable to parse "})
  }
   
  // write to the quote file
  await writeQuoteArrayToFile(allQuotes);

  return res.status(200).json({message: "Succeeded"})
}
