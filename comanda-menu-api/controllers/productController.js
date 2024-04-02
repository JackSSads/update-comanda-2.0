const Product = require("../models/Product");

module.exports = class ProdutoController {
    static async getAll(req, res) {
        try {
            const data = await Product.find({});

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Product.findOne({ _id: id });

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { nameProduct, value, qnt, totalPrice, category } = req.body;

        if (nameProduct === "" || value === "" || qnt === null) {
            return res.json({ message: "Todos os campos são obrigatórios", status: false });
        };

        try {
            const data = { nameProduct, value, qnt, totalPrice, category, status: true, obs: "" };

            await Product.create(data);

            return new Promise(() => res.status(200).json({ message: "Produto cadastrado com sucesso", status: true }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { nameProduct, value, qnt, category, totalPrice } = req.body;

        try {
            const data = { nameProduct, value, category, qnt, totalPrice };

            await Product.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Produto atualizado", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: "Cliente ineistente", status: false });
        };

        try {
            await Product.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Comanda deletada", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};