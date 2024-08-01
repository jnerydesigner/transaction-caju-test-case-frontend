import React, { ChangeEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { EstablishmentType } from "../interface/establishment";
import { API } from "../api/api";
import { useUser } from "../context/userContext";
import { useTransaction } from "../context/transactionContext";


interface FormData {
    amount: number;
    merchant: string;
}

interface FormTransactionProps {
    establishment: EstablishmentType[];
    account: number;
}


export const FormTransaction: React.FC<FormTransactionProps> = ({ establishment, account }) => {
    const { setUser } = useUser();
    const { setTransaction } = useTransaction();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [mcc, setMcc] = useState<string | null>('');
    const onSubmit: SubmitHandler<FormData> = async (data) => {

        const transaction = {
            amount: Number(data.amount),
            merchant: data.merchant,
            account,
            mcc: mcc || "5411"
        }

        await API.post("/transaction", transaction)
        await API.get("/user/find-one/103").then((response) => {
            setUser(response.data.user);
        });

        await API.get("/transaction/paginate").then((response) => {
            setTransaction(response.data);
        });
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedMcc = selectedOption.getAttribute('data-mcc');
        setMcc(selectedMcc);
    };
    return (
        <div className="max-w-md w-full px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4 text-center font-semibold text-gray-700">Formulário de Transação</h2>
            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Valor
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.amount ? 'border-red-500' : ''}`}
                        {...register('amount', { required: true })}
                    />
                    {errors.amount && <span className="text-red-500 text-xs italic">Amount is required.</span>}
                </div>



                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="merchant">
                        Estabelecimento
                    </label>
                    <select
                        id="merchant"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.merchant ? 'border-red-500' : ''}`}
                        {...register('merchant', { required: true })}
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecione um estabelecimento</option>
                        {establishment.map((item) => (
                            <option key={item.id} value={item.merchant} data-mcc={item.mcc}>{item.merchant}</option>
                        ))}
                    </select>
                    {errors.merchant && <span className="text-red-500 text-xs italic">Merchant is required.</span>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};




