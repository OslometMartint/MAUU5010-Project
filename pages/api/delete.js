import { promisify } from "util";
import fs from "fs";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
async function DELETE(req, res) {
  const path = `./data/tickets.json`;
  let data = {};
  try {
    data = JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    console.error(e);
  }
  data.activeTickets = data.activeTickets.filter(a => {
    return a.id != req.body.id;
  });
  writeFile(path, JSON.stringify(data), "utf8");
  return res.status(200).end();
}

export default (req, res) => {
  return DELETE(req, res);
};
