# tracktool-ties

> Surgical instrument knowledge management platform with AI-powered technical assistance

## Overview

**tracktool-ties** is a production platform supporting surgical instrument repair engineers at TIE Surgical with AI-assisted instrument identification, specification lookup, maintenance protocols, and sterilization compliance. The platform combines a Microsoft Copilot Studio agent with a comprehensive skills system and multi-AI development infrastructure.

## Project Structure

```
tracktool-ties/
├── copilot/                    # TIE Scan instrument Copilot agent
│   └── TIE Scan instrument/    # Agent configuration and topics
├── trackatool/                 # Future application platform
├── skills/                     # Reusable AI capabilities
├── .github/                    # GitHub workflows and shared skills
├── docs/                       # Project documentation
├── copilot.worktrees/          # Git worktrees for parallel development
└── [32+ AI directories]        # Multi-AI research infrastructure
```

## Quick Start

### For Repair Engineers

**Using TIE Scan instrument:**

The TIE Scan agent assists with:
- Instrument identification from descriptions
- SKU code lookup
- Maintenance and repair protocols
- Sterilization temperature limits
- Aesculap Orthodontics specialty knowledge

[Read the TIE Scan User Guide →](copilot/TIE_SCAN_GUIDE.md)

### For Developers

**Setting up the development environment:**

```bash
# Clone the repository
git clone https://github.com/yourorg/tracktool-ties.git
cd tracktool-ties

# The copilot directory is a separate git repository
cd copilot
git remote -v  # origin: https://github.com/consultantvision/tie-copilot.git
```

**Prerequisites:**
- Git with Git LFS support
- Access to Microsoft Copilot Studio
- Azure Dataverse credentials (for copilot deployment)

[Read the Developer Guide →](#development)

### For AI Researchers

This project includes 32+ AI assistant integrations for comparing tools, testing frameworks, and evaluating different LLM backends.

[Read the Multi-AI Setup Guide →](docs/MULTI_AI_SETUP.md)

## Components

### TIE Scan instrument

Production Microsoft Copilot Studio agent deployed to Azure Dataverse (Australia region).

**Capabilities:**
- **Instrument Identification**: Match instruments to SKU codes from visual/textual descriptions
- **Specification Lookup**: Retrieve technical data from 1,500+ manufacturer PDFs (Aesculap, B. Braun, etc.)
- **Maintenance Protocols**: Cleaning, lubrication, repair procedures
- **Sterilization Compliance**: Temperature limits and autoclave compatibility (CRITICAL SAFETY)
- **Repair Decision Support**: Cost-benefit analysis for repair vs. replace
- **Aesculap Expertise**: Specialized logic for orthodontic instruments

**Architecture:**
- 19 conversation topics (AesculapExpertise, InstrumentIdentification, MaintenanceGuidance, etc.)
- Knowledge sources: Device Catalogue Library (SharePoint), Verified Responses
- Safety-first design: Never estimates sterilization temperatures without manufacturer data

[Read the TIE Scan Documentation →](copilot/README.md)

### trackatool Application

Future web application for comprehensive surgical instrument lifecycle management (currently in planning phase).

**Planned features:**
- Instrument intake and cataloging
- Repair workflow tracking
- Quality assurance documentation
- TIE Scan agent integration
- Analytics and reporting

[Read the trackatool Documentation →](trackatool/README.md)

### Skills System

Reusable AI capabilities that work across multiple AI assistant platforms.

**Available Skills:**
- **skill-creator**: Guide for creating new skills
- **typescript-expert**: TypeScript/JavaScript expertise and type-level programming
- **typescript-advanced-types**: Advanced TypeScript patterns
- **vercel-deployment**: Deployment workflows
- **verified-response-capture**: Capture verified agent responses as golden records

Skills are modular packages with:
- `SKILL.md` - Instructions and metadata
- `scripts/` - Executable code
- `references/` - Domain knowledge
- `assets/` - Templates and resources

[Read the Skills Documentation →](skills/README.md)

## Development

### Git Worktrees

The copilot directory is a separate git repository that uses git worktrees for parallel development:

```bash
# Main copilot repository
cd copilot
git status

# Worktrees for feature branches
ls ../copilot.worktrees/
```

This allows multiple developers to work on different features simultaneously without branch switching overhead.

### Multi-AI Environment

The project includes 32+ AI assistant configuration directories:

**IDE Integrations:** `.claude`, `.cursor`, `.cline`, `.continue`, `.windsurf`, `.crush`
**Agent Frameworks:** `.agents`, `.openhands`, `.roo`, `.goose`
**LLM Providers:** `.gemini`, `.codex`, `.qwen`, `.pi`
**Specialized Tools:** `.mcpjam`, `.factory`, `.zencoder`, `.kilocode`

This infrastructure enables:
- Comparing AI coding assistants across platforms
- Testing agent frameworks and LLM backends
- Creating cross-platform reusable skills
- Researching best practices for AI-assisted development

[Read the Multi-AI Setup Guide →](docs/MULTI_AI_SETUP.md)

### Contributing

Contributions are managed through standard pull request workflows. For copilot changes:

1. Create a feature branch or worktree
2. Make changes to agent configuration or topics
3. Test in Copilot Studio test pane
4. Submit PR for review
5. Deploy via Copilot Studio sync

[Read the Deployment Guide →](docs/DEPLOYMENT.md)

## Documentation

### User Guides
- [TIE Scan Instrument User Guide](copilot/TIE_SCAN_GUIDE.md) - For repair engineers
- [Skills Development Guide](docs/SKILLS_DEVELOPMENT.md) - Creating reusable skills

### Technical Documentation
- [TIE Scan Agent Documentation](copilot/README.md) - Architecture and development
- [Topic Development Guide](copilot/docs/TOPIC_DEVELOPMENT.md) - Creating conversation topics
- [Skills System Documentation](skills/README.md) - Using and creating skills

### Operations
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment procedures for all components
- [Multi-AI Setup Guide](docs/MULTI_AI_SETUP.md) - Multi-AI infrastructure documentation

## Technology Stack

- **Copilot Studio**: Agent orchestration and dialog management
- **Azure Dataverse**: Backend integration and storage (Australia region)
- **SharePoint**: Knowledge document repository (1,500+ manufacturer PDFs)
- **Git**: Version control with worktree support
- **Multiple AI Platforms**: Claude, Cursor, Cline, Continue, OpenHands, and 27+ others

## Support

For issues related to:
- **TIE Scan agent**: Contact TIE Surgical DevOps (spdev@tiesurgical.com.au)
- **Project development**: Create an issue in the GitHub repository
- **Deployment issues**: Refer to the [Deployment Guide](docs/DEPLOYMENT.md)

## License

[License information to be added]

## Acknowledgments

Built with Microsoft Copilot Studio and deployed to Azure Dataverse. Knowledge sources provided by Aesculap, B. Braun, and other surgical instrument manufacturers.
