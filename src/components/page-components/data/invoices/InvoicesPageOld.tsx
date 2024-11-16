"use client";

function copyToClipboard(text: any) {
  // Create a textarea element
  const textarea: any = document.createElement("textarea");
  // Set the value of the textarea to the text you want to copy
  textarea.value = text;
  // Make the textarea invisible
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;
  // Append the textarea to the document body
  document.body.appendChild(textarea);
  // Select the text inside the textarea
  textarea.select();
  // Execute the copy command
  document.execCommand("copy");
  // Remove the textarea from the document body
  document.body.removeChild(textarea);
}

// Example usage:
const textToCopy = "Hello, world!";

copyToClipboard(textToCopy);
