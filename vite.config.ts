import { defineConfig } from "vitest/config";
import tsconfigPaths from "vitest-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'] // todos test que estiverem na pasta controller eu quero que use o environment novo 
    ]
  }
});
