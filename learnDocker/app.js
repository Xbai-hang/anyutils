const express = require('express');

const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("<p>我嫩爹，你信不信</p><br><p>不信！！！！！！<br>骗你的</p>");
});
app.listen(PORT, () => {
    console.log(`启动端口${PORT}`);
})