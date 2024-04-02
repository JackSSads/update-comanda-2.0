import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {

    const [isNewCheck, setIsNewCheck] = useState(false);

    return (
        <PageContext.Provider value={{ isNewCheck, setIsNewCheck }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => {
    return useContext(PageContext);
};
