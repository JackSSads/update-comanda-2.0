import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Navbar } from "../../components";
import { ProdutService } from "../../service/produt/ProdutService";

export const EditProduct = () => {

    const [value, setValue] = useState({
        nameProduct: "",
        price: 0,
        category: "Bebida"
    });

    const { id } = useParams();

    useEffect(() => {
        try {
            ProdutService.getById(id)
                .then((result) => {
                    setValue(prev => ({ ...prev, value: result.data["value"] }));
                    setValue(prev => ({ ...prev, category: result.data["category"] }));
                    setValue(prev => ({ ...prev, nameProduct: result.data["nameProduct"] }));
                })
                .catch((error) => { return toast.error(error) });
        } catch (error) {
            return toast.error(error);
        };
    }, []);

    
    const handleInput = (action, change) => {
        switch (action) {
            case "name":
                setValue(prev => ({ ...prev, name: change.target.value })); break;

            case "value":
                setValue(prev => ({ ...prev, value: change.target.value })); break;

            case "category":
                setValue(prev => ({ ...prev, category: change.target.value })); break;

            default: return;
        };
    };

    const updateById = () => {

        if (value.nameProduct === "" || value.category === "" || value.price === 0) {
            return toast.error("preencha todos os campos");
        };

        const data = {
            value: value.price,
            category: value.category,
            nameProduct: value.nameProduct,
            totalPrice: value.price,
        };

        try {
            ProdutService.updateById(id, data)
                .then((result) => {
                    if (result.status === true) {
                        return toast.success("Produto atualizado");
                    };
                })
                .catch((error) => { return toast.error(error); })
        } catch (error) {
            return toast.error(error);
        };
    };

    return (
        <>
            <Navbar title={`Edite o produto`} url={"/editeProduto"} />

            <div className="mx-10 flex justify-center items-center flex-col gap-5">
                <Toaster />
                <label className="text-slate-700 text-sm font-bold mb-2">
                    <input
                        type="text"
                        className="w-[250px] border rounded-xl p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Digite o nome do produto"
                        onChange={(e) => handleInput("name", e)}
                        value={value.nameProduct}
                    />
                </label>

                <label className="text-slate-700 text-sm font-bold mb-2">
                    <input
                        type="number"
                        className="w-[250px] border rounded-xl p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Digite o valor"
                        onChange={(e) => handleInput("value", e)}
                        value={value.price}
                    />
                </label>

                <label className="flex flex-col text-slate-900 font-semibold">
                    <select className="w-[250px] border p-3 rounded-xl"
                        id={value.category}
                        name="category"
                        onChange={(e) => handleInput("category", e)}>
                        <option value={`Bebida`} >Bebida</option>
                        <option value={`Drink`} >Sucos & Drinks</option>
                        <option value={`Petisco`} >Petisco</option>
                        <option value={`Porcao`} >Porção</option>
                        <option value={`Refeicao`} >Refeição</option>
                        <option value={`Salada`} >Salada</option>
                        <option value={`Doce`} >Doce</option>
                    </select>
                </label>

                <button className="flex justify-center w-[250px] p-3 font-semibold text-[#1C1D26] rounded-xl bg-[#EB8F00] hover:bg-[#1C1D26] hover:text-white transition-all delay-75"
                    onClick={() => updateById()}
                >Atualizar produto</button>
            </div>
        </>
    );
};
