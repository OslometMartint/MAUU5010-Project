import { promisify } from "util";
import fs from "fs";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function POST(req, res) {
  const path = `./data/tickets.json`;
  let data = {};
  try {
    data = JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    // noop
  }
  data.activeTickets.push(req.body);
  writeFile(path, JSON.stringify(data), "utf8");
  return res.status(200).end();
}

export default (req, res) => {
  return POST(req, res);
};
