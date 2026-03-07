# UC-002: Project Manager — Project Management Support

## Actor
Project Manager (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Project management tools connected (Jira, Bitbucket)

## Main Flow
1. PM describes task/need in interactive chat
2. System retrieves project-specific context (requirements, architecture, current sprint state)
3. System assists with creating/updating project management artifacts
4. PM reviews and confirms actions

## Supported Workflows
- Epic/Story/Task/Bug creation and management (Jira)
- Sprint planning and breakdown (Jira Scrum board)
- Pull Request management (Bitbucket)
- Status reporting and progress tracking

## Postconditions
- Jira issues created or updated
- Bitbucket PRs managed
- Artifacts linked to requirements and architecture decisions
