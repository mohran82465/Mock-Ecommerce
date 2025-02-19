const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("api")
app.post("/checkout", async (req, res, next) => {
    try {
        const  {items} = req.body ; 
        const lineItems =  items.map((item) => ({
            price:item.price,
            quantity: item.quantity,
        })); 
        const session = await stripe.checkout.sessions.create({ // Fixed method name
            line_items:lineItems,
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html",

        });
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log("app is runnig on port 4242"));
