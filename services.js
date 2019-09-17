const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const booksRouter = require("./services/books")


const server = express();
// server.set("port", process.env.PORT || 3450)

server.use(cors())
server.use(bodyParser.json())

// var whitelist = ['https://strivebooks.herokuapp.com', 'http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

server.use("/books", booksRouter)


//cors(corsOptions), 


server.listen(3000, () => {
    console.log("Server running on port 3000")
  });
