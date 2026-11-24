const express = require("express");
const app = express();
app.use(express.json());
const studentRoutes = require("./routes/students");
const statsRoutes = require("./routes/stats");
app.use("/api/students", studentRoutes);
app.use("/api/students", statsRoutes);

app.listen(3000, () => {
    console.log("Đang chạy server");
});