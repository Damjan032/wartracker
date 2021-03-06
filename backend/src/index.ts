import express, { Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import sequelize from "./Models/database";
import initModel from "./Models/initModel";

import militaryLeaderRoutes from "./Routes/militaryLeaderRoutes";
import warRoutes from "./Routes/warRoutes";
import militaryLeaderWarRoutes from "./Routes/militaryLeaderWarRoutes";
import battlesRoutes from "./Routes/battleRoutes";
import militaryLeaderBattleRoutes from "./Routes/militaryLeaderBattleRoutes";
import militaryLeaderMapPositionRoutes from "./Routes/militaryLeaderMapPositionRoutes";
import battleMapPositionRoutes from "./Routes/battleMapPositionRoutes";
import mapRoutes from "./Routes/mapRoutes";
(async () => {
    try {
        await sequelize.authenticate();
        /*
        To apply changes to the database schema, you need to
        uncomment next two lines
        */
        await sequelize.sync({ force: true });
        await initModel();
        console.log("Connected to the database.");
    } catch (error) {
        console.log(error);
    }
})();

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use("/uploads", express.static("uploads"));

//routes
app.use("/militaryLeader", militaryLeaderRoutes);
app.use("/war", warRoutes);
app.use("/militaryLeaderWar", militaryLeaderWarRoutes);
app.use("/battles", battlesRoutes);
app.use("/militaryLeaderBattle", militaryLeaderBattleRoutes);
app.use("/militaryLeaderMapPosition", militaryLeaderMapPositionRoutes);
app.use("/battleMapPosition", battleMapPositionRoutes);
app.use("/map", mapRoutes);

app.use(express.static(__dirname + "/public/"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
);
