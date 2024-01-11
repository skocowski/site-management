'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"


interface PermitContextProps {
    type: string,
    setType: Dispatch<SetStateAction<string>>
}

const PermitsTypeContext = createContext<PermitContextProps>({
    type: 'all',
    setType: (): string => ''
})

interface ProviderProps {
    children: React.ReactNode
}

export const PermitsTypeContextProvider = ({ children } : ProviderProps) => {
    const [type, setType] = useState("all")

    return (
        <PermitsTypeContext.Provider value= {{ type, setType }}>
    {children}
            </PermitsTypeContext.Provider>
    )
}

export const usePermitsTypeContext = () => useContext(PermitsTypeContext)