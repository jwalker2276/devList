// Function formats a string removing spaces,uppercase and special characters
// Arguments : string
// Return: string
export function formatName(name) {
  // return name.toLowerCase().replace(/\s/g, "");
  return name.toLowerCase().replace(/[^a-z]/g, "");
}
