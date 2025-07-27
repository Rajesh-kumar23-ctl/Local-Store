async function submitSupplierData(supplierData) {
  try {
    const res = await fetch("http://localhost:5000/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplierData)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to register supplier.");
    }

    return true;
  } catch (err) {
    throw err;
  }
}