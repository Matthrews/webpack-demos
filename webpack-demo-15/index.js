import { add, minus } from "./util";

if (DEBUG) {
  console.log(add(1, 2));
} else {
  console.log(minus(4, 2));
}

import("./package.json").then((res) => {
  console.log(res.version);
});
