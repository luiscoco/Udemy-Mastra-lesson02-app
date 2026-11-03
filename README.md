# Mastra · Lesson 02 · Mastra Ecosystem and Project Architecture

Inspect a working Mastra registry and a bounded lesson-lookup tool. See which responsibilities belong to the browser, host, agent and provider.

![Lesson 02 application](docs/application-preview.png)

## What this application does

Choose a registered agent and a lesson record. The local lab resolves the actual registry entry and executes the typed lookup without calling a model.

**Practical mode:** Real Mastra registry and tool inspection · no model call.

The key-free lab really resolves registered agents and executes a Mastra tool. Live generation is optional. No authentication system, vector store or conversation memory is implemented.

## Run the application

Use **Node.js 24+**. Each lesson is an independent repository with its own dependency lockfile.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson02-app.git
cd Udemy-Mastra-lesson02-app
npm ci
npm start
```

Open **http://127.0.0.1:3202** and choose **Run practical lab**. The practical operation requires no model key. Starting the server does not make a provider request. Keep the terminal open; Ctrl+C stops it. To change the port, set PORT in the environment or local .env file.

## Application pages

| Page | Content |
| --- | --- |
| Application lab | Editable JSON cases, actual execution, formatted result, event log and structured metadata |
| What you will learn | Lesson objectives, comprehension checks and a concrete exercise |
| How to run | Installation, local/live modes, commands and troubleshooting |
| Architecture & workflow | The practical execution sequence and the actual request runner |
| Code walkthrough | Source-derived excerpts with GitHub line references |

The application supports light/dark themes, mobile layouts, sanitized Markdown, syntax-highlighted code and copy-code controls.

## Practical execution workflow

| Stage | Source | Actual behavior |
| --- | --- | --- |
| Validate selection | [src/lab.ts](src/lab.ts) | Accept only tutor/support and a bounded lesson ID. |
| Resolve registry | [src/mastra/index.ts](src/mastra/index.ts) | Call Mastra.getAgent and expose the selected id/name, not raw configuration. |
| Execute lookup | [src/mastra/tools.ts](src/mastra/tools.ts) | Run the typed lesson-lookup tool against the public catalog. |
| Project boundaries | [src/lab.ts](src/lab.ts) | Return browser, host, runtime and provider responsibilities. |

The browser posts JSON to **POST /api/lab**. The host validates the envelope, runs the lesson implementation and sends NDJSON events. The UI renders the actual result and a separate application outcome. **GET /api/config** exposes public lesson metadata and credential-presence readiness, never credential values.

## Classroom cases and expected outcomes

### 1. Inspect tutor → lesson 4

```json
{
  "agentKey": "tutor",
  "lessonId": 4
}
```

**Expected:** A registered agent and the actual core-building-blocks record.

### 2. Unknown registry key

```json
{
  "agentKey": "browserAgent",
  "lessonId": 4
}
```

**Expected:** Input validation rejects a key outside the registered contract.

## Interpreting the result

- An unknown registry key fails schema validation.
- A missing catalog record is returned as found=false with record=null. The local inspection itself can still complete.

**Complete** means the operation met its implemented completion checks. **Needs attention** exposes a business, format or validation finding. **Could not finish** is an execution/request failure. **Cancelled** is a separate user action. Read the evidence before treating any runtime status as task correctness.

## Optional live-agent workflow

1. The selected registered agent receives the student question and lesson ID.
2. The tutor can request the bounded catalog tool; generate() returns the provider response.

The live button uses **POST /api/query** and a real provider, and may incur API usage. Tests use an explicit SDK model adapter; no paid provider call is claimed by the test evidence.

Configure your own credentials locally, preserving any existing .env:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3202
```

Choose a model your account can access and restart the server. Credentials remain on the host and are ignored by Git. Existing shell values take precedence over the optional .env file. Provider/model availability and supported parameters must be checked for your selected model.

## Build, samples and verification

```powershell
npm run sample
npm run build
npm test
npm run test:browser
```

- **sample:** executes the default practical case without a provider key.
- **sample:live:** runs an actual provider request after configuration; invoke separately with npm run sample:live.
- **build:** regenerates all five pages, actual-source excerpts, architecture SVG, this README and the browser bundle.
- **test:** typechecks and runs offline local-operation, invalid-input, cancellation, real-SDK adapter, generated-content and HTTP-boundary checks, plus lesson-specific regression cases.
- **test:browser:** uses isolated headless Chrome to execute the real practical lab and its failure case, verify all five pages and mobile layout, check theme persistence, syntax colors and safe Markdown, and save [browser evidence](docs/browser-qa.json). The live-renderer fixture makes no provider request.

Set BROWSER_EXECUTABLE if Chrome/Chromium is not installed at the platform’s standard path. Browser tests are local; GitHub Actions runs npm ci, build and the offline test suite.

## Dependencies

| Runtime package | Pinned version |
| --- | --- |
| @mastra/core | 1.81.0 |
| dompurify | 3.4.17 |
| marked | 18.1.3 |
| zod | 4.6.7 |

The committed package-lock.json fixes the installed dependency tree. A remote model alias is independent of the JavaScript lockfile.

## Student exercise

Add a classroom catalog record, rebuild, and inspect it through the existing tool. Explain why the browser does not receive a provider key.

Rebuild after a source change so the explanation pages, line references and README remain consistent with the running code.

## Source and references

- [src/lab.ts](src/lab.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [src/mastra/agents.ts](src/mastra/agents.ts)
- [src/mastra/tools.ts](src/mastra/tools.ts)
- [HTTP host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Page and README generator](scripts/build-pages.ts)
- [Mastra project structure](https://mastra.ai/docs/getting-started/project-structure)
- [Mastra registry](https://mastra.ai/reference/core/mastra-class)

Prism’s license is included in [public/prism-LICENSE.txt](public/prism-LICENSE.txt).
