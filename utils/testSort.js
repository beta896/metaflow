import { sortVerdicts } from "./verdictSorter.js";

const verdicts = [
  { title: "Alpha", timestamp: "2025-08-25T10:00:00Z" },
  { title: "Omega", timestamp: "2025-08-25T20:00:00Z" },
  { title: "Delta", timestamp: "2025-08-25T15:00:00Z" }
];

console.log(sortVerdicts(verdicts));
