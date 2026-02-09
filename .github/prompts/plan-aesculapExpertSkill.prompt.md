## Plan: Create Aesculap Expert Skill (Agent Topic)

I will implement a specialized "Expert Skill" (Topic) for the **TIE Scan** agent that leverages the specific Aesculap logic we found (e.g., Gold Handles = TC, Sterilit maintenance) to improve search accuracy and troubleshooting.

### Steps
1.  Create [topics/AesculapExpertise.mcs.yml](copilot/TIE%20Scan%20instrument/topics/AesculapExpertise.mcs.yml) with triggers for "Aesculap", "DP*", "Gold handle", and "Stiff joint".
2.  Implement **Identification Logic**: Add conditions to map "Gold Handles" to "Tungsten Carbide" and "DP prefix" to "Pliers" to refine the search query.
3.  Implement **Maintenance Logic**: Add a path for "Stiffness/Rust" that specifically cites the *Sterilit®* oil and *Neutral pH* rules found in the deep dive.
4.  Update [agent.mcs.yml](copilot/TIE%20Scan%20instrument/agent.mcs.yml) to incorporate the new topic into the agent's workflow (or ensure triggers invoke it).

### Further Considerations
1.  **Clarification:** "Skill" usually refers to an Agent Topic in this context. If you meant a "Coding Skill" (a `.md` file in `.github/skills` for *me*, Copilot, to use), please let me know.
2.  **Prerequisite:** Ensure `Aesculap - Orthodontics.pdf` is uploaded to the SharePoint library.
3.  **Integration:** Should this topic replace the generic [InstrumentIdentification](copilot/TIE%20Scan%20instrument/topics/InstrumentIdentification.mcs.yml) for all queries, or only trigger when Aesculap-specific terms are detected? (Recommended)?
