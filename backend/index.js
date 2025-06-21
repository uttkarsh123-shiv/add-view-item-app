require("dotenv").config();
const connectDb = require("./Config/db");
const app =  require("./app");

const PORT = process.env.PORT || 3000;

connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
})
