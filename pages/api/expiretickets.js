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
    console.error(e);
  }
  data.activeTickets = data.activeTickets.filter((a) => {
    if(new Date(a.endTime) < new Date()){
      data.expiredTickets.unshift(a);
    }
    return new Date(a.endTime) > new Date();
  });
  writeFile(path, JSON.stringify(data), "utf8");
  return res.status(200).end();
}

export default (req, res) => {
  return POST(req, res);
};
