# Multi-AI Development Environment

> Research platform for comparing AI coding assistants and frameworks

## Overview

The tracktool-ties project includes **32+ AI assistant configuration directories**, creating a unique multi-AI development environment. This infrastructure enables parallel testing and comparison of different AI-powered development tools, agent frameworks, and LLM backends.

**Purpose**:
- Compare AI coding assistants across different platforms
- Test agent frameworks and capabilities
- Evaluate LLM backends (Claude, GPT, Gemini, Qwen, etc.)
- Create cross-platform reusable skills
- Research best practices for AI-assisted development

## AI Assistant Directories

### Complete Directory List

The project includes the following AI tool configuration directories:

```
├── .agent/            # Generic single agent configuration
├── .agents/           # Multi-agent framework (master skills location)
├── .claude/           # Claude Code (Anthropic)
├── .cline/            # Cline IDE assistant
├── .codebuddy/        # CodeBuddy assistant
├── .codex/            # OpenAI Codex integration
├── .commandcode/      # CommandCode tool
├── .continue/         # Continue IDE extension
├── .crush/            # Crush assistant
├── .cursor/           # Cursor IDE
├── .factory/          # Factory coding assistant
├── .gemini/           # Google Gemini Code Assist
├── .goose/            # Goose agent framework
├── .junie/            # Junie coding assistant
├── .kilocode/         # KiloCode tool
├── .kiro/             # Kiro assistant
├── .kode/             # Kode tool
├── .mcpjam/           # MCP Jam (Model Context Protocol integration)
├── .mux/              # Mux multiplexer
├── .neovate/          # Neovate (Neovim-based)
├── .openclaude/       # OpenClaude variant
├── .opencode/         # OpenCode assistant
├── .openhands/        # OpenHands agent framework
├── .pi/               # Pi programming interface
├── .pochi/            # Pochi assistant
├── .qoder/            # Qoder (Qwen-based)
├── .qwen/             # Qwen Coder (Alibaba)
├── .roo/              # Roo Code assistant
├── .trae/             # Trae assistant
├── .windsurf/         # Windsurf IDE
└── .zencoder/         # ZenCoder tool
```

### Directory Categories

**IDE Integrations** (13):
- `.claude` - Claude Code (Anthropic)
- `.cursor` - Cursor IDE with AI capabilities
- `.cline` - Cline IDE assistant
- `.continue` - Continue IDE extension
- `.windsurf` - Windsurf IDE
- `.crush` - Crush assistant
- `.openclaude` - OpenClaude variant
- `.opencode` - OpenCode assistant
- `.codebuddy` - CodeBuddy assistant
- `.neovate` - Neovate (Neovim-based)
- `.commandcode` - CommandCode tool
- `.factory` - Factory coding assistant
- `.zencoder` - ZenCoder tool

**Agent Frameworks** (5):
- `.agents` - Multi-agent framework (master location for skills)
- `.agent` - Generic single agent
- `.openhands` - OpenHands agent framework
- `.roo` - Roo Code assistant
- `.goose` - Goose agent framework

**LLM Provider Integrations** (6):
- `.codex` - OpenAI Codex
- `.gemini` - Google Gemini Code Assist
- `.qwen` - Qwen Coder (Alibaba)
- `.pi` - Pi programming interface
- `.qoder` - Qoder (Qwen-based)
- `.trae` - Trae assistant

**Specialized Tools** (8):
- `.mcpjam` - MCP Jam (Model Context Protocol)
- `.mux` - Multiplexer for multiple AI backends
- `.junie` - Junie assistant
- `.kilocode` - KiloCode tool
- `.kiro` - Kiro assistant
- `.kode` - Kode tool
- `.pochi` - Pochi assistant
- `.github` - GitHub workflows and shared skills

## Directory Structure

Each AI tool directory typically contains:

### Common Files

**Configuration**:
- `settings.json` / `settings.local.json` - Tool-specific settings
- `config.yaml` / `config.yml` - YAML configuration
- `.gitignore` - Excluded files
- `README.md` - Tool-specific documentation (some)

**Skills** (some tools):
- `skills/` - Symlinks to `.agents/skills/` master location
- Tool-specific skill configurations

**Prompts/Instructions** (some tools):
- Custom system prompts
- Tool-specific instructions
- Context files

### Example: .claude/ Structure

```
.claude/
├── settings.local.json      # Permission configurations
├── plans/                   # Plan mode saved plans
├── skills/                  # Symlinks to .agents/skills/
└── .gitignore              # Excludes sensitive files
```

**settings.local.json** example:
```json
{
  "allowed_commands": {
    "Bash(npx skills:*)": "always_allow",
    "Bash(ls:*)": "always_allow"
  }
}
```

### Master Skills Location

**`.agents/skills/`** is the **master location** for all skills:
- `skill-creator/` - Meta-skill for creating skills
- `typescript-expert/` - TypeScript/JavaScript expertise
- `typescript-advanced-types/` - Advanced type patterns
- `vercel-deployment/` - Deployment workflows
- `frontend-design/` - UI/UX design

**Sharing Strategy**:
- Skills stored once in `.agents/skills/`
- Symlinked to AI-specific directories (`.claude/skills/`, etc.)
- Shared workflows in `.github/skills/` (verified-response-capture)

## Use Cases

### 1. AI Tool Comparison

**Objective**: Test the same task across multiple AI assistants to compare performance, approach, and output quality.

**Process**:
1. Define a test task (e.g., "implement binary search in TypeScript")
2. Configure task in multiple AI directories
3. Run the same prompt across different tools
4. Compare:
   - Code quality and correctness
   - Reasoning approach
   - Performance (speed, token usage)
   - Error handling and edge cases
   - Code style and readability

**Example Comparison Matrix**:

| Tool | Speed | Code Quality | Reasoning | Edge Cases | Style |
|------|-------|--------------|-----------|------------|-------|
| Claude | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cursor | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Continue | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

### 2. Skill Portability Testing

**Objective**: Test whether skills work consistently across different AI platforms.

**Process**:
1. Create skill in `.agents/skills/skill-name/`
2. Symlink to multiple AI tool directories
3. Test skill triggering with each AI tool
4. Verify consistent behavior
5. Document platform-specific quirks
6. Refine skill for maximum portability

**Portability Checklist**:
- [ ] Skill triggers correctly in Claude Code
- [ ] Skill triggers correctly in Cursor
- [ ] Skill triggers correctly in Continue
- [ ] Response format consistent across tools
- [ ] Scripts execute correctly (if any)
- [ ] Progressive disclosure works (references load on demand)

### 3. Framework Evaluation

**Objective**: Compare agent frameworks (OpenHands, Goose, Roo) for complex multi-step tasks.

**Test Scenarios**:
- **Code Refactoring**: Rename function across multiple files
- **Feature Implementation**: Add authentication to existing app
- **Bug Investigation**: Trace error through codebase
- **Documentation**: Generate API documentation from code

**Evaluation Criteria**:
- **Autonomy**: Can it complete tasks without constant guidance?
- **Tool Use**: Effective use of file operations, search, bash?
- **Planning**: Does it plan before executing?
- **Error Recovery**: Handles failures gracefully?
- **Context Management**: Maintains context across turns?

### 4. LLM Backend Comparison

**Objective**: Compare different LLM backends (Claude, GPT, Gemini, Qwen) for coding tasks.

**Test Categories**:
- **Code Generation**: Write new functions from specification
- **Bug Fixing**: Diagnose and fix issues
- **Code Review**: Identify problems in existing code
- **Refactoring**: Improve code structure
- **Documentation**: Write clear explanations

**Comparison Dimensions**:
- Accuracy and correctness
- Reasoning transparency
- Code style and idioms
- Performance (speed, token efficiency)
- Cost per task

### 5. Research and Development

**Objective**: Explore emerging AI tools and evaluate fit for specific use cases.

**Process**:
1. Add new AI tool directory (`.newtool/`)
2. Configure with project context
3. Test with standard benchmark tasks
4. Document strengths and weaknesses
5. Compare to existing tools
6. Decide: adopt, monitor, or deprecate

## Configuration Management

### Tool-Specific Settings

Each AI tool maintains its own configuration:

**Claude Code** (`.claude/settings.local.json`):
```json
{
  "allowed_commands": {
    "Bash(npx skills:*)": "always_allow",
    "Bash(ls:*)": "always_allow"
  },
  "auto_approve_permissions": ["Read", "Glob", "Grep"]
}
```

**Cursor** (`.cursor/settings.json`):
```json
{
  "cursor.ai.model": "claude-sonnet-4-5",
  "cursor.ai.maxTokens": 4096
}
```

**Continue** (`.continue/config.yaml`):
```yaml
models:
  - model: claude-sonnet-4-5
    provider: anthropic
    apiKey: env:ANTHROPIC_API_KEY
```

### Shared Resources

**Skills** (`.agents/skills/`):
- Master storage for all skills
- Symlinked to AI-specific directories
- Single source of truth

**GitHub Workflows** (`.github/`):
- Shared workflows (verified-response-capture)
- CI/CD pipelines
- GitHub Actions

**Documentation** (`docs/`):
- Project-wide documentation
- Shared knowledge base
- Best practices

### Credentials and API Keys

**Security Best Practices**:
- **Never commit** API keys or credentials
- Use environment variables: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`
- Store in `.env` file (git ignored)
- Use tool-specific credential management when available

**Example .env**:
```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
```

## Adding New AI Tools

### Setup Process

1. **Create Directory**:
   ```bash
   mkdir .newtool
   ```

2. **Add Configuration**:
   - Create tool-specific config files
   - Add `.gitignore` for sensitive files
   - Document setup in README (optional)

3. **Symlink Skills** (if supported):
   ```bash
   cd .newtool
   ln -s ../.agents/skills skills
   ```

4. **Test Basic Functionality**:
   - Verify tool can read project files
   - Test basic commands (read, write, search)
   - Ensure skill discovery works

5. **Document Setup**:
   - Add to this file (MULTI_AI_SETUP.md)
   - Note any special configuration
   - Document known issues or limitations

### Configuration Template

**Minimal Setup**:
```
.newtool/
├── config.yaml           # Tool configuration
├── .gitignore           # Ignore API keys, logs
└── README.md            # Setup instructions (optional)
```

**With Skills**:
```
.newtool/
├── config.yaml
├── skills/              # Symlink to .agents/skills/
├── .gitignore
└── README.md
```

## Best Practices

### Directory Isolation

**Principles**:
- Each AI tool operates independently
- No cross-contamination of settings
- Clean separation of concerns
- Tools can coexist without conflicts

**Benefits**:
- Test multiple tools simultaneously
- Compare approaches side-by-side
- Switch between tools easily
- No configuration interference

### Skills Management

**Centralized Storage**:
- Store all skills in `.agents/skills/`
- Use symlinks for distribution
- Maintain single source of truth
- Update once, applies everywhere

**Skill Development**:
- Test skill in one tool first
- Refine until working correctly
- Symlink to other tools
- Test portability across platforms

### Credentials

**Never Commit**:
- API keys
- Authentication tokens
- Personal access tokens
- Service credentials

**Storage Options**:
- Environment variables (`.env` file)
- Tool-specific credential storage
- System keychain/credential manager
- Azure Key Vault (for production)

### Documentation

**Document When**:
- Adding new AI tool
- Discovering tool-specific quirks
- Finding performance differences
- Identifying best use cases

**Update Files**:
- This file (MULTI_AI_SETUP.md)
- Tool-specific READMEs
- Comparison matrices
- Best practices guides

## Limitations

### Performance

**Considerations**:
- 32+ directories increase repository size
- Clone time may be slower
- Disk space usage higher
- Search/grep across all directories slower

**Mitigations**:
- Use `.gitignore` to exclude large caches
- Regularly clean up unused tool directories
- Consider sparse checkout for large repos
- Use fast SSD storage

### Maintenance

**Challenges**:
- Keeping multiple AI tools updated
- Configuration drift across tools
- Testing overhead increases with tools
- Documentation must stay current

**Strategies**:
- Focus on 3-5 primary tools
- Archive unused tool directories
- Automate configuration validation
- Regular pruning of obsolete tools

### Complexity

**Risks**:
- Confusing which tool is active
- Skills may behave differently per tool
- Troubleshooting becomes harder
- Learning curve for new contributors

**Solutions**:
- Clear directory naming conventions
- Document active/inactive tools
- Maintain tool comparison matrix
- Provide onboarding guide

## Research Findings

### Tool Comparison Matrix

**Current Assessment** (to be filled based on experience):

| Tool | Best For | Strengths | Weaknesses | Status |
|------|----------|-----------|------------|--------|
| **Claude Code** | Complex reasoning, planning | Excellent reasoning, tool use | Cost | Active |
| **Cursor** | Fast iterations | Speed, IDE integration | Less reasoning depth | Active |
| **Continue** | Open source, customizable | Flexibility, extensibility | Setup complexity | Testing |
| **OpenHands** | Autonomous agents | Autonomy, multi-step tasks | Early stage | Testing |
| **Gemini** | Google ecosystem | Integration, speed | Reasoning depth | Testing |
| **Qwen** | Chinese language, cost | Affordable, multilingual | English reasoning | Testing |

### Strengths by Tool Category

**IDE Integrations** (Claude, Cursor, Continue):
- **Strengths**: Fast feedback, context-aware, IDE features
- **Best For**: Active coding, quick iterations, refactoring
- **Limitations**: May require more guidance, less autonomous

**Agent Frameworks** (OpenHands, Goose, Roo):
- **Strengths**: Autonomous, multi-step planning, tool use
- **Best For**: Complex tasks, exploration, large refactors
- **Limitations**: Slower, higher cost, may need monitoring

**LLM Providers** (Codex, Gemini, Qwen):
- **Strengths**: Model diversity, specialized capabilities
- **Best For**: Evaluating different approaches, cost optimization
- **Limitations**: Integration effort, credential management

## Related Documentation

- [Skills System Documentation](../skills/README.md) - Reusable skills across AI tools
- [Skills Development Guide](SKILLS_DEVELOPMENT.md) - Creating portable skills
- [Project Overview](../README.md) - Full project documentation

## Contributing

### Adding Tool Assessments

When testing a new AI tool:
1. Create directory and configure
2. Test with standard benchmark tasks
3. Document findings in comparison matrix
4. Add strengths/weaknesses
5. Submit PR with assessment

### Updating Comparison Data

- Regular updates to comparison matrices
- Document version changes (tool updates may change behavior)
- Include test date and tool version
- Note any configuration changes

## Support

For issues related to:
- **Multi-AI setup**: Create issue in project repository
- **Specific AI tools**: Refer to tool documentation
- **Skills portability**: See Skills Development Guide
- **Configuration help**: Check tool-specific READMEs

---

**Note**: This multi-AI infrastructure is experimental and designed for research purposes. For production deployments, focus on 1-2 primary tools rather than maintaining all 32+.
