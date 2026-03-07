# UC-006: Code Reviewer — Review and Validation Support

## Actor
Code Reviewer (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Architecture decisions, requirements, and coding standards are documented
- Code changes available (PR or diff)

## Main Flow
1. Reviewer initiates review for a code change
2. System retrieves relevant context: ADRs, requirements, coding standards, related code
3. System analyzes code against architecture decisions and project standards
4. System provides structured review with findings and recommendations
5. Reviewer validates and provides feedback

## Supported Workflows
- Code review against architecture decisions (ADR compliance)
- Requirements traceability validation
- Coding standards compliance check
- Security and quality review

## Postconditions
- Review comments generated with references to standards and decisions
- Non-compliance issues identified with remediation suggestions
