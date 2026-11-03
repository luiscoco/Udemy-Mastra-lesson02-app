import { z } from "zod";
import { mastra } from "./mastra/index.js";
import { createTutor } from "./mastra/agents.js";
import { lookupLesson } from "./mastra/tools.js";
import { assertActive, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = z.object({ agentKey: z.enum(["tutor", "support"]), lessonId: z.number().int().min(1).max(999) }).strict();
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal);
  const agent = mastra.getAgent(input.agentKey);
  emit({ type: "stage", text: `Resolved registry key ${input.agentKey}; executing the catalog tool locally.` });
  const lookup = await lookupLesson.execute!({ lessonId: input.lessonId }, {});
  return { status: "pass", summary: "The registry and typed lookup executed on the host. No model request was made.",
    data: { selection: input, registeredKeys: Object.keys(mastra.listAgents()), agent: { id: agent.id, name: agent.name }, lookup,
      boundaries: { browser: "JSON input and rendered public result", host: "Validation, credential custody and bounded tool execution", runtime: "Registered components and execution", provider: "Used only by the separate live action" } } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const input = inputSchema.parse(raw);
  const result = await generateAnswer(model ? createTutor(model) : mastra.getAgent(input.agentKey), `${question}\nSelected lesson: ${input.lessonId}.`, emit, signal);
  return { ...result, details: { registryKey: input.agentKey, finishReason: result.finishReason } };
}
export async function dispose() {}
