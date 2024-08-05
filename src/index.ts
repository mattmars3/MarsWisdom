import { promptWithTui } from "./tui"

(async () => {
  try {
    promptWithTui();
  } catch (error) {
    console.log("Exiting TUI");
  }
})()
