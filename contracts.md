# API Contracts for FundWise

Status: v1 (frontend integrated with mocks; backend implemented for demo-requests; chat streaming placeholder)

Base URL (frontend uses): `${process.env.REACT_APP_BACKEND_URL}/api`

1) Health/Status
- GET /api/ -> { message: "Hello World" }
- POST /api/status { client_name } -> StatusCheck
- GET /api/status -> StatusCheck[]

2) Demo Requests
- POST /api/demo-requests
  Request: { name: string, email: string, company?: string, notes?: string, utm?: object, submittedAt?: ISOString }
  Response: DemoRequest { id, name, email, company?, notes?, utm?, submittedAt?, created_at }
- GET /api/demo-requests?limit=50 -> DemoRequest[] (sorted desc by created_at)

3) Chat (LLM)
- POST /api/chat/stream (Streaming SSE)
  Request body: { session_id: string, message: string, history?: {role, content}[] }
  Response: text/event-stream; events: data: { type: "chunk"|"info", content: string }, event: done
  Note: Currently placeholder stream until Emergent LLM integration is configured.

4) Analytics & Hotjar (runtime config)
- To be added after keys are supplied. We will expose:
  - GET /api/config/analytics -> { success, ga4_config: { measurement_id, debug, test_mode, environment } }
  - GET /api/config/hotjar -> { success, hotjar: { site_id } }

Data Model (MongoDB)
- Collections: status_checks, demo_requests

Integration Plan
- After keys are provided:
  1. Wire GA4 + Hotjar via runtime loaders (no .env change) and optional backend config endpoint
  2. Implement AI chat streaming using Emergent LLM key with multi-provider routing per integration playbook and add unit tests
  3. Replace frontend chat mock to call /api/chat/stream with session_id

Testing
- Backend: use deep_testing_backend_v2 for demo-requests CRUD and SSE response structure.
- Frontend: Manual check first; then ask user before automated frontend tests.