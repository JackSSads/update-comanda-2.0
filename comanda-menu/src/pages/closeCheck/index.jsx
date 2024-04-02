import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Navbar } from "../../components";
import { CashierService } from "../../service/cashier/CashierService";
import { CheckService } from "../../service/check/CheckService";
import socket from "../../service/socket";

export const CloseCheck = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [obs, setObs] = useState("");
    const [products, setProducts] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [client, setClient] = useState("");

    const [check, setCheck] = useState([]);
    const [cashier, setCashier] = useState([]);
    const [cashierId, setCashierId] = useState("");
    const [union, setUnion] = useState([]);

    const [selPagId, setSelPagId] = useState("pix");
    const [checkStatus, setCheckStatus] = useState(true);

    useEffect(() => {
        getCheck();
        getCashier()
    }, []);

    useEffect(() => {
        for (let i = 0; i < cashier.length; i++) {

            // verificando se check já existe no cashier
            if (cashier[i]._id === id) {

                const deleteCheck = cashier.filter(item => item._id !== id);

                setCashier(deleteCheck);
            };
        };

        const newCheck = {
            _id: id,
            nameClient: client,
            pagForm: selPagId,
            products,
            status: false,
            totalValue,
            obs
        };

        setUnion(() => [...cashier, newCheck]);
    }, [client, cashier, selPagId]);

    const getCheck = useCallback(() => {

        try {
            CheckService.getById(id)
                .then((result) => {
                    setTotalValue(result.data.totalValue)
                    setClient(result.data.nameClient);
                    setProducts(result.data.products);
                    setObs(result.data.obs);
                    setCheck(result.data);

                    // verificando status da comanda
                    if (!result.data.status) {
                        setCheckStatus(false);
                    };
                })
                .catch((error) => { return toast.error(error) });

        } catch (error) {
            return toast.error(error);
        };

    }, [id]);

    const getCashier = useCallback(() => {
        try {
            CashierService.getAll()
                .then((result) => {
                    setCashier(result.data[0].comandas);
                    setCashierId(result.data[0]._id);
                });
        } catch (error) {
            return toast.error(error);
        };
    }, []);

    const editCheckStatus = () => {

        const data = {
            _id: check._id,
            nameClient: check.nameClient,
            obs: check.obs,
            products: check.products,
            status: false,
            totalValue: check.totalValue,
            pagForm: selPagId,
        };

        try {
            CheckService.updateById(id, data)
                .then((result) => {
                    setCheck(result.data);
                });

        } catch (error) {
            return toast.error(error);
        };
    };

    const closeCheck = () => {
        editCheckStatus();

        let totalValueCalculed = 0;

        for (let i = 0; i < union.length; i++) {
            let soma = union[i]["totalValue"];

            totalValueCalculed += soma;
        };

        const obj = {
            comandas: union,
            status: false,
            totalValue: totalValueCalculed
        };

        try {
            CashierService.updateById(cashierId, obj)
                .then(() => {
                    if (checkStatus) {
                        socket.emit("comanda_finalizada", client);
                        navigate("/garcom/comandas");
                    } else {
                        navigate("/comandasFinalizadas");
                    };
                });
        } catch (error) {
            return toast.error(error);
        };
    };

    const cancelCheck = () => {
        try {

            let totalValueCalculed = 0;

            for (let i = 0; i < cashierId.length; i++) {
                let soma = cashier[i]["totalValue"];

                totalValueCalculed += soma;
            };

            const obj = {
                _id: cashierId,
                comandas: cashier,
                totalValue: totalValueCalculed,
                status: false
            };

            CashierService.updateById(cashierId, obj);

            CheckService.deleteById(id);

            if (checkStatus) {
                socket.emit("comanda_cancelada", { client, id });
                navigate("/garcom/comandas");
            } else {
                navigate("/comandasFinalizadas");
            };

        } catch (error) {
            toast.error("Ocorreu um erro na comunicação com o DB");
        };
    };

    return (
        <>
            <Navbar title={`Fechar Comanda: ${client}`} url={`/garcom/comanda/${id}`} />
            <div className="w-[95%] min-h-[100vh] m-2 p-1 rounded-xl flex items-center justify-center flex-col gap-14">
                <Toaster />
                <div className="px-10 py-14 rounded-md shadow-xl bg-[#D39825]/10">
                    <ul className="max-w-2/3 flex gap-5 flex-col divide-y divide-dashed divide-slate-700">
                        {products.map((e, index) => (
                            <li key={index}
                                className="w-[100%] flex justify-between gap-5 text-slate-700 font-semibold">
                                <span><span className="text-[#EB8F00]">{e.qnt}x</span> - {e.nameProduct}</span><span className="font-bold text-slate-500">R$ {e.totalPrice.toFixed(2).replace(".", ",")}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="mt-5 text-center text-slate-900 font-bold text-[22px]">
                        Consumo: <span className="text-slate-500">R$ {parseFloat(totalValue).toFixed(2).replace(".", ",")}</span>
                    </h2>
                    <h2 className="flex flex-col mt-5 text-center text-slate-900 font-bold text-[28px]">
                        Total + 10%: <span className="text-slate-500">R$ {parseFloat(totalValue * 1.1).toFixed(2).replace(".", ",")}</span>
                    </h2>
                </div>

                <label className="flex flex-col text-slate-900 text-[20px] font-semibold">
                    Pagar com:
                    <select className="w-[250px] border p-3 rounded-xl"
                        id={selPagId}
                        name="selPag"
                        defaultValue={`pix`}
                        onChange={(e) => setSelPagId(e.target.value)}>
                        <option value={`pix`} >Pix</option>
                        <option value={`dinheiro`} >Dinheiro</option>
                        <option value={`credito`} >Crédito</option>
                        <option value={`debito`} >Débito</option>
                    </select>
                </label>

                <button className="w-[250px] p-3 font-semibold text-[#1C1D26] rounded-xl bg-[#EB8F00] hover:bg-[#1C1D26] hover:text-white transition-all delay-75"
                    onClick={() => closeCheck()}
                >{checkStatus ? "Finalizar Comanda" : "Atualizar Comanda"}</button>

                <button className="mt-20 w-[250px] p-3 font-semibold rounded-xl bg-red-600 text-white transition-all delay-75"
                    onClick={() => cancelCheck()}
                >Cancelar Comanda</button>
            </div>
        </>
    );
};
