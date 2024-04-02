const Check = require("../models/Check");

module.exports = class ComandaController {
    static async getAll(req, res) {
        try {
            const data = await Check.find();

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Check.findOne({ _id: id });

            if (!data) {
                return res.status(500).json({ message: "Erro ao buscar comanda", status: false });
            };

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { nameClient, obs, totalValue, status, pagForm } = req.body;

        if (nameClient === "" || obs === "" || totalValue === "" || status === "") {
            return res.json({ message: "Preencha todos os campos", status: false });
        };

        try {
            const comanda = { nameClient, obs, totalValue, pagForm, status };

            await Check.create(comanda);

            return new Promise(() => res.status(201).json({ message: "Comanda cadastrada com sucesso", status: true }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { products, totalValue, status, pagForm } = req.body;

        try {

            const data = { products, totalValue, status, pagForm };

            await Check.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Comanda atualizada", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(500).json({ message: "Cliente ineistente!", status: true });
        };

        try {
            await Check.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Comanda deletada", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteAll(req, res) {

        try {

            await Check.deleteMany({});

            return new Promise(() => res.status(200).json({ message: "Comandas deletadas", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};