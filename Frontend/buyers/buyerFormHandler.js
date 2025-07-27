
document.getElementById("buyer-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = validateBuyerForm();
  if (data) postBuyerData(data);
});
