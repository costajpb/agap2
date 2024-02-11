import { Provider as ReactReduxProvider } from 'react-redux'
import store from '.'
import { ReactNode } from 'react'

type ProviderProps = {
    children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
    return <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
}
