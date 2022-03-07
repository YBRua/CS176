import { genMap, Shape } from "./mapGeneration";
import { renderMap } from "./mapRender";


const size: Shape = {height: 10, width: 10}
const numBonus = 10;
const score = 10;

const map = genMap(size, numBonus, score);
console.log(map);
renderMap(map, size);
