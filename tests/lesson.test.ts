import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("catalog lookup returns actual missing-record evidence", async () => {
  const result = await run({ agentKey: "tutor", lessonId: 999 });
  const data = result.data as { lookup: { found: boolean; record: unknown } };
  assert.equal(data.lookup.found, false); assert.equal(data.lookup.record, null);
});
