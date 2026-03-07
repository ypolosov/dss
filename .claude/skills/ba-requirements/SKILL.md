---
name: ba-requirements
description: Requirements elicitation - interactive session to discover and document requirements
user_invocable: true
agent: business-analyst
---

# /ba-requirements - Requirements Elicitation

## What this skill does
Conducts an interactive requirements elicitation session to discover functional and non-functional requirements.

## Usage
- `/ba-requirements` - Start an elicitation session
- `/ba-requirements functional` - Focus on functional requirements
- `/ba-requirements nonfunctional` - Focus on non-functional requirements
- `/ba-requirements constraints` - Document technical and business constraints

## Process

### Session Flow
1. **Context Setting**
   - Read existing requirements from `docs/requirements/`
   - Read existing drivers from `docs/architecture/drivers/`
   - Summarize what's already documented
   - Ask: "Какую область хотите исследовать?"

2. **Discovery**
   - Ask open-ended questions about the business domain
   - For each area, drill down with specific questions:
     - "Кто является пользователем?"
     - "Какие действия они выполняют?"
     - "Что происходит при ошибке?"
     - "Какие ограничения существуют?"
   - Capture answers as preliminary requirements

3. **Formalization**
   - Convert discoveries into structured artifacts:
     - Use cases → `docs/requirements/use-cases/`
     - Quality attributes → `docs/architecture/drivers/quality-attributes/`
     - Constraints → `docs/architecture/drivers/constraints/`
     - Concerns → `docs/architecture/drivers/concerns/`

4. **Review & Confirm**
   - Present all captured requirements to user
   - Ask for corrections and additions
   - Save finalized requirements

5. **Next Steps**
   - Suggest running `/ba-qaw` for systematic QA identification
   - Suggest running `/ba-utility-tree` to prioritize
   - Suggest running `/sa-iterate` when ready for design
