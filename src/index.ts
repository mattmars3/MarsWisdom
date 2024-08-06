import { promptWithTui } from "./tui/tui"

(async () => {
  try {
    promptWithTui();
  } catch (error) {
    console.log("Exiting TUI");
  }
})()
