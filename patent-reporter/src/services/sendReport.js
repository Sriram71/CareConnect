const sendReport = async (report) => {
  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const doctorEmail = import.meta.env.VITE_DOCTOR_EMAIL;

  if (!window.emailjs) {
    throw new Error('EmailJS SDK not loaded. Please check your index.html.');
  }

  const emailBody = `
    Inventor Name: ${report.inventorName}
    Priority Level: ${report.priorityLevel}

    Invention Summary:
    ${report.inventionSummary}

    Key Claims:
    ${report.keyClaims.join('\n')}

    Recommended Next Steps:
    ${report.nextSteps.join('\n')}
  `;

  const emailParams = {
    to_email: doctorEmail,
    subject: `New Patent Report — ${report.inventorName} — Priority: ${report.priorityLevel}`,
    body: emailBody,
  };

  try {
    const response = await window.emailjs.send(
      emailServiceId,
      emailTemplateId,
      emailParams,
      emailPublicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Failed to send email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the report. Please try again later.');
  }
};

export default sendReport;