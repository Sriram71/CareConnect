// const sendReport = async (report) => {
//   const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//   const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//   const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
//   const doctorEmail = import.meta.env.VITE_DOCTOR_EMAIL;

//   if (!window.emailjs) {
//     throw new Error('EmailJS SDK not loaded. Please check your index.html.');
//   }

//   const emailBody = `
// Patient Name: ${report.patientName}
// Priority Level: ${report.priorityLevel}

// Summary of Issue:
// ${report.issueSummary}

// Key Recommendations:
// ${report.recommendations.join('\n')}
//   `.trim();

//   const emailParams = {
//     to_email: doctorEmail,
//     subject: `New Patient Report — ${report.patientName} — Priority: ${report.priorityLevel}`,
//     body: emailBody,
//   };

//   try {
//     const response = await window.emailjs.send(
//       emailServiceId,
//       emailTemplateId,
//       emailParams,
//       emailPublicKey
//     );

//     if (response.status === 200) {
//       return { success: true };
//     } else {
//       throw new Error('Failed to send email.');
//     }
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Failed to send the report. Please try again later.');
//   }
// };

// export default sendReport;


/**
 * sendReport
 * Sends the report to the doctor via EmailJS.
 * If any environment variable is missing, it resolves successfully
 * (demo / hackathon mode) so the UI still shows a confirmation.
 */
const sendReport = async (report) => {
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toEmail    = import.meta.env.VITE_DOCTOR_EMAIL;

  // ── Demo mode: keys not configured yet ──────────────────────────────────
  const keysPresent = serviceId && templateId && publicKey && toEmail;
  if (!keysPresent) {
    console.info('[sendReport] Email keys not configured — running in demo mode.');
    // Simulate network latency so the UI feedback feels realistic
    await new Promise((r) => setTimeout(r, 900));
    return { success: true, demo: true };
  }

  // ── Live mode ────────────────────────────────────────────────────────────
  if (!window.emailjs) {
    throw new Error('EmailJS SDK not loaded. Check your index.html.');
  }

  const body = [
    `Patient Name   : ${report.patientName}`,
    `Priority Level : ${report.priorityLevel}`,
    '',
    'Summary of Issue:',
    report.issueSummary,
    '',
    'Key Recommendations:',
    ...report.recommendations.map((r, i) => `  ${i + 1}. ${r}`),
  ].join('\n');

  const params = {
    to_email : toEmail,
    subject  : `New Patient Report — ${report.patientName} — Priority: ${report.priorityLevel}`,
    body,
  };

  const response = await window.emailjs.send(serviceId, templateId, params, publicKey);
  if (response.status !== 200) throw new Error('EmailJS returned a non-200 status.');
  return { success: true, demo: false };
};

export default sendReport;