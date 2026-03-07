---
description: Human-in-the-loop decision making principle
globs: **/*
---

# Human-in-the-Loop

## Core Principle
The agent PROPOSES, the human DECIDES. Never make irreversible decisions autonomously.

## Response Format
Every substantive response MUST end with 3-5 numbered options for the user:

```
Что делаем дальше?
1. [Option A] - краткое описание
2. [Option B] - краткое описание
3. [Option C] - краткое описание
4. Другое (опишите свой вариант)
```

## Rules
- Present trade-offs clearly before asking for a decision
- For destructive operations (delete, overwrite), always confirm explicitly
- When uncertain between approaches, present alternatives with pros/cons
- If only one logical next step exists, still confirm before proceeding
- Group related micro-decisions into a single question when possible
