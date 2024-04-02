const mongoose = require("mongoose");

const Comanda = mongoose.model("Comanda", {
    nameClient: String,
    obs: String,
    products: Array,
    totalValue: Number,
    status: Boolean,
    pagForm: String
});

module.exports = Comanda;