

export async function packageStory(pdfFilename, title, paragraphs, imageURLs) {
  const pdfPath = `${pdfFilename}.pdf`;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add title to the PDF
  const page = pdfDoc.addPage();
  page.drawText(title, {
    x: 50,
    y: page.getHeight() - 100,
    size: 24,
    color: rgb(0, 0, 0), // black
  });

  // Add paragraphs and images to the PDF
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const imageURL = imageURLs[i];

    // Add paragraph text to the PDF
    page.drawText(paragraph, {
      x: 50,
      y: page.getHeight() - (i * 100) - 200,
      size: 12,
      color: rgb(0, 0, 0), // black
    });

    // Add image to the PDF
    if (imageURL) {
      const imageBytes = await fetch(imageURL).then(response => response.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      page.drawImage(image, {
        x: 50,
        y: page.getHeight() - (i * 100) - 400, // Adjust Y position as needed
        width: 200, // Adjust width as needed
        height: 100, // Adjust height as needed
      });
    }
  }

  // Save the PDF to file
  const pdfBytes = await pdfDoc.save();
  await writeFile(pdfPath, pdfBytes, 'base64');

  return pdfPath;
}
