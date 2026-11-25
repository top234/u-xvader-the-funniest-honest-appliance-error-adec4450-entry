import { mkdirSync, writeFileSync } from "node:fs";

// Appliance error: a washing machine reports a blocked drain (real code E21),
// defeated not by a heavy load but by a single sock — then asks for a minute,
// like a tired worker, not a machine.
// The laugh comes from the truth of the fault: a 9 kg drum losing to one sock.
const error =
  "Error E21: drain blocked by one sock. I spin 9 kg of laundry and lost to a sock. Please remove it. I need a minute.";

const MAX_CHARS = 200;

function checkEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry is ${chars.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(error);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, error, "utf8");
}

main();
