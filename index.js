const server = require("./app");
const MongoDB = require("./src/providers/database");
const config = require("./src/configs/database.config");

  
async function startServer() {
    try {
        await MongoDB.connect(config.uri);
        const PORT = config.port || "3000";
        server.listen(PORT, () => {
            //console.clear();
            console.log(`Website is running on port ${PORT}`);
            console.log(`Go to website: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}
console.clear();
startServer();
