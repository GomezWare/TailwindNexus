// FS import
import fs from "fs";

// Delete database file (Syncronic mode)
try {
  fs.unlinkSync("database/tnexus.db");
  console.log("(SUCCESS) Database purged");
} catch (err) {
  console.error("(ERROR) Deleting file:", err);
}
