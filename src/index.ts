import Cli from "./Cli";

(async (): Promise<void> => {
  await new Cli().execute();
})();
