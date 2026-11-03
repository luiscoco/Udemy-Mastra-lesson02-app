import { Mastra } from "@mastra/core/mastra";
import { tutor, support } from "./agents.js";
export const mastra = new Mastra({ agents: { tutor, support } });
