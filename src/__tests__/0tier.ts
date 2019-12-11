import { expect } from "chai";
import dotenv from "dotenv";
import * as _ from "lodash";

dotenv.config();

describe("default tests", () => {
  it("test name", async () => {
    const name = "world";
    expect(name).to.eq("world");
  });
});
