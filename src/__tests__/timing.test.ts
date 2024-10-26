import { expect } from "@std/expect";
import { FakeTime } from "@std/testing/time";

import { delay, randomDelay } from "../utils/timing.ts";

Deno.test("delay should resolve after the specified time", () => {
    using time = new FakeTime();
    const delayTime = 1000;
    const start = Date.now();

    delay(delayTime);
    time.tick(delayTime);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(delayTime);
});

Deno.test("randomDelay should resolve after a random time", () => {
    using time = new FakeTime();
    const min = 1000;
    const max = 2000;
    const start = Date.now();

    randomDelay(min, max);
    time.tick(max);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(min);
    expect(end - start).toBeLessThanOrEqual(max);
});
