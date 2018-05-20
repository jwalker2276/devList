// Function formats a string removing spaces and uppercase characters
// Arguments : string
// Return: string
export function formatName(name) {
  return name.toLowerCase().replace(/\s/g, "");
}
