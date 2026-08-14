import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount React trees after every test so the jsdom document stays clean between cases.
afterEach(() => {
  cleanup();
});
