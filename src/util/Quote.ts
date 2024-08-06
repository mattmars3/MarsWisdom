export interface Quote {
  // actual body of the quote
  quote: string;

  // source of the quote, could be a band, writer, etc
  by: string;

  // can add more types in the future but I just use strings
  // instead of enums to maintain simplicity
  type: "lyric" | "quote";

  // is this a quote you would show on your personal website
  isExplicit: boolean;
}
