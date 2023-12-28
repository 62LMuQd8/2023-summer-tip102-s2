import { StringService } from "./stringService.js";

console.log(StringService.decodeString("3[a]2[bc]"));
console.log(StringService.decodeString("3[a2[c]]"));
console.log(StringService.decodeString("2[abc]3[cd]ef"));