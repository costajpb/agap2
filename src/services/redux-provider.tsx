import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

type ReduxProviderProps = {
    children: ReactNode
}

export default function ReduxProvider({children}: ReduxProviderProps) {
    return (
        <Provider store={store}>{children}</Provider>
    )
}