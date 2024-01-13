'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { Permit } from "./types"
import { fetchPermits } from "./Functions";


interface PermitContextProps {
    type: string,
    setType: Dispatch<SetStateAction<string>>,
    data: Permit[],
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
    allAmount: number
approvedAmount: number
rejectededAmount: number
pendingAmount: number
}


const PermitsTypeContext = createContext<PermitContextProps>({
    type: 'all',
    setType: (): string => '',
    data: [],
    isLoading: false,
    error: null,
    refetch: () => { },
    allAmount: 0,
    approvedAmount: 0,
    rejectededAmount: 0,
    pendingAmount: 0
}) 

interface ProviderProps {
    children: React.ReactNode
}

export const PermitsTypeContextProvider = ({ children } : ProviderProps) => {
    const [type, setType] = useState("all")
    const [data, setData] = useState<Permit[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    const fetchData = async () => {
        try {
         
            setIsLoading(true);
            const response = await fetchPermits();
            setData(response);

        } catch (err) {
            console.error("Error reading data", err);
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(
        () => {
            fetchData();
        }, []);
    
    const refetch = () => {
        fetchData();
    };

    const filterDataByStatus = (status: string): Permit[] => {
        return status === "all"
            ? data
            : data.filter((permit) => permit.status === status);
    };

    const allAmount = data.length
    const approvedAmount = filterDataByStatus("approved").length;
    const rejectededAmount = filterDataByStatus("rejected").length;
    const pendingAmount = filterDataByStatus("pending").length;

   

    return (
        <PermitsTypeContext.Provider value={{
            type, setType, data, isLoading, error, refetch, allAmount, approvedAmount, rejectededAmount, pendingAmount }}>
    {children}
            </PermitsTypeContext.Provider>
    )
}

export const usePermitsTypeContext = () => useContext(PermitsTypeContext)



