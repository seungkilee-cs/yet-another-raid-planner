import { Event } from "../Structure/event";

export default new Event("ready", () => {
  console.log(`Ready!!!`);
});
