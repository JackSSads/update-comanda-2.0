import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Plus } from "../../libs/icons";
import { Navbar } from "../../components";
import toast, { Toaster } from "react-hot-toast";
import { CheckService } from "../../service/check/CheckService";

export const ClosedChecks = () => {
    const [rows, setRows] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllChecks();
    }, []);

    const getAllChecks = useCallback(() => {
        try {
            CheckService.getAll()
                .then((result) => { setRows(result.data) });
        } catch (error) {
            navigate("/admin");
            return toast.error(error);
        };
    }, []);

    return (
        <>
            <Navbar title={`Comandas Fechadas`} url={`/admin`} />

            <div className="w-[95%] min-h-[90vh] py-3 px-5 rounded-xl flex items-center flex-col gap-5">
                <Toaster />
                {rows.length > 0 ? rows.map((e) => (
                    <div className={` ${e.status ? "hidden" : "flex"}  justify-between items-center my-3 px-5 py-3 w-full rounded-xl bg-slate-100/20 shadow-md`}
                        key={e._id}>

                        <div className="flex flex-col">
                            <h3 className="text-slate-900 font-bold">{e.nameClient}</h3>
                            <h3 className="text-slate-400 font-semibold">{e.obs}</h3>
                            <h4 className="text-slate-500 text-[15px] font-semibold">
                                <span className="font-bold text-[#EB8F00]">Total:</span> R$ {e.totalValue.toFixed(2).replace(".", ",")}</h4>
                            <p className="text-slate-500 text-[15px] font-semibold">Pagamento:
                                <span className="font-bold text-[#EB8F00]"> {
                                    e.pagForm === "credito" ? "Crédito" :
                                        e.pagForm === "debito" ? "Débito" :
                                            e.pagForm === "pix" ? "Pix" :
                                                e.pagForm === "dinheiro" ? "Dinheiro" :
                                                    ""}</span>
                            </p>
                        </div>

                        <button className=" p-2 rounded-md bg-[#1C1D26] text-white hover:text-[#1C1D26] hover:bg-[#EB8F00] transition-all delay-75"
                            onClick={() => navigate(`/garcom/comanda/${e._id}`)}
                        ><Plus /></button>
                    </div>
                )) : (
                    <div className="flex justify-between items-center my-3 px-5 py-3 w-full rounded-xl shadow-md">

                        <div className="flex flex-col">
                            <h3 className="text-slate-900 font-bold">Você não possui comandas finalizadas</h3>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};