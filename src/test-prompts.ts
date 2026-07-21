import { collectAnswers } from "./modules/collector/data.collector.ts";

async function run() {
  const answers = await collectAnswers();
  console.log("RAW ANSWERS:", answers);
}

run();