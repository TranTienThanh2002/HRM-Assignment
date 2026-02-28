import { API_URL } from "./config.js";
import { showMessage, showLoading } from "./ui.js";

export async function request(endpoint, options = {}) {
  try {
    showLoading(true);

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "API Error");
    }

    return await res.json();
  } catch (err) {
    showMessage(err.message, "error");
    throw err;
  } finally {
    showLoading(false);
  }
}
