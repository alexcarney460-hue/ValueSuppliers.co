import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load env
const envPath = resolve(import.meta.dirname, "../.env.local");
const envFile = readFileSync(envPath, "utf8");
const env = {};
envFile.split("\n").forEach((line) => {
  const [key, ...val] = line.split("=");
  if (key && val.length) env[key.trim()] = val.join("=").trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

const EMAIL = "bee@valuesuppliersdirect.com";
const PASSWORD = "ValueSuppliers2026!";

try {
  const { data, error } = await supabase.auth.admin.createUser({
    email: EMAIL,
    password: PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Admin user created:", data.user.id);
    console.log("Email:", EMAIL);
    console.log("Password:", PASSWORD);
    console.log("\nBee can now log in at valuesuppliers.co/admin");
  }
} catch (err) {
  console.error("Failed:", err.message);
}
