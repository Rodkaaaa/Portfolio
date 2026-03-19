export type CheatAction = () => void;

type Cheat = {
  code: string;
  action: CheatAction;
};

export class CheatSystem {
  private buffer = "";
  private cheats: Cheat[];

  constructor(cheats: Cheat[]) {
    this.cheats = cheats;
  }

  handleKey(key: string) {
    this.buffer += key.toUpperCase();

    if (this.buffer.length > 20) {
      this.buffer = this.buffer.slice(-20);
    }

    this.cheats.forEach((cheat) => {
      if (this.buffer.includes(cheat.code)) {
        cheat.action();
        this.buffer = "";
      }
    });
  }
}