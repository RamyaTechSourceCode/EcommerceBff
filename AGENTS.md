# 💻 E-COMMERCE CLIENT USER INTERFACE

A high-performance, enterprise-grade storefront web application built using **React, Next.js, and TypeScript**. This interface serves as the client consumer layer for a distributed microservices ecosystem, featuring secure cloud identity integration, centralized data-fetching, domain-driven UI architecture, and an **Agentic AI execution layer** for intelligent task orchestration.

The application combines traditional e-commerce workflows with **AI-powered agent execution**, allowing users to submit natural-language tasks that can be interpreted, orchestrated, and executed against backend services and business capabilities.

---

## 🏗️ SYSTEM LAYOUT & INTEGRATION FLOW

The user interface connects to backend services through a secure **API reverse proxy / Backend-for-Frontend (BFF)** architecture.

The platform also provides an **Agentic AI workflow** that can orchestrate backend capabilities and MCP-based tools to execute business tasks based on natural-language user requests.

```text
                         [ React / Next.js Client ]
                                   │
              ┌────────────────────┴────────────────────┐
              │                                         │
              ▼                                         ▼
 [ Traditional E-Commerce Requests ]          [ Agentic AI Requests ]
              │                                         │
              │                                         ▼
              │                              [ AI Agent Execution Layer ]
              │                                         │
              │                              ┌───────────┴───────────┐
              │                              │                       │
              │                              ▼                       ▼
              │                       [ AI / LLM ]             [ MCP Tools ]
              │                              │                       │
              │                              └───────────┬───────────┘
              │                                          │
              └────────────────────┬─────────────────────┘
                                   ▼
                         [ YARP Gateway / BFF ]
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
             [ Product ]      [ Order ]      [ Inventory ]
              Service          Service         Service
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                                   ▼
                         [ Catalog / Other Services ]

                         Authentication Flow
                                   │
                                   ▼
                          [ Azure Entra ID ]
                                   │
                                   ▼
                         [ OAuth2 / JWT Validation ]
                                   │
                                   ▼
                       [ Secure HTTP-Only Cookie ]
```

## 🤖 AGENTIC AI EXECUTION FLOW

The Agentic AI workflow combines **RAG (Retrieval-Augmented Generation)** with **MCP-based tool execution**. The model first retrieves relevant contextual information from the knowledge layer, then uses MCP tools when live data or business operations are required.

```text
[ User ]
   │
   │ Natural-language task
   │ "Find products matching..."
   ▼
[ Agent Dashboard ]
   │
   ▼
[ ai-agent.ts ]
   │
   │ POST /api/ai/chat
   ▼
[ AI Agent API ]
   │
   ├──► 1. Interpret user intent
   │
   ├──► 2. RAG Retrieval
   │       │
   │       ├──► Search knowledge / embeddings
   │       └──► Retrieve relevant context
   │
   ├──► 3. Model Reasoning
   │       │
   │       └──► Determine whether additional
   │            live data or actions are required
   │
   ├──► 4. MCP Tool Execution
   │       │
   │       ├──► Product tools
   │       ├──► Inventory tools
   │       ├──► Order tools
   │       └──► Other business capabilities
   │
   ├──► 5. Backend Business Services
   │       │
   │       ├──► Product Service
   │       ├──► Inventory Service
   │       ├──► Order Service
   │       └──► Catalog Service
   │
   └──► 6. Generate Final Response
            │
            ▼
      [ Agent Result ]
            │
            ▼
      [ Agent Output UI ]
```

### RAG + MCP ARCHITECTURE

The agent uses two complementary capabilities:

```text
                    [ User Request ]
                           │
                           ▼
                     [ AI Agent ]
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
          [ RAG Retrieval ]      [ MCP Tools ]
                │                     │
                ▼                     ▼
        Relevant Context        Live Business Data
        & Knowledge             & Operations
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
                    [ Model Response ]
```

### RAG FIRST

The initial retrieval stage provides the model with relevant knowledge and context before tool execution.

For example:

```text
User:
"Find products suitable for a customer looking for
a lightweight laptop under a specific budget."
```

The agent can first use RAG to retrieve relevant product knowledge, policies, descriptions, or other indexed information.

```text
User Request
     ↓
RAG Retrieval
     ↓
Relevant Context
     ↓
AI Model
```

### MCP SECOND

After receiving the retrieved context, the model determines whether it needs **real-time business data or an executable operation**.

For example:

```text
RAG
 ↓
Product knowledge
 ↓
AI reasoning
 ↓
MCP
 ↓
Live inventory / product data
 ↓
AI reasoning
 ↓
Final response
```

MCP tools provide controlled access to backend capabilities rather than exposing those services directly to the browser.

### IMPORTANT DISTINCTION

**RAG provides knowledge.**

**MCP provides actions and live business capabilities.**

Therefore, the agent can combine both:

```text
RAG
→ "What do I know about this?"

MCP
→ "What can I retrieve or execute right now?"

LLM
→ "How should I combine this information to answer the user?"
```

This architecture allows the agent to use static or indexed knowledge efficiently while still accessing current e-commerce data when required.


---

## 🤖 AGENTIC AI CAPABILITIES

The application includes an **Agentic AI interface** designed to interact with backend business capabilities through controlled tools and APIs.

### NATURAL-LANGUAGE TASK EXECUTION

Users can submit natural-language requests through the Agent Dashboard instead of manually executing individual API operations.

Example:

```text
"Find products matching this customer's requirements."
```

The request is submitted to the AI agent API:

```text
POST /api/ai/chat
```

The agent interprets the request and determines the appropriate actions required to fulfill the task.

### AI AGENT + MCP TOOL INTEGRATION

The backend AI agent can expose controlled business capabilities through **Model Context Protocol (MCP)** tools.

The agent can therefore operate as an orchestration layer between the user's intent and the underlying e-commerce services.

```text
User Intent
     │
     ▼
AI Agent
     │
     ├──► MCP Tool
     │       │
     │       └──► Product Service
     │
     ├──► MCP Tool
     │       │
     │       └──► Inventory Service
     │
     └──► MCP Tool
             │
             └──► Order Service
```

This approach keeps business operations behind controlled server-side boundaries rather than allowing the client application to directly execute privileged operations.

### AGENT EXECUTION STATE

Agent execution state can be represented using a small, predictable state machine:

```typescript
type AgentStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";
```
This allows the UI to provide clear feedback:

```text
idle      → Ready to execute
running   → Agent is processing
completed → Agent finished successfully
failed    → Agent execution failed
```

## 🧠 AGENT DASHBOARD

The Agent Dashboard provides a dedicated interface for interacting with the AI execution layer.

Key responsibilities include:

* Natural-language task submission.
* Agent execution state management.
* Loading and running indicators.
* Displaying AI-generated responses.
* Handling failed agent executions.
* Providing a dedicated interface separate from traditional administration workflows.
* Communicating with the backend AI agent through the application's API layer.

The frontend does not directly manage AI provider credentials or privileged MCP operations. These responsibilities remain on the server side.

---


