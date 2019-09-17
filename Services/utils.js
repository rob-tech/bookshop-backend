const fs = require("fs-extra")

getItems = async (fn) => {
    var buffer = await fs.readFile(fn);
    var content = buffer.toString();
    return JSON.parse(content);
}

saveItems = async (fn, items) => {
    await fs.writeFile(fn, JSON.stringify(items));
}