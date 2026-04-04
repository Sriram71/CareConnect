// const parseReport = (rawText) => {
//   const defaultString = "Not specified";

//   // Extract inventor name
//   const inventorNameMatch = rawText.match(/Patient\/Inventor Name:\s*(.+)/i);
//   const inventorName = inventorNameMatch ? inventorNameMatch[1].trim() : defaultString;

//   // Extract invention summary
//   const inventionSummaryMatch = rawText.match(/Invention Summary:\s*(.+)/i);
//   const inventionSummary = inventionSummaryMatch ? inventionSummaryMatch[1].trim() : defaultString;

//   // Extract priority level
//   const priorityLevelMatch = rawText.match(/Priority Level:\s*(High|Medium|Low)/i);
//   const priorityLevel = priorityLevelMatch ? priorityLevelMatch[1].trim() : defaultString;

//   // Extract key claims
//   const keyClaimsMatch = rawText.match(/Key Claims:\s*(.+)/i);
//   const keyClaims = keyClaimsMatch ? keyClaimsMatch[1].split(/\n|,|;/).map((claim) => claim.trim()).filter(Boolean) : [defaultString];

//   // Extract next steps
//   const nextStepsMatch = rawText.match(/Recommended Next Steps:\s*(.+)/i);
//   const nextSteps = nextStepsMatch ? nextStepsMatch[1].split(/\n|,|;/).map((step) => step.trim()).filter(Boolean) : [defaultString];

//   return {
//     inventorName,
//     inventionSummary,
//     priorityLevel,
//     keyClaims,
//     nextSteps,
//   };
// };

// export default parseReport;

// const parseReport = (rawText) => {
//   const get = (label) => {
//     const match = rawText.match(new RegExp(`${label}:\\s*(.*)`, "i"));
//     return match ? match[1].trim() : "Not specified";
//   };

//   return {
//     inventorName: get("Patient\\/Inventor Name"),
//     inventionSummary: get("Invention Summary"),
//     priorityLevel: get("Priority Level"),
//     keyClaims: get("Key Claims").split(/,|\n/).map(s => s.trim()).filter(Boolean),
//     nextSteps: get("Recommended Next Steps").split(/,|\n/).map(s => s.trim()).filter(Boolean),
//   };
// };

// export default parseReport;

const parseReport = (rawText) => {
  const get = (label) => {
    const match = rawText.match(new RegExp(`${label}:\\s*(.*)`, "i"));
    return match ? match[1].trim() : "Not specified";
  };

  return {
    patientName:       get("Patient Name"),
    issueSummary:      get("Summary of the Issue"),
    priorityLevel:     get("Priority Level"),
    recommendations:   get("Key Recommendations").split(/,|\n/).map(s => s.trim()).filter(Boolean),
  };
};

export default parseReport;