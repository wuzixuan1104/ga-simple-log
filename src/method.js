/**
 * 將很長的字串，一次分割成多少
 */
export function chunkStr(str, chunkLength) {
  return str.match(new RegExp(`[\\s\\S]{1,${+chunkLength}}`, "g"));
}
