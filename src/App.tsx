import { useEffect, useState } from "react";
import { FormTransaction } from "./components/FormTransaction"

import { API } from "./api/api";


import { TypeBalanceConst } from "./helpers/typeBalance";
import { formatCurrency } from "./helpers/formatCurrency";
import { EstablishmentType } from "./interface/establishment";
import { useUser } from "./context/userContext";
import { useTransaction } from "./context/transactionContext";
import { formatDate } from "./helpers/formatDate";

function App() {
  const { user } = useUser();
  const { transaction } = useTransaction();


  const [establishment, setEstablishment] = useState<EstablishmentType[]>([]);


  useEffect(() => {
    handleEstablishment();
  }, [])


  const handleEstablishment = async () => {
    const { data } = await API.get("/establishment/all");

    setEstablishment(data);
  }


  return (
    <div className="grid grid-cols-3 h-[100vh]">
      <div className="flex justify-center items-center flex-col bg-slate-500">
        <h1>Passos para gerar os inputs</h1>
      </div>
      <div className="flex justify-center items-center flex-col bg-red-600">
        <div className="h-[800px] w-[400px] ">
          <img src="https://raw.githubusercontent.com/jnerydesigner/transaction-caju-test-case-frontend/main/public/new-phone.png" alt="device" className="h-full w-full" />
        </div>
        <div className="h-[724px] w-[350px] absolute bg-white left-[787x] rounded-[50px]">
          <div className="w-[70%] flex justify-center items-center mt-4 ml-[50px]">
            <img src="https://raw.githubusercontent.com/jnerydesigner/transaction-caju-test-case-frontend/main/public/caju-img.jpg" alt="Cartão Caju" />
          </div>
          <div className="top-[220px] left-[120px] flex justify-center items-center flex-row">
            <div>
              <h2>{user && user?.name}</h2>
              <p>5386 5210 8282 5595</p>
            </div>
            <div className="flex justify-center items-center flex-row ml-2 gap-4">
              <div className="flex justify-center items-center flex-col">
                <p>Validade</p>
                <p>31/25</p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>CVV</p>
                <p>826</p>
              </div>
            </div>


          </div>
          <div className="flex justify-between items-center flex-row ml-2 gap-4 px-8">
            <p>Limite</p>
            <p>{formatCurrency(user?.account.balanceAmount || 0)}</p>
          </div>
          {user?.account?.type.map((item) => (
            <div key={item.id} className="flex justify-between items-center flex-row ml-2 gap-4 px-8">
              <p>{TypeBalanceConst(item.balanceType)}</p>
              <p className="text-red-600 font-bold">{`- ${formatCurrency(Number(item.balance) || 0)}`}</p>
            </div>
          ))}

          <div>
            <FormTransaction establishment={establishment} account={user?.account.id || 0} />
          </div>
        </div>

      </div>
      <div className="bg-orange-500 flex justify-center items-center">

        <div className="w-[500px] h-full mt-6 mb-6 flex flex-1 justify-start items-start flex-col bg-[#ffeaa7]">

          <div className="w-[100%] flex justify-between items-center flex-col px-2 mb-[20px]">
            <h2>Caju Alimentação</h2>
            <div className="w-[100%] flex justify-between items-center flex-row px-2">
              <p>CNPJ: 00.000.000/0001-91</p>
              <p>IE 77744488</p>
            </div>
            <div className="w-[100%] flex justify-between items-center flex-row px-2">
              <p>Santa Luzia</p>
              <p>92 3526-3344</p>
            </div>
          </div>
          <div className="w-[100%] flex justify-between items-center flex-row px-2">
            <p>Estabelecimento</p>
            <p>Data</p>
            <p>Valor</p>
          </div>
          <div className="w-full border border-y-cyan-950"></div>

          {transaction?.map((item) => (
            <div key={item.id} className="w-[100%] flex justify-between items-center flex-row px-2 text-[0.8rem] my-1">
              <p>{item.establishment.merchant}</p>
              <p>{formatDate(item.createdAt)}</p>
              <p>{formatCurrency(item.totalAmount)}</p>
            </div>
          ))}






        </div>
      </div>
    </div>

  )
}

export default App
