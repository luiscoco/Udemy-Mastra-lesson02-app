import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 2,
  "title": "Mastra Ecosystem and Project Architecture",
  "shortTitle": "Project architecture",
  "eyebrow": "PRODUCT · RUNTIME · INFRASTRUCTURE",
  "hero": "Follow the",
  "accent": "request boundary.",
  "description": "Inspect a working Mastra registry and a bounded lesson-lookup tool. See which responsibilities belong to the browser, host, agent and provider.",
  "labTitle": "Explore the course-support architecture",
  "labDescription": "Choose a registered agent and a lesson record. The local lab resolves the actual registry entry and executes the typed lookup without calling a model.",
  "localMode": "Real Mastra registry and tool inspection · no model call",
  "defaultQuestion": "Explain the responsibilities and trust boundaries in this selected request path.",
  "objectives": [
    {
      "title": "Locate the product boundary",
      "text": "The browser collects a request; the local host validates it. Provider credentials and unrestricted operations stay on the server."
    },
    {
      "title": "Inspect the actual registry",
      "text": "Resolve tutor or support from a real Mastra instance. A registry key, agent id and display name are separate identifiers."
    },
    {
      "title": "Execute a typed operation",
      "text": "A lesson lookup accepts a bounded ID and returns a real catalog record. The tool's description guides use; its schema checks arguments."
    },
    {
      "title": "Separate runtime and Studio",
      "text": "The runtime executes the application. Studio is a development interface for interacting with registered components and inspecting configured evidence."
    },
    {
      "title": "Read the project layout",
      "text": "Follow public, src/server.ts, src/mastra/index.ts and the lesson module. This project layout is one workable organization, not a required monorepo."
    },
    {
      "title": "Review shared contracts",
      "text": "The UI sends a typed JSON envelope, the backend checks it, and the result contains only selected public metadata rather than raw SDK configuration."
    }
  ],
  "workflow": [
    "Browser submits a component selection",
    "Host validates the request",
    "Mastra resolves the registry key",
    "Typed tool looks up a lesson",
    "Host projects component ownership",
    "Browser displays actual evidence"
  ],
  "scope": "The key-free lab really resolves registered agents and executes a Mastra tool. Live generation is optional. No authentication system, vector store or conversation memory is implemented.",
  "examples": [
    {
      "name": "Inspect tutor → lesson 4",
      "input": {
        "agentKey": "tutor",
        "lessonId": 4
      },
      "expected": "A registered agent and the actual core-building-blocks record."
    },
    {
      "name": "Unknown registry key",
      "input": {
        "agentKey": "browserAgent",
        "lessonId": 4
      },
      "expected": "Input validation rejects a key outside the registered contract."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/index.ts",
    "src/mastra/agents.ts",
    "src/mastra/tools.ts"
  ],
  "exercise": "Add a classroom catalog record, rebuild, and inspect it through the existing tool. Explain why the browser does not receive a provider key.",
  "checks": [
    {
      "question": "Does opening the architecture lab call a model?",
      "answer": "No. Registry inspection and the catalog tool execute locally. The separately labelled live button invokes a model only when configured."
    },
    {
      "question": "Is a folder layout an access-control boundary?",
      "answer": "No. The application must enforce its request schemas, allowed operations and credential boundary in code."
    },
    {
      "question": "What does Studio replace?",
      "answer": "It helps development and inspection. It does not replace the runtime, application tests or authorization."
    }
  ],
  "docs": [
    {
      "title": "Mastra project structure",
      "url": "https://mastra.ai/docs/getting-started/project-structure"
    },
    {
      "title": "Mastra registry",
      "url": "https://mastra.ai/reference/core/mastra-class"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Validate selection",
      "component": "src/lab.ts",
      "behavior": "Accept only tutor/support and a bounded lesson ID."
    },
    {
      "step": "Resolve registry",
      "component": "src/mastra/index.ts",
      "behavior": "Call Mastra.getAgent and expose the selected id/name, not raw configuration."
    },
    {
      "step": "Execute lookup",
      "component": "src/mastra/tools.ts",
      "behavior": "Run the typed lesson-lookup tool against the public catalog."
    },
    {
      "step": "Project boundaries",
      "component": "src/lab.ts",
      "behavior": "Return browser, host, runtime and provider responsibilities."
    }
  ],
  "liveWorkflow": [
    "The selected registered agent receives the student question and lesson ID.",
    "The tutor can request the bounded catalog tool; generate() returns the provider response."
  ],
  "outcomeNotes": [
    "An unknown registry key fails schema validation.",
    "A missing catalog record is returned as found=false with record=null. The local inspection itself can still complete."
  ]
} satisfies LessonMetadata;
