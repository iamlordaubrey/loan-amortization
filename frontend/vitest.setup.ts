import { afterAll, afterEach, beforeAll } from "vitest";
import { expect } from 'vitest';
import matchers = require("@testing-library/jest-dom/matchers")

import { server } from './mocks/node'

expect.extend(matchers);

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
