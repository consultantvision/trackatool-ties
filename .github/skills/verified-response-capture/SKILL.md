---
name: verified-response-capture
description: Assist engineers in capturing and persisting correct agent responses as validated knowledge artifacts for regression testing and documentation.
---

# Verified Response Capture

This skill provides a standardized workflow for capturing, formatting, and storing verified agent responses. Use this skill when an engineer or reviewer confirms that the AI agent has provided a correct technical answer and wants to save it as a "Golden Record."

## When to Use

- When the user says "Save this response", "Mark as verified", or "Capture this answer".
- When building a dataset of ground-truth answers for regression testing.
- When creating a static FAQ based on successful conversation turns.

## Instructions

1. **Extract Context**:
    - Identify the **exact User Query** that triggered the response.
    - Identify the **full Agent Response** (text, lists, markdown).
    - Identify any **Context/Topic** that was active (e.g., "AesculapExpertise", "InstrumentIdentification").

2. **Format Content**:
    - Create a new Markdown file using the template below.
    - Filename convention: Kebab-case description of the query (e.g., `aesculap-brown-spots-remedy.md`).
    - Target Directory: `copilot/TIE Scan instrument/knowledge/verified_responses/` (Create if missing).

3. **File Template**:

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

1. **Confirm Action**:
    - Inform the user the file has been created at the specific path.
    - Suggest (optional) that this file can be used for future regression testing.
