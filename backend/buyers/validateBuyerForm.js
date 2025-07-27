
function validateBuyerForm() {
  const name = document.getElementById("buyer-name").value.trim();
  const email = document.getElementById("buyer-email").value.trim();
  const location = document.getElementById("buyer-location").value.trim();
  if (!name || !email || !location) {
    alert("All buyer fields are required.");
    return false;
  }
  return { name, email, location };
}
