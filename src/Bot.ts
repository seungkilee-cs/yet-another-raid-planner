// import { Client } from "discord.js";
// import { REST } from "@discordjs/rest";
import { ExtendedClient } from "./Structure/client";

import fs from "fs";

const { token } = process.env;
const {} = require("discord.js");

export const client = new ExtendedClient();

client.start();
// client.commands = new Collection();
// declare module "discord.js" {
//   export interface Client {
//     commands: Collection<unknown, any>;
//   }
// }
