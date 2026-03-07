# UC-008: DevOps Engineer — Infrastructure and CI/CD Support

## Actor
DevOps Engineer (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Infrastructure codebase accessible via Git (Bitbucket)
- Kubernetes cluster API accessible
- Architecture decisions and infrastructure requirements documented

## Main Flow
1. DevOps engineer describes infrastructure task or problem
2. System retrieves relevant context: architecture decisions, current infrastructure state (Kubernetes API), existing IaC, requirements
3. System generates infrastructure code aligned with project standards
4. Engineer reviews, iterates, and applies

## Supported Workflows
- Kubernetes manifests and Helm charts generation
- CI/CD pipeline configuration
- Infrastructure-as-code generation
- Runtime diagnostics via Kubernetes cluster API
- Deployment and scaling configuration

## Postconditions
- Generated infrastructure code follows project conventions
- Infrastructure changes traceable to architecture decisions
