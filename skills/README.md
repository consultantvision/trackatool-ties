# Skills System

> Reusable AI capabilities for surgical instrument domain and development workflows

## Overview

Skills are modular packages that extend AI agent capabilities with specialized knowledge, workflows, and tools. This directory contains symlinks to skills stored in `.agents/skills/` and `.github/skills/`.

**Purpose**:
- Provide reusable AI capabilities across multiple AI assistant platforms
- Enable consistent behavior across different AI tools (Claude, Cursor, Continue, etc.)
- Package domain expertise for surgical instrument knowledge management
- Standardize common workflows (skill creation, verified response capture, etc.)

## Available Skills

### skill-creator

**Location**: `.agents/skills/skill-creator/`

**Purpose**: Meta-skill for creating effective skills with comprehensive guidance on skill architecture, progressive disclosure, and the 6-step creation process.

**When to use**: Creating or updating skills that extend Claude's capabilities with specialized knowledge, workflows, or tool integrations.

**Key Features**:
- 6-step skill development process (understanding → planning → initialization → implementation → packaging → iteration)
- Progressive disclosure design patterns
- Script, reference, and asset management
- Validation and packaging tools

[Read more about creating skills →](../docs/SKILLS_DEVELOPMENT.md)

### typescript-expert

**Location**: `.agents/skills/typescript-expert/`

**Purpose**: TypeScript and JavaScript expert with deep knowledge of type-level programming, performance optimization, monorepo management, migration strategies, and modern tooling.

**When to use**: PROACTIVELY for any TypeScript/JavaScript issues including complex type gymnastics, build performance, debugging, and architectural decisions.

**Key Features**:
- Advanced type-level programming (branded types, conditional types, template literals)
- Performance optimization and bundle size reduction
- Monorepo management (Turborepo, Nx, workspaces)
- Migration strategies (JavaScript → TypeScript, CommonJS → ESM)
- Modern tooling expertise (Biome vs ESLint, Vite, esbuild)

### typescript-advanced-types

**Location**: `.agents/skills/typescript-advanced-types/`

**Purpose**: Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types for building type-safe applications.

**When to use**: Implementing complex type logic, creating reusable type utilities, or ensuring compile-time type safety in TypeScript projects.

**Key Features**:
- Generics and type parameters
- Conditional types and type inference
- Mapped types and type transformations
- Template literal types
- Utility types (Pick, Omit, Partial, Required, etc.)

### vercel-deployment

**Location**: `.agents/skills/vercel-deployment/`

**Purpose**: Expert knowledge for deploying to Vercel with Next.js, including environment configuration, build optimization, and deployment workflows.

**When to use**: When deploying applications to Vercel, configuring Vercel projects, or troubleshooting deployment issues.

**Key Features**:
- Vercel deployment configuration
- Next.js optimization for Vercel
- Environment variable management
- Custom domain configuration
- Deployment troubleshooting

### frontend-design

**Location**: `.github/skills/frontend-design/`

**Purpose**: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when building web components, pages, artifacts, posters, or applications.

**When to use**: Building websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI.

**Key Features**:
- Bold aesthetic directions (brutalist, minimal, maximalist, retro, organic, etc.)
- Typography, color theory, motion design
- Spatial composition and layout
- Avoidance of generic AI aesthetics
- Context-specific, memorable design
- Production-ready code generation

### verified-response-capture

**Location**: `.github/skills/verified-response-capture/`

**Purpose**: Standardized workflow for capturing and persisting correct agent responses as validated knowledge artifacts for regression testing and documentation.

**When to use**: When the user says "Save this response", "Mark as verified", or "Capture this answer". Building golden record datasets for the TIE Scan agent.

**Key Features**:
- Extract context from verified agent responses
- Create markdown files with user queries and verified answers
- Store in `copilot/TIE Scan instrument/knowledge/verified_responses/`
- Support building ground-truth datasets for testing

**File Template**:
```markdown
# [Short Title Summary of the Issue]

**User Query:**
> [Insert the exact user prompt here]

**Verified Response:**
[Insert the agent's full response content here]

---
**Metadata:**
- **Topic Context:** [e.g., AesculapExpertise]
- **Verified Date:** [Current Date]
- **Status:** Verified / Golden Record
```

## Skill Structure

Each skill consists of:

```
skill-name/
├── SKILL.md              # Required: metadata + instructions
├── LICENSE.txt           # Optional: licensing information
├── scripts/              # Optional: executable code
├── references/           # Optional: documentation to load as needed
└── assets/               # Optional: files used in output
```

### SKILL.md Format

```yaml
---
name: skill-name
description: When and how to use this skill
---

# Skill Name

Instructions for using the skill...
```

**Key Components**:
- **name**: Skill identifier (kebab-case)
- **description**: Comprehensive trigger criteria (what the skill does AND when to use it)
- **body**: Detailed instructions, loaded AFTER triggering

### Progressive Disclosure

Skills can split large content across multiple files:

```
bigquery-skill/
├── SKILL.md              # Overview + navigation
└── references/
    ├── finance.md        # Revenue, billing metrics
    ├── sales.md          # Opportunities, pipeline
    └── product.md        # API usage, features
```

The AI loads only relevant reference files as needed, keeping context focused.

## Using Skills

### For AI Assistants

Skills are automatically discovered in:
- `skills/` (symlinks to `.agents/skills/`)
- `.agents/skills/` (actual skill files)
- `.claude/skills/` (Claude-specific skills)
- `.github/skills/` (shared workflow skills)

AI assistants load skill metadata (name, description) and trigger based on description matching. When triggered, the full SKILL.md body is loaded.

### Skill Discovery

AI tools discover skills by:
1. Scanning skill directories
2. Reading SKILL.md frontmatter (name, description)
3. Matching user requests against descriptions
4. Loading full skill content when matched

### Triggering Skills

Skills trigger automatically when user requests match the description:
- Direct mentions: "Use the verified-response-capture skill"
- Implicit matching: "Save this response" → triggers verified-response-capture
- Context-aware: TypeScript errors → triggers typescript-expert

## Creating Skills

### Quick Start

Using the skill-creator skill:

```bash
# Initialize new skill structure
python .agents/skills/skill-creator/scripts/init_skill.py skill-name --path .agents/skills/

# Implement skill contents
# Edit SKILL.md, add scripts/references/assets as needed

# Validate skill
python .agents/skills/skill-creator/scripts/quick_validate.py .agents/skills/skill-name

# Package skill
python .agents/skills/skill-creator/scripts/package_skill.py .agents/skills/skill-name
```

### Development Workflow

1. **Plan**: Define skill purpose, triggers, and resources needed
2. **Initialize**: Create skill directory structure
3. **Implement**:
   - Write SKILL.md with clear description and instructions
   - Add scripts for automation
   - Create references for domain knowledge
   - Include assets for templates/outputs
4. **Test**: Trigger skill with real usage scenarios
5. **Validate**: Check SKILL.md format and structure
6. **Package**: Bundle for distribution
7. **Iterate**: Refine based on feedback

[Read the comprehensive Skills Development Guide →](../docs/SKILLS_DEVELOPMENT.md)

### Best Practices

#### Description Writing

The `description` field is the primary triggering mechanism:
- Include **what** the skill does
- Include **when** to use it (specific triggers/contexts)
- Be comprehensive (body loads AFTER triggering)

**Example**:
```yaml
description: Assist engineers in capturing and persisting correct agent responses as validated knowledge artifacts for regression testing and documentation. Use when: "Save this response", "Mark as verified", or "Capture this answer".
```

#### Content Organization

- **Keep SKILL.md concise** (<500 lines when possible)
- **Use progressive disclosure** (references/ for details)
- **Test scripts before inclusion**
- **Write clear instructions** assuming AI is intelligent but needs context

#### Degrees of Freedom

- **High freedom**: Text-based instructions (AI interprets creatively)
- **Medium freedom**: Pseudocode with parameters
- **Low freedom**: Specific scripts (exact execution)

Choose based on task variability and precision requirements.

## Skill Directories by AI Tool

Skills are symlinked from `.agents/skills/` to various AI-specific directories:

- `skills/` - Generic/shared location (this directory)
- `.agents/skills/` - Master storage location
- `.claude/skills/` - Claude Code specific
- `.github/skills/` - GitHub/shared workflows (e.g., verified-response-capture)

**Why Symlinks?**
- Single source of truth (`.agents/skills/`)
- Consistent across AI tools
- Easy updates (modify once, applies everywhere)

## Domain-Specific Skills

### Surgical Instrument Domain

**Current Skills**:
- **verified-response-capture**: Capture verified TIE Scan responses as golden records

**Planned Skills**:
- **aesculap-expertise**: Deep Aesculap Orthodontics catalog knowledge
- **maintenance-protocol-library**: Comprehensive instrument maintenance procedures
- **sku-lookup-optimizer**: Advanced SKU search strategies

### Development Skills

**Current Skills**:
- **skill-creator**: Meta-skill for creating new skills
- **typescript-expert**: TypeScript/JavaScript development
- **typescript-advanced-types**: Advanced TypeScript patterns
- **vercel-deployment**: Deployment workflows

## Skill Examples

### Example 1: Using verified-response-capture

**User**: "That response about DP380R wire capacity is perfect. Save it as a verified response."

**AI Action**:
1. Skill triggers based on "Save it as a verified response"
2. Extracts user query and agent response
3. Creates markdown file: `aesculap-dp380r-wire-capacity.md`
4. Stores in `copilot/TIE Scan instrument/knowledge/verified_responses/`
5. Confirms file creation

### Example 2: Using typescript-expert

**User**: "I'm getting type errors when using conditional types with generics"

**AI Action**:
1. typescript-expert skill triggers based on TypeScript context
2. Loads advanced type-level programming patterns
3. Provides solution with conditional type examples
4. Suggests testing approaches

## Configuration

### Skill Settings

Some AI tools support skill-specific settings:

**Claude Code** (`.claude/settings.local.json`):
```json
{
  "allowed_commands": {
    "Bash(npx skills:*)": "always_allow",
    "Bash(ls:*)": "always_allow"
  }
}
```

This allows skill-related commands to run without prompts.

### Sharing Skills

**Internal Sharing**:
- Commit to `.agents/skills/` or `.github/skills/`
- Symlink to AI-specific directories
- Document in this README

**External Sharing**:
- Package skill as `.skill` file
- Include LICENSE.txt
- Provide installation instructions
- Publish to skill registry (if available)

## Troubleshooting

### Skill Not Triggering

**Possible Causes**:
- Description too narrow or doesn't match user request
- Skill not in discoverable location
- Competing skill with higher priority

**Solutions**:
- Broaden description to cover more trigger scenarios
- Verify skill is in `skills/`, `.agents/skills/`, or `.github/skills/`
- Make description more specific or distinctive

### Skill Loading Errors

**Possible Causes**:
- SKILL.md frontmatter syntax error
- Missing required files
- Circular references in progressive disclosure

**Solutions**:
- Validate YAML frontmatter
- Ensure SKILL.md exists with proper format
- Check reference file paths

### Script Execution Issues

**Possible Causes**:
- Missing dependencies
- Permission errors
- Incorrect path references

**Solutions**:
- Document dependencies in SKILL.md
- Use relative paths in scripts
- Test scripts independently before integration

## Related Documentation

- [Skills Development Guide](../docs/SKILLS_DEVELOPMENT.md) - Comprehensive guide to creating skills
- [Skill Creator](.agents/skills/skill-creator/SKILL.md) - Meta-skill for skill creation
- [Project Overview](../README.md) - Full tracktool-ties documentation
- [TIE Scan Agent](../copilot/README.md) - Agent using verified-response-capture skill

## Contributing

### Adding New Skills

1. Use skill-creator to plan and initialize
2. Implement in `.agents/skills/skill-name/`
3. Test with relevant AI tools
4. Document in this README
5. Submit pull request with skill description and use cases

### Updating Existing Skills

1. Modify in `.agents/skills/skill-name/`
2. Test changes across AI tools
3. Update documentation if interface changes
4. Bump version in SKILL.md if applicable

## Support

For issues related to:
- **Skill creation**: Refer to skill-creator skill
- **Specific skills**: Contact skill maintainer (listed in SKILL.md)
- **System issues**: Create issue in project repository

## License

Skills may have individual licenses. See LICENSE.txt in each skill directory.
