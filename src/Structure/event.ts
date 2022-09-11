import { ClientEvents } from "discord.js";
export class Event<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public run: (...args: ClientEvents[Key]) => any
  ) {}
}
/* class은 여러 보안요소가 존재
public은 보여줌.
private면 못봄.
*/
