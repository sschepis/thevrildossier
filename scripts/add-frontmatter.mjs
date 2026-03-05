#!/usr/bin/env node
/**
 * @deprecated  — ONE-TIME MIGRATION SCRIPT
 *
 * This script was used to add YAML frontmatter to the first 28 chapter files.
 * It should NOT be re-run; the hardcoded chapter list below does not include
 * chapters 22-26, appendices H-J, or any chapters added after the initial migration.
 *
 * For new chapters, add YAML frontmatter manually (see existing files for the format).
 *
 * Original purpose:
 * Adds YAML frontmatter to all chapter markdown files.
 * Pulls metadata from the existing chapters.ts data and adds tags.
 * Run once: node scripts/add-frontmatter.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "src", "content", "chapters");

// Chapter metadata (mirrors chapters.ts)
const chapters = [
  {
    number: 0,
    slug: "frontmatter",
    title: "Frontmatter",
    subtitle: "A Note to the Reader",
    part: 0,
    partTitle: "Frontmatter",
    file: "00_frontmatter.md",
    epigraph: "",
    tags: ["introduction", "methodology", "disclaimer"],
  },
  {
    number: 1,
    slug: "the-man-who-remembered",
    title: "The Man Who Remembered",
    subtitle: "Chapter 1",
    part: 1,
    partTitle: "The Premise and the Witness",
    file: "01_the_man_who_remembered.md",
    epigraph: "I was memory repressed about the cloning stuff until I was 30 years old. They call it the awakening.",
    tags: ["marshall", "testimony", "cloning", "witness", "memory-suppression"],
  },
  {
    number: 2,
    slug: "taxonomy-of-a-hidden-species",
    title: "The Vril: Taxonomy of a Hidden Species",
    subtitle: "Chapter 2",
    part: 1,
    partTitle: "The Premise and the Witness",
    file: "02_taxonomy_of_a_hidden_species.md",
    epigraph: "I'm not sure of their origins, but they're the highly evolved lizard species.",
    tags: ["vril", "species", "taxonomy", "biology", "parasitic", "droning"],
  },
  {
    number: 3,
    slug: "the-droning-protocol",
    title: "The Droning Protocol",
    subtitle: "Chapter 3",
    part: 1,
    partTitle: "The Premise and the Witness",
    file: "03_the_droning_protocol.md",
    epigraph: "The old person's consciousness is gone. The body is absolutely, totally dominated.",
    tags: ["droning", "vril", "consciousness", "parasitic", "black-eye", "body-takeover"],
  },
  {
    number: 4,
    slug: "cloning-technology",
    title: "The Cloning Technology: Mark I through Mark IV",
    subtitle: "Chapter 4",
    part: 2,
    partTitle: "The Infrastructure",
    file: "04_cloning_technology.md",
    epigraph: "Human cloning—I have to tell you, it's been done since the end of World War 2.",
    tags: ["cloning", "technology", "mark-systems", "consciousness-transfer", "infrastructure"],
  },
  {
    number: 5,
    slug: "cloning-stations",
    title: "The Cloning Stations: Geography and Architecture",
    subtitle: "Chapter 5",
    part: 2,
    partTitle: "The Infrastructure",
    file: "05_cloning_stations.md",
    epigraph: "The cloning station is like a small sports venue, like a dog and pony show.",
    tags: ["cloning-stations", "underground", "geography", "architecture", "dumbs"],
  },
  {
    number: 6,
    slug: "geological-foundation",
    title: "The Geological Foundation: Why New Mexico",
    subtitle: "Chapter 6",
    part: 2,
    partTitle: "The Infrastructure",
    file: "06_geological_foundation.md",
    epigraph: "They need a methane-oxygen mix to breathe, and deep underground they got sulfur pools.",
    tags: ["geology", "new-mexico", "underground", "methane", "sulfur", "caves", "dumbs"],
  },
  {
    number: 7,
    slug: "mkultra-reloaded",
    title: "MKUltra Reloaded: Clone-Based Programming",
    subtitle: "Chapter 7",
    part: 3,
    partTitle: "The Operations",
    file: "07_mkultra_reloaded.md",
    epigraph: "MKUltra didn't end. It just changed. They don't need drugs anymore.",
    tags: ["mkultra", "cia", "mind-control", "cloning", "programming", "intelligence"],
  },
  {
    number: 8,
    slug: "the-celebrity-machine",
    title: "The Celebrity Machine",
    subtitle: "Chapter 8",
    part: 3,
    partTitle: "The Operations",
    file: "08_the_celebrity_machine.md",
    epigraph: "I always put little hints in the songs, in lyrics and stuff, wherever I could.",
    tags: ["celebrities", "music", "entertainment", "songwriting", "soul-selling", "contracts"],
  },
  {
    number: 9,
    slug: "the-elite-gathering",
    title: "The Elite Gathering: Who Attends",
    subtitle: "Chapter 9",
    part: 3,
    partTitle: "The Operations",
    file: "09_the_elite_gathering.md",
    epigraph: "World leaders, prime ministers, presidents, royalty, celebrities, crime bosses—they're all there.",
    tags: ["elites", "gatherings", "royalty", "politicians", "queen-elizabeth", "cloning-stations"],
  },
  {
    number: 10,
    slug: "remote-assassination",
    title: "Remote Assassination and Deterrence",
    subtitle: "Chapter 10",
    part: 3,
    partTitle: "The Operations",
    file: "10_remote_assassination.md",
    epigraph: "Megadeth. That's what that means. Infinite death loops.",
    tags: ["assassination", "deterrence", "megadeth", "pain", "clone-death", "enforcement"],
  },
  {
    number: 11,
    slug: "tartarian-reset",
    title: "The Tartarian Reset and the Mud Flood",
    subtitle: "Chapter 11",
    part: 4,
    partTitle: "The Historical Framework",
    file: "11_the_tartarian_reset.md",
    epigraph: "Look at the buildings. Look at how they're buried. That didn't happen by accident.",
    tags: ["tartaria", "mud-flood", "reset", "history", "architecture", "buried-buildings", "worlds-fairs"],
  },
  {
    number: 12,
    slug: "orphan-trains",
    title: "Orphan Trains and Repopulation",
    subtitle: "Chapter 12",
    part: 4,
    partTitle: "The Historical Framework",
    file: "12_orphan_trains.md",
    epigraph: "Where did all the children come from? Where did they all go?",
    tags: ["orphan-trains", "children", "repopulation", "history", "trafficking", "documentation-gaps"],
  },
  {
    number: 13,
    slug: "eschatological-framework",
    title: "The Eschatological Framework: Satan's Little Season",
    subtitle: "Chapter 13",
    part: 4,
    partTitle: "The Historical Framework",
    file: "13_eschatological_framework.md",
    epigraph: "Some of them think they're demons. The book of Revelation talks about it.",
    tags: ["eschatology", "revelation", "satan", "demons", "religion", "biblical", "little-season"],
  },
  {
    number: 14,
    slug: "the-scapegoat-engine",
    title: "The Scapegoat Engine",
    subtitle: "Chapter 14",
    part: 4,
    partTitle: "The Historical Framework",
    file: "14_the_scapegoat_engine.md",
    epigraph: "They use antisemitism as a shield. Blame the Jews so nobody looks at the lizards.",
    tags: ["antisemitism", "scapegoat", "conspiracy-theories", "misdirection", "bloodline-families"],
  },
  {
    number: 15,
    slug: "epstein-network",
    title: "The Epstein Network as Vril Logistics",
    subtitle: "Chapter 15",
    part: 5,
    partTitle: "The Connections",
    file: "15_epstein_network.md",
    epigraph: "The infrastructure is right there. You just have to look at what it was actually for.",
    tags: ["epstein", "trafficking", "zorro-ranch", "new-mexico", "intelligence", "tunnels", "little-st-james", "maxwell"],
  },
  {
    number: 16,
    slug: "cultural-encoding",
    title: "Cultural Encoding: Predictive Programming or Confession?",
    subtitle: "Chapter 16",
    part: 5,
    partTitle: "The Connections",
    file: "16_cultural_encoding.md",
    epigraph: "I always put little hints in the songs, in lyrics and stuff, wherever I could.",
    tags: ["cultural-encoding", "movies", "television", "music", "stargate", "predictive-programming", "they-live", "matrix"],
  },
  {
    number: 17,
    slug: "detection-problem",
    title: "The Detection Problem",
    subtitle: "Chapter 17",
    part: 5,
    partTitle: "The Connections",
    file: "17_the_detection_problem.md",
    epigraph: "There is a way to detect them. You have to detect them with a CT scan or an MRI.",
    tags: ["detection", "ct-scan", "mri", "psychopathy", "fema", "identification", "medical"],
  },
  {
    number: 18,
    slug: "the-disclosure-parallel",
    title: "The Disclosure Parallel: UAPs and Non-Human Intelligence",
    subtitle: "Chapter 18",
    part: 5,
    partTitle: "The Connections",
    file: "18_the_disclosure_parallel.md",
    epigraph: "They're not from out there. They're from down here.",
    tags: ["uap", "disclosure", "aliens", "nhi", "grusch", "congress", "ultraterrestrial", "intelligence"],
  },
  {
    number: 19,
    slug: "the-unified-map",
    title: "The Unified Map",
    subtitle: "Chapter 19",
    part: 6,
    partTitle: "Synthesis and Implications",
    file: "19_the_unified_map.md",
    epigraph: "Everything connects. Every single thing I've told you connects to everything else.",
    tags: ["synthesis", "evidence", "convergence", "unified-theory", "connections"],
  },
  {
    number: 20,
    slug: "epistemological-question",
    title: "The Epistemological Question: How Would We Know?",
    subtitle: "Chapter 20",
    part: 6,
    partTitle: "Synthesis and Implications",
    file: "20_the_epistemological_question.md",
    epigraph: "Give me an MRI machine and a lie detector and I'll prove it.",
    tags: ["epistemology", "evidence", "proof", "verification", "methodology", "skepticism"],
  },
  {
    number: 21,
    slug: "the-final-revelation",
    title: "The Final Revelation",
    subtitle: "Chapter 21",
    part: 6,
    partTitle: "Synthesis and Implications",
    file: "21_the_final_revelation.md",
    epigraph: "Tell the people. That's all I can do. Tell the people.",
    tags: ["conclusion", "revelation", "disclosure", "marshall", "endgame"],
  },
  // Appendices
  {
    number: 100,
    slug: "appendix-a-geological-survey",
    title: "Appendix A: Geological Survey Data",
    subtitle: "Underground Infrastructure Relevant to the Vril Hypothesis",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_a_geological_survey.md",
    epigraph: "",
    tags: ["appendix", "geology", "caves", "lava-tubes", "dumbs", "data"],
  },
  {
    number: 101,
    slug: "appendix-b-black-eye-club",
    title: "Appendix B: The Black Eye Club",
    subtitle: "A Photographic and Documentary Catalog",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_b_black_eye_club.md",
    epigraph: "",
    tags: ["appendix", "black-eye", "photographs", "catalog", "celebrities", "politicians"],
  },
  {
    number: 102,
    slug: "appendix-c-epstein-network",
    title: "Appendix C: The Epstein Network",
    subtitle: "Flight Logs, Property Analysis, and Documented Connections",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_c_epstein_network.md",
    epigraph: "",
    tags: ["appendix", "epstein", "flight-logs", "properties", "intelligence", "maxwell"],
  },
  {
    number: 103,
    slug: "appendix-d-cultural-encoding",
    title: "Appendix D: Cultural Encoding Timeline",
    subtitle: "A Chronological Catalog of Media Parallels",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_d_cultural_encoding.md",
    epigraph: "",
    tags: ["appendix", "cultural-encoding", "timeline", "movies", "television", "stargate"],
  },
  {
    number: 104,
    slug: "appendix-e-mkultra-subprojects",
    title: "Appendix E: MKUltra Declassified Subprojects",
    subtitle: "A Reference Guide",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_e_mkultra_subprojects.md",
    epigraph: "",
    tags: ["appendix", "mkultra", "cia", "subprojects", "declassified", "mind-control"],
  },
  {
    number: 105,
    slug: "appendix-f-orphan-trains",
    title: "Appendix F: Orphan Train Records",
    subtitle: "A Documentary Analysis",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_f_orphan_trains.md",
    epigraph: "",
    tags: ["appendix", "orphan-trains", "children", "records", "history"],
  },
  {
    number: 106,
    slug: "appendix-g-marshall-testimony",
    title: "Appendix G: Selected Marshall Testimony",
    subtitle: "Excerpts from the Recorded Testimony",
    part: 7,
    partTitle: "Appendices",
    file: "appendix_g_marshall_testimony.md",
    epigraph: "",
    tags: ["appendix", "marshall", "testimony", "excerpts", "primary-source"],
  },
];

let updated = 0;
let skipped = 0;

for (const ch of chapters) {
  const filePath = path.join(contentDir, ch.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ SKIP: ${ch.file} not found`);
    skipped++;
    continue;
  }
  
  const content = fs.readFileSync(filePath, "utf-8");
  
  // Check if frontmatter already exists
  if (content.startsWith("---")) {
    console.log(`⚠ SKIP: ${ch.file} already has frontmatter`);
    skipped++;
    continue;
  }
  
  // Build YAML frontmatter
  const yamlLines = [
    "---",
    `number: ${ch.number}`,
    `slug: "${ch.slug}"`,
    `title: "${ch.title.replace(/"/g, '\\"')}"`,
    `subtitle: "${ch.subtitle.replace(/"/g, '\\"')}"`,
    `part: ${ch.part}`,
    `partTitle: "${ch.partTitle}"`,
  ];
  
  if (ch.epigraph) {
    yamlLines.push(`epigraph: "${ch.epigraph.replace(/"/g, '\\"')}"`);
  }
  
  yamlLines.push(`tags:`);
  for (const tag of ch.tags) {
    yamlLines.push(`  - "${tag}"`);
  }
  
  yamlLines.push("---");
  yamlLines.push("");
  
  const newContent = yamlLines.join("\n") + content;
  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`✓ Added frontmatter to ${ch.file} (${ch.tags.length} tags)`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
