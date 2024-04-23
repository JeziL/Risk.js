// By ChatGPT
function downloadFile(data, fileName, base64encoded = false) {
  let byteString = data;
  let mime = '';
  if (base64encoded) {
    // Split the base64 string into the actual base64 data and the MIME type
    const [mimeInfo, base64] = data.split(',');
    mime = mimeInfo.match(/:(.*?);/)[1];

    // Convert base64 to raw binary data held in a string
    byteString = atob(base64);
  }

  // Convert that text into a byte array
  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a blob with the byte array
  const blob = new Blob([byteArray], { type: mime });

  // Create a link element for download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.style.display = 'none';

  // Append the link, trigger the click, then remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { downloadFile };
