import { promisify } from "util";
import fs from "fs";
import {uuidv4} from '../../lib/utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function POST(req, res) {
  const path = `./data/tickets.json`;
  let data = {};
  try {
    data = JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    console.error(e);
  }
  req.body.legs.map(leg => delete leg.pointsOnLink);
  req.body.id = uuidv4();
  data.activeTickets.unshift(req.body);
  writeFile(path, JSON.stringify(data), "utf8");
  return res.status(200).end();
}

export default (req, res) => {
  return POST(req, res);
};
