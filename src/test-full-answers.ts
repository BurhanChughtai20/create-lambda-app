import { getUserAnswers } from "./modules/answers/get-user-answers.ts";

async function run() {
  const finalAnswers = await getUserAnswers();
  console.log("NORMALIZED ANSWERS:", finalAnswers);
}

run();