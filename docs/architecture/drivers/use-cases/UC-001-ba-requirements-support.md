# UC-001: Business Analyst — Requirements Support

## Actor
Business Analyst (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Knowledge base contains project-relevant data (Confluence, Jira, Discord, Git)

## Main Flow
1. BA initiates a multi-step workflow (e.g., QAW, Utility Tree, Mission Thread, Use Case elicitation)
2. System retrieves project-specific context from knowledge base via RAG
3. System guides BA through structured interactive session
4. BA provides domain input, system formalizes into artifacts
5. System saves artifacts to project documentation

## Supported Workflows
- Utility Tree creation and prioritization
- Quality Attribute Workshop (QAW)
- Mission Thread Workshop
- Use Case specification
- Requirements elicitation and documentation

## Postconditions
- Structured requirements artifacts saved to project docs
- Traceability from requirements to knowledge base sources
