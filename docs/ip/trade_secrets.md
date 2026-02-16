# MSALS Trade Secret Inventory

**CONFIDENTIAL — Internal use only.**
**These items should NOT be published in patent applications or public documentation.**

---

## Category 1: Prompt Engineering

### 1.1 Song Analysis Prompt Architecture
- Specific prompt structure that yields high-quality thematic analysis
- Domain-aware instruction injection patterns
- Reference generation calibration (scripture, psychology, leadership)
- Anti-lyric-quoting guardrails within prompt text

### 1.2 Plan Generation Prompt Architecture
- Multi-day plan structuring prompts
- Activity variety enforcement patterns
- Reflection question generation techniques
- Progressive difficulty calibration across plan days

### 1.3 Song Finder Prompt Architecture
- Confidence scoring prompts for song suggestions
- Clarifying question generation patterns
- Genre/mood/era filtering prompt integration

**Protection Measures:**
- Prompt templates stored in server-side edge functions only
- Never exposed in frontend code or API responses
- Source code access restricted to authorized developers

---

## Category 2: Scoring & Weighting Algorithms

### 2.1 Domain Relevance Scoring
- How song themes are weighted across educational domains
- Threshold values for domain tag assignment
- Multi-domain intersection handling

### 2.2 Learner Profile Weighting (Future)
- Modality weight computation from baseline assessment
- Engagement history impact on weight adaptation
- Initial weight defaults for cold-start learners

### 2.3 Content Quality Scoring (Future)
- Music generation output quality metrics
- Plan coherence evaluation criteria
- Reference relevance scoring

**Protection Measures:**
- Algorithms implemented in server-side code only
- Weights and thresholds not exposed in API responses
- Internal documentation access-controlled

---

## Category 3: Partner & Licensing Playbooks

### 3.1 Publisher Engagement Strategy
- Demand signal presentation methodology
- Licensing request volume thresholds for outreach
- Pricing model templates for licensing deals

### 3.2 School Pilot Playbook
- Teacher onboarding sequence
- Engagement metric collection methodology
- Proof-of-value presentation templates
- Expansion trigger criteria

### 3.3 District Sales Approach
- Compliance documentation templates
- ROI calculation methodology
- Procurement cycle navigation

**Protection Measures:**
- Strategy documents stored in private repositories only
- Access limited to business leadership
- Not included in product documentation

---

## Category 4: Operational Knowledge

### 4.1 AI Model Selection Criteria
- Which Gemini models work best for which task types
- Fallback model selection logic
- Token budget optimization per operation

### 4.2 Performance Optimization Patterns
- Database query optimization for plan retrieval
- Edge function cold start mitigation
- Caching strategies for repeated analyses

**Protection Measures:**
- Implementation details in server-side code
- Performance metrics internal-only

---

## Trade Secret Protection Policy

1. **Employee/Contractor NDAs** — Required before code access
2. **Access Control** — Repository access limited to authorized personnel
3. **Code Review** — All PRs reviewed for accidental secret exposure
4. **Documentation** — Trade secrets never in public docs or README files
5. **Exit Procedures** — Access revoked on departure; NDA survives termination
6. **Marking** — Internal documents containing trade secrets marked "CONFIDENTIAL"
7. **Inventory Updates** — This document reviewed and updated quarterly

---

**IMPORTANT:** Trade secret protection requires ACTIVE measures. Unlike patents, trade secrets have no filing — they are protected only as long as they remain secret and reasonable steps are taken to maintain secrecy.
