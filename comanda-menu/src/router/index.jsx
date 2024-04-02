import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import {
    Admin,
    Login,
    ListingChecks,
    Preparation,
    Waiter,
    ListingProduts,
    CloseCheck,
    ClosedChecks,
    ManageUser,
    CreateProdut,
    EditProduct,
    ShowEditProducts,
} from "../pages";

export const AppRoutes = () => {

    /* 12 */
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path={`/:funcao/comandas`} element={
                <PrivateRoute>
                    <ListingChecks />
                </PrivateRoute>
            } />
            <Route path={`/:funcao/producao`} element={
                <PrivateRoute>
                    <Preparation />
                </PrivateRoute>
            } />

            <Route path={`/:funcao/comanda/:id`} element={
                <PrivateRoute>
                    <Waiter />
                </PrivateRoute>
            } />
            <Route path={`/garcom/comanda/:id/add-product`} element={
                <PrivateRoute>
                    <ListingProduts />
                </PrivateRoute>
            } />
            <Route path={`/garcom/comanda/:id/fechar-comanda`} element={
                <PrivateRoute>
                    <CloseCheck />
                </PrivateRoute>
            } />

            <Route path={`/admin`} element={
                <PrivateRoute>
                    <Admin />
                </PrivateRoute>
            } />
            <Route path={`/usuarios`} element={
                <PrivateRoute>
                    <ManageUser />
                </PrivateRoute>
            } />
            <Route path={`/comandasFinalizadas`} element={
                <PrivateRoute>
                    <ClosedChecks />
                </PrivateRoute>
            } />

            <Route path={`/novoProduto`} element={
                <PrivateRoute>
                    <CreateProdut />
                </PrivateRoute>
            } />
            <Route path={`/editeProduto`} element={
                <PrivateRoute>
                    <ShowEditProducts />
                </PrivateRoute>
            } />
            <Route path={`/editeProduto/:id`} element={
                <PrivateRoute>
                    <EditProduct />
                </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};