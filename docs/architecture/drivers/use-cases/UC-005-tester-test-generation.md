# UC-005: Tester — Test Generation Support

## Actor
Tester (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Requirements and use cases are documented
- Codebase is accessible via Git

## Main Flow
1. Tester describes testing need (feature, module, scenario)
2. System retrieves relevant context: requirements, use cases, existing code, architecture constraints
3. System generates test cases and test code following TDD approach
4. Tester reviews and applies

## Supported Workflows
- Test case generation from requirements and use cases
- Unit test code generation (TDD)
- Integration test code generation
- E2E test code generation
- Test coverage analysis against requirements

## Postconditions
- Test cases documented
- Test code generated following project conventions
- Tests traceable to requirements
