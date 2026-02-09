# Skills Development Guide

> Comprehensive guide to creating effective skills for AI-assisted development

## Overview

Skills are modular packages that extend AI agent capabilities with specialized knowledge, workflows, and tools. This guide covers the complete process of designing, implementing, and maintaining skills in the tracktool-ties project.

**What Are Skills?**

Skills are self-contained knowledge packages that:
- Provide specialized domain expertise (TypeScript, surgical instruments, etc.)
- Enable consistent workflows (verified response capture, deployment)
- Package reusable tools and scripts
- Work across multiple AI platforms (Claude, Cursor, Continue, etc.)

**Structure**:
```
skill-name/
├── SKILL.md              # Required: metadata + instructions
├── LICENSE.txt           # Optional: licensing information
├── scripts/              # Optional: executable code
├── references/           # Optional: documentation loaded on demand
└── assets/               # Optional: templates, files for output
```

## Skill Anatomy

### SKILL.md (Required)

The core file defining the skill:

```yaml
---
name: skill-name
description: Comprehensive description of what the skill does AND when to use it. Include triggers, contexts, and use cases.
---

# Skill Name

Detailed instructions for using the skill...

## When to Use

Specific scenarios that trigger this skill...

## Instructions

Step-by-step guidance for the AI...

## Examples

Concrete examples of skill usage...
```

**Key Components**:

1. **Frontmatter (YAML)**:
   - `name`: Skill identifier (kebab-case)
   - `description`: **Most important** - triggers skill loading

2. **Body (Markdown)**:
   - Instructions for the AI
   - Examples and use cases
   - Technical details

### Description Field (Critical)

The `description` is the **primary triggering mechanism**. AI tools scan descriptions to determine when to load skills.

**Bad Description** (too narrow):
```yaml
description: Create documents
```

**Good Description** (comprehensive):
```yaml
description: Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. Use when Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks
```

**Best Practices**:
- Include **what** the skill does (capabilities)
- Include **when** to use it (triggers, contexts)
- Be comprehensive (body loads AFTER triggering)
- List specific use cases
- Mention file types, tools, or technologies

### scripts/ (Optional)

Executable code for automation:

```
scripts/
├── init_skill.py         # Initialize new skill structure
├── validate.py           # Validate skill format
├── package.py            # Package skill for distribution
└── helpers/
    └── utils.py          # Shared utilities
```

**When to Include Scripts**:
- Automation of repetitive tasks
- Complex data processing
- File generation or manipulation
- Validation or testing

**Guidelines**:
- Use Python for portability
- Document dependencies in SKILL.md
- Include usage examples
- Handle errors gracefully

### references/ (Optional)

Domain knowledge loaded progressively:

```
references/
├── api-reference.md      # API documentation
├── examples.md           # Code examples
├── troubleshooting.md    # Common issues
└── advanced-patterns.md  # Advanced techniques
```

**Progressive Disclosure**:
- Overview in SKILL.md
- Details in references/ files
- AI loads references on demand
- Keeps context focused

**When to Use References**:
- Large domain knowledge (BigQuery tables, API specs)
- Multiple sub-topics (finance, sales, product metrics)
- Advanced patterns (not always needed)
- Troubleshooting guides

### assets/ (Optional)

Templates and files used in output:

```
assets/
├── templates/
│   ├── component.tsx     # React component template
│   ├── test.spec.ts      # Test template
│   └── readme.md         # Documentation template
└── boilerplate/
    └── project-structure/ # Full project scaffolding
```

**When to Include Assets**:
- Code templates for generation
- Project boilerplates
- Configuration file templates
- Example files for reference

## Development Process

### 1. Understanding Requirements

**Questions to Answer**:
- What problem does this skill solve?
- Who will use this skill (developers, engineers, AI researchers)?
- What knowledge or expertise does it package?
- What workflows does it enable?
- What tools or scripts are needed?

**Example Planning**:
```
Skill: aesculap-maintenance-protocol
Problem: Engineers need quick access to Aesculap-specific maintenance protocols
Users: Surgical instrument repair engineers
Knowledge: Sterilit oil protocols, pH-neutral cleaners, gold handle identification
Workflows: Diagnose stiffness, remedy brown spots, identify TC inserts
Tools: None (knowledge-based skill)
```

### 2. Planning Reusable Contents

**Decide on Architecture**:

**Pure Knowledge Skill**:
```
aesculap-maintenance-protocol/
└── SKILL.md                    # All knowledge in one file
```

**Knowledge with References**:
```
bigquery-analytics/
├── SKILL.md                    # Overview + navigation
└── references/
    ├── finance-metrics.md       # Revenue, billing data
    ├── sales-pipeline.md        # Opportunities, deals
    └── product-usage.md         # API calls, features
```

**Tool Integration Skill**:
```
verified-response-capture/
├── SKILL.md                    # Usage instructions
└── scripts/
    └── capture.py              # Capture and format responses
```

**Template Generation Skill**:
```
component-generator/
├── SKILL.md                    # Component patterns
├── scripts/
│   └── generate.py             # Generate from template
└── assets/
    └── templates/
        ├── component.tsx
        ├── test.spec.ts
        └── styles.css
```

### 3. Initialization

**Using skill-creator**:

```bash
# Initialize new skill
python .agents/skills/skill-creator/scripts/init_skill.py skill-name --path .agents/skills/

# Creates:
# .agents/skills/skill-name/
# ├── SKILL.md
# ├── LICENSE.txt
# ├── scripts/
# ├── references/
# └── assets/
```

**Manual Creation**:

```bash
mkdir -p .agents/skills/skill-name
cd .agents/skills/skill-name

# Create SKILL.md
cat > SKILL.md <<'EOF'
---
name: skill-name
description: Description of what this skill does and when to use it.
---

# Skill Name

Instructions...
EOF

# Add other files as needed
mkdir scripts references assets
```

### 4. Implementation

**Write SKILL.md**:

```markdown
---
name: aesculap-maintenance-protocol
description: Specialized Aesculap Orthodontics instrument maintenance protocols. Use when: (1) Diagnosing stiff joints on Aesculap instruments, (2) Addressing brown spots or discoloration, (3) Identifying gold handles and tungsten carbide inserts, (4) Cleaning or lubricating box joints, (5) Any Aesculap-specific maintenance questions.
---

# Aesculap Maintenance Protocol

Specialized knowledge for maintaining Aesculap Orthodontics instruments.

## When to Use

- Stiff joints after sterilization
- Brown spots or discoloration
- Identifying gold handles (Tungsten Carbide)
- DP SKU maintenance questions
- Box joint lubrication

## Critical Protocols

### Stiff Joints

**Root Cause**: Failure to lubricate before sterilization causes friction corrosion.

**Solution**:
1. Apply **Sterilit® I (JG600)** oil to box lock/joint
2. Must be applied **BEFORE** every autoclave cycle
3. Prevents stiffness and extends instrument life

**Product**: Sterilit® I, Item Code JG600

### Brown Spots

**Root Cause**: Alkaline cleaners damage passivation layer.

**Solution**:
1. Use **pH-neutral cleaners (7.0-8.5)** only
2. Avoid alkaline cleaners (pH >8.5)
3. Rinse thoroughly with distilled water
4. Dry completely before storage

**Prevention**: Always check cleaner pH before use.

### Gold Handles

**Identification**: Gold-colored handles indicate Tungsten Carbide (TC) inserts.

**Importance**:
- TC inserts are for cutting hard archwires
- Standard pliers will be damaged if used instead
- Higher durability for repetitive use

**SKU Pattern**: DP prefix (e.g., DP380R, DP387R)

## References

- Aesculap Orthodontics Catalog
- Sterilit® I Product Specification
- Box Joint Maintenance Guide
```

**Add Scripts** (if needed):

```python
# scripts/identify_instrument.py
"""
Identify Aesculap instruments from SKU pattern.
"""

def identify_aesculap_sku(sku: str) -> dict:
    """
    Identify Aesculap instrument type from SKU code.

    Args:
        sku: SKU code (e.g., "DP380R", "BM149R")

    Returns:
        dict with instrument type, category, features
    """
    prefix = sku[:2]

    if prefix == "DP":
        return {
            "type": "Orthodontic Pliers/Cutters",
            "category": "Orthodontics",
            "gold_handles": True,
            "tc_inserts": True
        }
    elif prefix == "BM":
        return {
            "type": "Needle Holder",
            "category": "Surgical Instruments",
            "ratchet": True
        }
    # ... more patterns
```

**Add References** (for progressive disclosure):

```markdown
# references/sku-patterns.md

# Aesculap SKU Patterns

## DP Prefix (Orthodontics)

### Format
`DP[3 digits][R optional]`

### Examples
- **DP380R**: Schure Scaler/Pusher, 175mm
- **DP387R**: Universal Forceps, curved, 140mm, TC inserts
- **DP501R**: Krampon pliers, 1.0-1.2mm capacity

### Identification Features
- Gold handles = Tungsten Carbide inserts
- Box joint construction
- Orthodontic applications

## BM Prefix (Needle Holders)

### Format
`BM[3 digits][R optional]`

### Examples
- **BM149R**: Mathieu-Standard, 140mm, self-retaining ratchet
- **BM151R**: Mathieu-Standard, 170mm variant

### Identification Features
- Ratchet mechanism
- Self-locking
- Needle holding capacity
```

### 5. Packaging

**Validate Skill**:

```bash
# Validate SKILL.md format
python .agents/skills/skill-creator/scripts/quick_validate.py .agents/skills/skill-name

# Checks:
# - YAML frontmatter valid
# - name and description present
# - Markdown formatting correct
# - File structure valid
```

**Package for Distribution** (optional):

```bash
# Package skill
python .agents/skills/skill-creator/scripts/package_skill.py .agents/skills/skill-name

# Creates: skill-name.skill (zip archive)
# Contains all files for distribution
```

### 6. Iteration

**Test Skill**:
1. Trigger skill with relevant prompts
2. Verify instructions are clear
3. Test scripts (if any)
4. Check progressive disclosure (references load correctly)
5. Validate outputs

**Refine**:
- Improve description triggers
- Add more examples
- Clarify ambiguous instructions
- Optimize script performance
- Add missing use cases

## Design Patterns

### Progressive Disclosure

For large skills, split content across multiple files:

**SKILL.md** (Overview):
```markdown
# BigQuery Analytics

Access company metrics from BigQuery warehouse.

## Metric Categories

For detailed information, see:
- [Finance Metrics](references/finance-metrics.md) - Revenue, billing, payments
- [Sales Metrics](references/sales-metrics.md) - Pipeline, opportunities, deals
- [Product Metrics](references/product-metrics.md) - API usage, features, engagement

## Quick Reference

Most common queries...
```

**references/finance-metrics.md** (Details):
```markdown
# Finance Metrics

Comprehensive finance metrics from BigQuery.

## Revenue Tables

### `analytics.monthly_revenue`
- **Columns**: `month`, `product`, `amount`, `currency`
- **Updated**: Daily at 2 AM UTC
- **Retention**: 36 months

### Example Query
```sql
SELECT month, SUM(amount) as total_revenue
FROM analytics.monthly_revenue
WHERE product = 'enterprise'
GROUP BY month
ORDER BY month DESC
LIMIT 12;
```

## Payment Tables

...
```

**Benefits**:
- Keep SKILL.md concise (< 500 lines)
- AI loads only relevant sections
- Easier to maintain
- Better organization

### Workflow Patterns

**Guided Workflow**:

```markdown
# Component Creation Workflow

Follow this step-by-step process to create a new React component.

## Step 1: Gather Requirements
- Component name (PascalCase)
- Props interface
- State requirements
- Styling approach

## Step 2: Generate Files
Using the component template:
1. Create `ComponentName.tsx`
2. Create `ComponentName.test.tsx`
3. Create `ComponentName.module.css`

## Step 3: Implement Component
[Detailed implementation guide...]

## Step 4: Write Tests
[Testing patterns...]

## Step 5: Document Component
[Documentation standards...]
```

**Diagnostic Workflow**:

```markdown
# Troubleshooting Workflow

Diagnose and resolve common issues.

## Symptom-Based Diagnosis

### Symptom: Stiff Joints
1. **Check**: Was instrument lubricated before sterilization?
   - Yes → Check lubrication type (must be Sterilit® I)
   - No → Likely friction corrosion, apply Sterilit® I

2. **Check**: Excessive force required to operate?
   - Severe → Inspect ratchet teeth for damage
   - Moderate → Clean and re-lubricate

### Symptom: Brown Spots
1. **Check**: What cleaning agent was used?
   - pH > 8.5 → Alkaline damage, switch to pH-neutral
   - pH 7.0-8.5 → Not cleaning-related, check storage

...
```

### Output Patterns

**Template-Based Output**:

```markdown
# Document Generation Skill

Generate standardized documents from templates.

## Output Format

```markdown
# [Document Title]

## Overview
[Brief description]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Implementation
[Details...]

## Testing
[Test cases...]
```

## Usage

Tell Claude: "Generate a PRD for [feature]"
Claude will use the template and fill in sections.
```

## Surgical Instrument Domain Skills

### Current Skills

**verified-response-capture** (`.github/skills/`):
- Captures verified TIE Scan responses
- Creates golden record markdown files
- Stores in `copilot/TIE Scan instrument/knowledge/verified_responses/`

### Planned Skills

**aesculap-expertise**:
- Deep Aesculap Orthodontics catalog knowledge
- Maintenance protocols (Sterilit oil, pH-neutral cleaners)
- SKU pattern recognition (DP prefix, gold handles)
- Box joint construction identification

**maintenance-protocol-library**:
- Comprehensive instrument maintenance procedures
- Manufacturer-specific protocols
- Common failure modes and remediation
- Quality control checklists

**sku-lookup-optimizer**:
- Advanced SKU search strategies
- Partial SKU matching algorithms
- Variant differentiation logic
- Catalog citation formatting

### Domain Considerations

**Patient Safety**:
- **CRITICAL:** prefix for safety-related information
- Never estimate sterilization temperatures
- Always cite manufacturer specifications
- Flag when data is incomplete

**Technical Precision**:
- Use exact catalog terminology
- Provide specific measurements (mm/inches)
- Include SKU codes and catalog pages
- Distinguish hard data from inferred information

**Engineer Workflow**:
- Fast answers (engineers are actively working)
- Structured responses (easy to scan)
- Actionable guidance (step-by-step)
- Verification instructions (how to confirm)

## Testing Skills

### Manual Testing

**Trigger Testing**:
```
Prompt: "I need to create a new TypeScript interface"
Expected: typescript-expert or typescript-advanced-types triggers

Prompt: "Save this response as verified"
Expected: verified-response-capture triggers
```

**Instruction Testing**:
- Follow skill instructions literally
- Verify outputs match expectations
- Test edge cases and error scenarios
- Check progressive disclosure (references load)

**Cross-Platform Testing**:
- Test in Claude Code
- Test in Cursor (if applicable)
- Test in Continue (if applicable)
- Document platform-specific behavior

### Validation

**Using skill-creator Validator**:

```bash
python .agents/skills/skill-creator/scripts/quick_validate.py .agents/skills/skill-name

# Checks:
# ✓ YAML frontmatter valid
# ✓ name present and valid (kebab-case)
# ✓ description present and comprehensive
# ✓ SKILL.md readable
# ✓ File structure valid
# ✓ No common errors
```

**Manual Validation Checklist**:
- [ ] YAML frontmatter parses correctly
- [ ] `name` matches directory name
- [ ] `description` is comprehensive (includes what AND when)
- [ ] Instructions are clear and actionable
- [ ] Examples are concrete and helpful
- [ ] Scripts execute without errors (if any)
- [ ] References load correctly (if any)
- [ ] Assets are accessible (if any)

## Distribution

### Internal Distribution

**Master Location**: `.agents/skills/`

**Sharing via Symlinks**:

```bash
# From skill directory
cd .agents/skills/skill-name

# Create symlinks in AI tool directories
ln -s ../../../.agents/skills/skill-name ../../.claude/skills/skill-name
ln -s ../../../.agents/skills/skill-name ../../.cursor/skills/skill-name

# Or for all tools
for dir in .claude .cursor .continue; do
  ln -s ../../../.agents/skills/skill-name ../$dir/skills/skill-name
done
```

**Shared Workflows**: `.github/skills/`
- Skills used by GitHub Actions
- Cross-project skills
- Verified-response-capture

### External Distribution

**Packaging**:

```bash
# Package skill
python .agents/skills/skill-creator/scripts/package_skill.py .agents/skills/skill-name

# Creates: skill-name.skill
# Contains all files + LICENSE.txt
```

**Installation Instructions**:

```markdown
# Installing skill-name

1. Download `skill-name.skill`
2. Extract to `.agents/skills/skill-name/`
3. Symlink to AI tool directories (if needed)
4. Test with trigger prompt
```

## Best Practices

### Description Writing

**Include What AND When**:

❌ **Bad**:
```yaml
description: TypeScript helper
```

✅ **Good**:
```yaml
description: TypeScript and JavaScript expert with deep knowledge of type-level programming, performance optimization, monorepo management, migration strategies, and modern tooling. Use PROACTIVELY for any TypeScript/JavaScript issues including complex type gymnastics, build performance, debugging, and architectural decisions.
```

**List Specific Triggers**:
```yaml
description: ... Use when: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks
```

### Content Organization

**Keep SKILL.md Concise**:
- Target: < 500 lines
- Use progressive disclosure for large skills
- Split into references/ for details
- Assume AI is intelligent (avoid over-explanation)

**Use Clear Headings**:
- ## When to Use
- ## Instructions
- ## Examples
- ## References

**Provide Concrete Examples**:
- Show expected input and output
- Include edge cases
- Demonstrate proper usage

### Degrees of Freedom

Choose based on task variability:

**High Freedom** (text-based instructions):
- AI interprets creatively
- Flexible approach
- Good for varying tasks

**Medium Freedom** (pseudocode with parameters):
- Structured guidance
- Some flexibility
- Good for semi-structured tasks

**Low Freedom** (specific scripts):
- Exact execution
- No interpretation needed
- Good for repetitive, precise tasks

### Error Handling

**In Instructions**:
```markdown
## Error Handling

If the SKU is not found:
1. Double-check SKU code spelling
2. Try searching by instrument description instead
3. Consult Device Catalogue Library directly
4. Escalate to manufacturer if still not found
```

**In Scripts**:
```python
def process_sku(sku: str) -> dict:
    try:
        # Process SKU
        return result
    except ValueError as e:
        return {
            "error": "Invalid SKU format",
            "message": str(e),
            "suggestion": "Check SKU format: [2 letters][3 digits][R optional]"
        }
```

## Common Patterns

### Knowledge Reference Skills

```
skill-name/
├── SKILL.md              # Overview + navigation
└── references/
    ├── topic-1.md        # Detailed knowledge
    ├── topic-2.md
    └── topic-3.md
```

**Use When**: Large domain knowledge, multiple sub-topics

### Tool Integration Skills

```
skill-name/
├── SKILL.md              # Usage instructions
└── scripts/
    ├── main.py           # Primary tool
    └── helpers.py        # Utilities
```

**Use When**: Automating workflows, external tool integration

### Template Skills

```
skill-name/
├── SKILL.md              # Template usage
└── assets/
    └── templates/
        ├── template-1.ext
        └── template-2.ext
```

**Use When**: Code generation, boilerplate creation

### Hybrid Skills

```
skill-name/
├── SKILL.md              # Instructions
├── scripts/
│   └── processor.py      # Automation
├── references/
│   └── patterns.md       # Detailed patterns
└── assets/
    └── templates/        # Templates
```

**Use When**: Complex skills with multiple capabilities

## Related Documentation

- [Skills System Overview](../skills/README.md) - Using skills
- [Multi-AI Setup](MULTI_AI_SETUP.md) - Cross-platform testing
- [skill-creator SKILL.md](.agents/skills/skill-creator/SKILL.md) - Meta-skill for creating skills
- [Project Overview](../README.md) - Full project documentation

## Support

For issues related to:
- **Skill creation**: Use skill-creator skill
- **Specific skills**: Contact skill maintainer
- **Platform compatibility**: See Multi-AI Setup Guide
- **General questions**: Create issue in project repository

---

**Remember**: Skills should be reusable, well-documented, and easy to maintain. Focus on solving specific problems with clear, actionable guidance.
