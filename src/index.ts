import { addQuoteWithTui } from "./tui/tui"

(async () => {
  try {
    addQuoteWithTui();
  } catch (error) {
    console.log("Exiting TUI");
  }
})()
