import { Event } from "src/Structure/event";

export default new Event("ready", () => {
  console.log(`Ready!!!`);
});
