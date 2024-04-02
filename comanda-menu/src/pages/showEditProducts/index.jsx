import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Navbar } from "../../components";
import { Delete, Edit, Close } from "../../libs/icons";
import { ProdutService } from "../../service/produt/ProdutService";

export const ShowEditProducts = () => {

    const [listProducts, setListProducts] = useState([]);

    // Estado que armazena o termo de filtro digitado
    const [filtro, setFiltro] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = useCallback( async () => {
        try {
            await ProdutService.getAll()
                .then((result) => { setListProducts(result.data) })
                .catch((error) => { return toast.error(error) });

            setListProducts(listProducts);
        } catch (error) {
            return toast.error(error);
        };
    }, []);

    const deleteById = (_id) => {
        try {
            ProdutService.deleteById(_id)
                .then((result) => {
                    if (result.status) {
                        getAllProducts();
                        toast.success("Produto deletado");
                    };
                })
                .catch((error) => { return toast.error(error) });
        } catch (error) {
            return toast.error(error);
        };
    };

    const itensFiltrados = listProducts.filter(item =>
        item.nameProduct.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <>
            <Navbar title={"Edite Produtos"} url={"/admin"} />
            <div className="w-[95%] min-h-[85vh] pt-3 pb-[190px] px-3 rounded-xl flex items-center flex-col gap-6">

                <Toaster />

                <div className="flex flex-col-reverse justify-center gap-5 px-3 py-5 w-full rounded-xl shadow-md">
                    <label className="flex gap-2 items-center">
                        <input
                            type="text"
                            className="w-full border rounded-xl p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Buscar produto..."
                            onChange={(e) => setFiltro(e.target.value)}
                            value={filtro}
                        />
                        <i onClick={() => setFiltro("")}><Close /></i>
                    </label>
                    <button className="font-semibold text-white py-2 px-5 rounded-md hover:bg-[#EB8F00] hover:text-[#1C1d26] bg-[#1C1D26] transition-all delay-75"
                        onClick={() => navigate("/novoProduto")}
                    >Novo Poduto</button>
                </div>

                {itensFiltrados.length === 0 && (
                    <div className="font-semibold text-xl">Nem um produto foi encontrado</div>
                )}

                {itensFiltrados.map((e) => (
                    <div key={e._id} className="flex justify-between bg-slate-100/20 items-center px-3 py-5 w-full rounded-xl shadow-md">

                        <div className="w-2/3 flex flex-col items-start">
                            <h3 className="text-slate-900 font-bold">{e.nameProduct}</h3>
                            <h3 className="text-slate-500 text-[15px] font-semibold">R$ {e.value.toFixed(2).replace(".", ",")}</h3>
                            <h3 className="text-[#EB8F00] text-[15px]">{e.category}</h3>
                        </div>

                        <div className="flex gap-8 border-l-2 pl-3">
                            <button className=" text-slate-900 hover:text-[#EB8F00] transition-all delay-75"
                                onClick={() => navigate(`/editeProduto/${e._id}`)}
                            ><Edit /></button>

                            <button className=" text-slate-900 hover:text-[#EB8F00] transition-all delay-75"
                                onClick={() => deleteById(e._id)}
                            ><Delete /></button>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};
