# Project Custom Skills

You can define project-specific skills in this directory. 

Each skill must be in its own subdirectory and contain a `SKILL.md` file at its root.

## Structure
```
.agents/
└── skills/
    └── <skill_name>/
        ├── SKILL.md
        ├── scripts/       (optional)
        ├── examples/      (optional)
        ├── resources/     (optional)
        └── references/    (optional)
```

## SKILL.md Template
```markdown
---
name: skill-name
description: A short description of the skill
---

# Skill Title

Detailed instructions for the skill go here.
```
