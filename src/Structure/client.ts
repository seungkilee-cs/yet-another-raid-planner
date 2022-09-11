import {
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import fs from "fs";
import { Key } from "readline";
import { Event } from "./event";
import glob from "glob";
import { promisify } from "util";
// import { path } from "_path";

const globPromise = promisify(glob);
export class ExtendedClient extends Client {
  commands: Collection<any, any> = new Collection();
  commandsArray: Array<any> = [];
  constructor() {
    // class 오브젝트에 새로운 컬렉션 추가
    super({ intents: GatewayIntentBits.Guilds });
    // 본판 가져오는 것
  }
  loadCommands() {
    const commandFiles = fs
      .readdirSync(`./src/commands`)
      .filter((file: string) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      //   this.commands.set(command.data.name, command);
      //   this.commandsArray.push(command.dat.toJSON());
    }
    // ./ = 현재 다이렉토리 ../ 상위 다이렉토리
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }
  async loadEvents() {
    const eventFiles = await globPromise(`
      ${__dirname}/../events/*{.ts,.js}`);
    console.log({ eventFiles });
    eventFiles.forEach(async (file) => {
      const event: Event<keyof ClientEvents> = await this.importFile(file);
    });
  }
}

// (client.handleEvents = async () => {
//     const eventFolders = fs.readdirSync(`./src/events`);

//     for (const folder of eventFolders) {
//       const eventFiles = fs
//         .readdirSync(`./src/events/${folder}`)
//         .filter(file => file.endsWith('.js'));
//       switch (folder) {
//         case 'client':
//           for (const file of eventFiles) {
//             const event = require(`../../events/${folder}/${file}`);
//             if (event.once)
//               client.once(event.name, (...args) =>
//                 event.execute(...args, client)
//               );
//             else
//               client.on(event.name, (...args) =>
//                 event.execute(...args, client)
//               );
//           }
//           break;

//         default:
//           break;
//       }
// const functionFolders = fs.readdirSync(`./src/functions`);
// for (const folder of functionFolders) {
//   const functionFiles = fs
//     .readdirSync(`./src/functions/${folder}`)
//     .filter((file: string) => file.endsWith(`.ts`));
//   for (const file of functionFiles)
//     require(`./functions/${folder}/${file}`)(client);
// }
