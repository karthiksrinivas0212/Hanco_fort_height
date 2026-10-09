export async function submitEnquiry(fields, kind, request = fetch) {
  const prefix = kind === "visit" ? "visit" : "";
  const get = (key) => String(fields.get(prefix ? prefix + key[0].toUpperCase() + key.slice(1) : key) || "").trim();
  const payload = { name: get("name"), phone: get("phone").replace(/[^0-9]/g, ""), email: get("email"), city: get("city"), dialCode: get("phoneDialCode"), type: kind };
  if (!payload.name || !payload.phone || !payload.email) throw new Error("Please fill in your name, phone number and email.");
  const response = await request("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error(result.message || "Unable to submit. Please try again.");
  return result;
}
