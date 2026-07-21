import { normalizeAnswers } from "./modules/collector/data.collector.ts";
import { mergeDeep } from "./modules/merge/merge.package.ts";
import { collectTemplatePaths } from "./modules/template/template.mapping.ts";



// Test 1: empty selections
console.log(normalizeAnswers({ aws: [], database: "none" }));
// Expected: { aws: null, database: null }

// Test 2: kuch select kiya hua
console.log(normalizeAnswers({ aws: ["lambda", "logger"], database: "mongodb" }));
// Expected: { aws: { services: ["lambda", "logger"] }, database: { provider: "mongodb" } }

// Test 3: mergeDeep — conflict wala case
console.log(mergeDeep({ a: 1, deps: { express: "^4" } }, { deps: { express: "^5", cors: "^2" } }));
// Dekho kya jeeta — ^4 ya ^5? Ye tumhara design-decision test hai

// Test 4: template path resolver
console.log(collectTemplatePaths({ aws: { services: ["lambda"] }, database: null }));
// Expected: array with base path + lambda path, database path missing honi chahiye