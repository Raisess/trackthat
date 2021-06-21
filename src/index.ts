import Cli from "./Cli";

(async (): Promise<void> => {
  try {
    await new Cli().execute();
    process.exit(0);
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
})();
