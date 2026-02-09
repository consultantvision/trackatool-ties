# Deployment Guide

> Deployment procedures for TIE Scan agent and tracktool components

## Overview

This guide covers deployment procedures for all components of the tracktool-ties project. Currently, only the TIE Scan instrument is in production. trackatool deployment procedures will be added as the application is developed.

## TIE Scan Instrument Deployment

### Architecture

**Deployment Environment**:
- **Platform**: Microsoft Copilot Studio
- **Backend**: Azure Dataverse (Australia region: orga6ff2198.crm6.dynamics.com)
- **Model**: GPT-5 Chat
- **Authentication**: Integrated (Azure AD)
- **Account**: spdev@tiesurgical.com.au

**Git Repository**:
```bash
cd copilot
git remote -v
# origin: https://github.com/consultantvision/tie-copilot.git
```

### Prerequisites

**Access Required**:
- Microsoft Copilot Studio access (spdev@tiesurgical.com.au)
- Azure Dataverse permissions
- GitHub repository access (tie-copilot)
- SharePoint access for knowledge sources

**Tools**:
- Git with Git LFS
- Text editor (VS Code recommended)
- Web browser for Copilot Studio

### Deployment Workflow

#### 1. Local Development

```bash
# Navigate to copilot directory
cd copilot

# Check current status
git status

# Navigate to agent files
cd "TIE Scan instrument"

# Make changes to topics or agent configuration
# Examples:
# - Edit topics/AesculapExpertise.mcs.yml
# - Modify agent.mcs.yml instructions
# - Update settings.mcs.yml
```

**File Types**:
- `agent.mcs.yml` - Core agent instructions and behavior
- `settings.mcs.yml` - Deployment settings (rarely changed)
- `topics/*.mcs.yml` - Conversation topic definitions
- `knowledge/*.mcs.yml` - Knowledge source configurations

#### 2. Testing Locally

Before committing, review changes:

```bash
# View changes
git diff "TIE Scan instrument/topics/AesculapExpertise.mcs.yml"

# Validate YAML syntax (if yaml linter installed)
yamllint "TIE Scan instrument/topics/AesculapExpertise.mcs.yml"
```

**Common Validation Checks**:
- YAML syntax is valid (no tabs, proper indentation)
- Trigger queries are descriptive and diverse
- Power Fx expressions in conditions are correct
- Response text uses proper markdown formatting
- Citations reference correct catalog pages

#### 3. Commit Changes

```bash
# Stage specific files
git add "TIE Scan instrument/topics/NewTopic.mcs.yml"

# Or stage all changes
git add "TIE Scan instrument/"

# Commit with descriptive message
git commit -m "Add NewTopic for surface coating identification"

# Or multi-line commit message
git commit -m "$(cat <<'EOF'
Add NewTopic for surface coating identification

- Added 10 trigger queries covering color descriptions
- Implemented conditional logic for common coatings
- Calls Search dialog for detailed specifications
- Tested with DA090, DP380R, BM149R

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

**Commit Message Guidelines**:
- First line: Brief summary (50-70 chars)
- Blank line
- Detailed description of changes
- List specific topics/files modified
- Mention testing performed
- Include Co-Authored-By if applicable

#### 4. Push to GitHub

```bash
# Push to main branch
git push origin main

# Or push to feature branch for review
git checkout -b feature/new-topic
git push origin feature/new-topic
```

**Branch Strategy**:
- **main**: Production deployments
- **feature/***: New topic development
- **fix/***: Bug fixes and corrections
- **docs/***: Documentation updates

#### 5. Sync to Copilot Studio

1. **Open Copilot Studio**:
   - Navigate to https://copilotstudio.microsoft.com
   - Sign in with spdev@tiesurgical.com.au

2. **Select Agent**:
   - Click "Copilots" in left navigation
   - Select "TIE Scan instrument"

3. **Sync from GitHub**:
   - Click "Settings" (gear icon)
   - Select "Version Control"
   - Click "Sync now" or "Pull from GitHub"
   - Review changes to be synced

4. **Verify Sync**:
   - Check Topics list for new/updated topics
   - Review agent configuration if agent.mcs.yml changed
   - Verify no sync errors in notifications

#### 6. Test in Copilot Studio

**Test Chat Pane**:
1. Click "Test your copilot" (top right)
2. Type trigger queries for new/modified topics
3. Verify responses match expectations
4. Test conditional logic branches
5. Check knowledge source integration

**Test Scenarios**:
- Direct trigger queries from topic YAML
- Variations and natural phrasings
- Edge cases (typos, vague queries)
- Multi-turn conversations
- Disambiguation scenarios

**What to Verify**:
- Correct topic triggers
- Response text displays properly (markdown, formatting)
- Catalog citations work correctly
- Conditional logic branches as expected
- No error messages or failed actions
- Knowledge search returns relevant results

#### 7. Publish to Production

**Publishing Steps**:
1. In Copilot Studio, click "Publish" (top right)
2. Review changes to be published
3. Add publish notes (optional)
4. Click "Publish"
5. Wait for confirmation (usually 30-60 seconds)

**What Gets Published**:
- Agent configuration (agent.mcs.yml instructions)
- All topics (trigger queries, logic, responses)
- Knowledge source configurations
- Settings changes

**What Doesn't Get Published**:
- GitHub sync configuration
- Development test data
- Copilot Studio UI settings

#### 8. Post-Deployment Verification

**Immediate Checks** (within 5 minutes):
1. Test in production agent URL
2. Verify new topics trigger correctly
3. Test knowledge source queries
4. Check authentication works
5. Review initial user interactions

**Monitoring** (first 24 hours):
1. Review conversation logs in Copilot Studio
2. Check error rates in analytics
3. Monitor user satisfaction scores
4. Watch for escalation patterns
5. Verify knowledge source hit rates

### Rollback Procedures

If deployment causes issues:

#### Option 1: Revert Git Commit

```bash
# View recent commits
git log --oneline

# Revert to previous commit
git revert <commit-hash>

# Or reset to previous commit (destructive)
git reset --hard <previous-commit-hash>

# Push revert
git push origin main
```

#### Option 2: Sync Previous Version

1. In GitHub, navigate to previous commit
2. Note the commit hash
3. In Copilot Studio, sync specific commit
4. Test and republish

#### Option 3: Manual Fix

1. Edit problematic files directly in Copilot Studio
2. Test changes
3. Export changes back to GitHub
4. Commit corrected version

### Git Worktrees

The copilot repository uses git worktrees for parallel development:

```bash
# List existing worktrees
git worktree list

# Create new worktree for feature
git worktree add ../copilot.worktrees/feature-new-topic feature/new-topic

# Work in worktree
cd ../copilot.worktrees/feature-new-topic
# Make changes, test, commit

# Remove worktree when done
git worktree remove ../copilot.worktrees/feature-new-topic
```

**Benefits**:
- Multiple developers working on different features
- No branch switching overhead
- Isolated testing environments
- Parallel topic development

### Knowledge Source Updates

#### Device Catalogue Library

**Location**: SharePoint (tiesurgical.sharepoint.com/sites/QA/Surgical%20Instrument%20Library)

**Update Process**:
1. Add new manufacturer PDFs to SharePoint
2. Organize by manufacturer/category
3. Wait for automatic indexing (usually 1-2 hours)
4. Test queries in TIE Scan to verify new content

**No Code Changes Needed**:
- Device Catalogue Library syncs automatically from SharePoint
- Copilot Studio indexes new documents periodically
- No deployment required for content updates

**Verification**:
```
Test Query: "[New SKU or manufacturer]"
Expected: Results from newly added PDF
```

#### Verified Responses

**Location**: `copilot/TIE Scan instrument/knowledge/verified_responses/`

**Update Process**:
1. Use `verified-response-capture` skill to create markdown files
2. Commit to git repository
3. Push to GitHub
4. Sync in Copilot Studio (follows normal deployment workflow)

**Format**:
```markdown
# [Title]

**User Query:**
> [Exact user question]

**Verified Response:**
[Agent response that was verified correct]

---
**Metadata:**
- **Topic Context:** AesculapExpertise
- **Verified Date:** 2026-02-09
- **Status:** Verified / Golden Record
```

### Environment Variables and Secrets

**Managed in Azure Dataverse**:
- API keys (not stored in git)
- Connection strings
- SharePoint credentials
- Authentication tokens

**Access**:
- Azure Portal → Dataverse environment
- Copilot Studio Settings → Connections

**Security**:
- Never commit secrets to git repository
- Use Azure Key Vault for sensitive data
- Rotate API keys regularly
- Review access logs quarterly

## trackatool Deployment

### Status

**Not yet implemented.** trackatool is currently in planning phase.

### Planned Architecture

**Frontend**:
- Hosting: Vercel
- Build: Vite
- Deployment: GitHub Actions → Vercel

**Backend**:
- Hosting: Azure App Service
- Database: Azure PostgreSQL
- Deployment: GitHub Actions → Azure

**Deployment Procedures**:
- Will be added as trackatool development progresses
- Anticipated Q2-Q3 2026

## Monitoring and Alerts

### Copilot Studio Analytics

**Access**:
1. Copilot Studio → TIE Scan instrument
2. Click "Analytics" in left navigation

**Key Metrics**:
- **Conversation Volume**: Daily/weekly active users
- **Topic Trigger Rates**: Which topics are used most
- **User Satisfaction**: Thumbs up/down ratings
- **Escalation Rate**: How often users request human support
- **Knowledge Source Hits**: Catalog query success rate
- **Session Duration**: Average conversation length

**Monitoring Schedule**:
- Daily: Check error rates and escalations
- Weekly: Review topic performance and satisfaction
- Monthly: Analyze trends and optimization opportunities

### Azure Application Insights

**Logs Available**:
- API request logs
- Error and exception tracking
- Performance metrics
- Dependency tracking (SharePoint, Dataverse)

**Access**:
- Azure Portal → Application Insights
- Resource: TIE Scan instrument telemetry

### Alerts Configuration

**Recommended Alerts**:
1. **High Error Rate**: >5% of conversations fail
2. **Low Satisfaction**: <80% positive feedback
3. **Knowledge Source Down**: SharePoint unreachable
4. **Authentication Failures**: >10 failures in 1 hour
5. **High Escalation Rate**: >20% conversations escalated

**Alert Channels**:
- Email: spdev@tiesurgical.com.au
- Microsoft Teams: TIE DevOps channel
- Azure Monitor: Dashboard alerts

## Troubleshooting

### Deployment Sync Failures

**Symptoms**:
- "Sync failed" message in Copilot Studio
- Changes not appearing after sync

**Common Causes**:
1. YAML syntax errors
2. Invalid Power Fx expressions
3. GitHub connection issues
4. Permission problems

**Solutions**:
1. Validate YAML syntax locally
2. Check git commit for errors
3. Verify GitHub connection in Copilot Studio settings
4. Review error messages in sync log
5. Try manual export/import if sync repeatedly fails

### Topic Not Triggering in Production

**Symptoms**:
- Topic works in test pane, not in production
- Fallback topic triggers instead

**Debugging**:
1. Verify topic was published (check Topics list)
2. Test exact trigger queries from YAML
3. Check topic priority order
4. Review conversation logs for actual user queries
5. Test in incognito/private browser (cache issues)

**Solutions**:
- Republish agent
- Add more trigger query variations
- Adjust topic priority
- Clear browser cache

### Knowledge Source Not Returning Results

**Symptoms**:
- "No information found" responses
- Generic answers instead of catalog data

**Debugging**:
1. Test SharePoint access directly
2. Verify PDF is indexed in SharePoint
3. Check SharePoint permissions
4. Test with known-good SKU codes
5. Review Device Catalogue Library configuration

**Solutions**:
- Wait for SharePoint reindexing (1-2 hours)
- Verify SharePoint site permissions
- Check PDF file formats (must be searchable PDFs)
- Reupload problematic PDFs
- Contact SharePoint admin if persistent

### Performance Issues

**Symptoms**:
- Slow response times (>5 seconds)
- Timeouts on knowledge queries
- Users reporting delays

**Debugging**:
1. Check Azure status dashboard
2. Review Application Insights performance metrics
3. Test SharePoint response times
4. Check Dataverse query performance
5. Review conversation logs for slow topics

**Solutions**:
- Optimize conditional logic in slow topics
- Cache frequently accessed data
- Review SharePoint query complexity
- Contact Azure support if infrastructure issues
- Consider knowledge source optimization

## Security

### Access Control

**Copilot Studio**:
- Role-based access control (RBAC)
- Minimum 2 admins (spdev + backup)
- Regular access reviews (quarterly)

**GitHub Repository**:
- Protected main branch (requires PR approval)
- Code owners for sensitive files
- Signed commits recommended

**Azure Dataverse**:
- Azure AD authentication
- Service principal for automated deployments
- Regular audit log reviews

### Data Privacy

**PII Handling**:
- TIE Scan does NOT store user conversations by default
- Conversation logs retained 30 days in Copilot Studio
- No PHI or patient data in agent responses

**Compliance**:
- Follow TIE Surgical data retention policies
- HIPAA considerations for future features
- Audit trail for all agent changes

### Secrets Management

**Never Commit**:
- API keys
- Connection strings
- Certificates
- Passwords

**Storage**:
- Azure Key Vault for production secrets
- Copilot Studio Connections for API keys
- Environment variables for non-sensitive config

**Rotation Schedule**:
- API keys: Every 90 days
- Service principal secrets: Every 180 days
- Review: Monthly

## Best Practices

### Deployment Checklist

Before every deployment:
- [ ] Changes tested in Copilot Studio test pane
- [ ] YAML syntax validated
- [ ] Trigger queries tested with variations
- [ ] Knowledge source queries verified
- [ ] Conditional logic tested (all branches)
- [ ] Response text reviewed for accuracy
- [ ] Catalog citations checked
- [ ] Git commit message is descriptive
- [ ] Changes pushed to GitHub
- [ ] Sync to Copilot Studio successful
- [ ] Post-deployment testing complete

### Change Management

**For Minor Changes** (single topic updates):
- Commit directly to main
- Sync and publish
- Monitor for 24 hours

**For Major Changes** (multiple topics, agent.mcs.yml):
- Create feature branch
- Test thoroughly in dev environment (if available)
- Request peer review
- Merge to main via PR
- Sync and publish during low-traffic period
- Monitor closely for 48 hours

**For Critical Changes** (safety protocols, sterilization data):
- Mandatory peer review
- QA team validation
- Staged rollout if possible
- Extended monitoring period

### Documentation

**Update Documentation When**:
- New topics are added
- Agent instructions change significantly
- Deployment procedures change
- Known issues or workarounds discovered

**Files to Update**:
- [copilot/README.md](../copilot/README.md) - Topic descriptions
- [copilot/TIE_SCAN_GUIDE.md](../copilot/TIE_SCAN_GUIDE.md) - User-facing changes
- This file (DEPLOYMENT.md) - Procedure changes
- [copilot/docs/TOPIC_DEVELOPMENT.md](../copilot/docs/TOPIC_DEVELOPMENT.md) - Development patterns

## Related Documentation

- [TIE Scan Agent Documentation](../copilot/README.md)
- [Topic Development Guide](../copilot/docs/TOPIC_DEVELOPMENT.md)
- [TIE Scan User Guide](../copilot/TIE_SCAN_GUIDE.md)
- [Project Overview](../README.md)
- [Microsoft Copilot Studio Docs](https://docs.microsoft.com/copilot-studio/)

## Support

- **Deployment Issues**: spdev@tiesurgical.com.au
- **Copilot Studio Support**: Microsoft support portal
- **GitHub Issues**: Create issue in tie-copilot repository
- **Emergency Rollback**: TIE DevOps on-call

---

**Remember**: Always test changes in Copilot Studio test pane before publishing to production. When in doubt, create a feature branch and request review.
