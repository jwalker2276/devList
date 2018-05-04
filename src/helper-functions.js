// Function to determine the symbol displayed in a list item
// Arguments : string
// Return : string path
export function getCostSymbol(cost) {
  //if cost is paid return the path to the paid symbol
  if (cost === "paid" || cost === "Paid") {
    return "./images/currency-dollar.svg";
    //else return the path to the free symbol
  } else {
    return "./images/education.svg";
  }
}

// Function formats a string removing spaces and uppercase characters
// Arguments : string
// Return: string
export function formatName(name) {
  return name.toLowerCase().replace(/\s/g, "");
}
