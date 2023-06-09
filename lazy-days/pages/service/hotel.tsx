import DefaultLayout from "@/layouts/DefaultLayout";
import { Card, Table } from "flowbite-react";
import React from "react";
import Service from ".";
import NoSSR from "../../components/NoSSR";
import { useState, useEffect } from "react";
import axios from 'axios';
import { faL } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type Props = {
   serviceDetail?: any;
   type?: string;
   onChangeProps?: any;
   detailChoose?: any;
   listHS?: any;
   listP?: any;
   productDetail?: Detail;
   onChangeAmount?: any;
   idChoose?: string;
   AmountValue?: string;
   dataCheck?: any;
   Choose?: any;
   setTotal?: any;
   total?: any;
};

type Detail = {
   MA_DV: string;
   Tendichvu: string;
   Gia: number;
   Diadiem: string;
   Mota: string;
   // type: string;
};


const RenderService = (props: Props) => {
   // const choose = 'DV001'
   const amount = 1
   useEffect(() => {
      // console.log("DDDD",props.serviceDetail)
   }, [])
   return (
      <Table.Row>
         <Table.Cell className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" >
            <input
               id={props.serviceDetail?.MA_DV}
               type="radio"
               name="Service"
               value={props.serviceDetail?.MA_DV}
               onChange={props.onChangeProps}

               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
               htmlFor={props.serviceDetail?.MA_DV}
               className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
               {props.serviceDetail?.TENDICHVU}
            </label>
         </Table.Cell>
         <Table.Cell>{props.serviceDetail?.GIA}</Table.Cell>
         <Table.Cell>{props.serviceDetail?.DIADIEM}</Table.Cell>
         <Table.Cell>
            <input
               type="number"
               className="w-24 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
               name={`Service${props.serviceDetail?.MA_DV}`}
               min={1}
               defaultValue={0}
               value={props.idChoose === props.serviceDetail?.MA_DV ? props.AmountValue : 0}
               onChange={props.onChangeAmount}
            />
         </Table.Cell>
      </Table.Row>
   );
};

const RenderProduct = (props: Props) => {
   return (
      <Table.Row>
         <Table.Cell className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
               id={props.serviceDetail?.MA_DV}
               type="radio"
               name="Service"
               value={props.serviceDetail?.MA_DV}
               onChange={props.onChangeProps}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
               htmlFor={props.serviceDetail?.MA_DV}
               className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
               {props.serviceDetail?.TENDICHVU}
            </label>
         </Table.Cell>
         <Table.Cell>{props.serviceDetail?.GIA}</Table.Cell>
         <Table.Cell>
            <input
               type="number"
               className="w-24 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
               name="quanityProduct"
               min={0}
               defaultValue={0}
               value={props.idChoose === props.serviceDetail?.MA_DV ? props.AmountValue : 0}
               onChange={props.onChangeAmount}

            />
         </Table.Cell>
      </Table.Row>
   );
};

const ListService = (props: Props) => {
   useEffect(() => {
      // console.log("CCC",props.listHS)
   }, [])
   return (
      <Table className="mt-5 overflow-y-scroll text-sm text-gray-700 dark:text-gray-200 h-64 block">
         <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>

         </Table.Head>
         <Table.Body>

            {props.listHS.map((serviceDetail: any, index: any) => {
               return (
                  <RenderService
                     key={index}
                     serviceDetail={serviceDetail}
                     onChangeProps={props.onChangeProps}
                     onChangeAmount={props.onChangeAmount}
                     idChoose={props.idChoose}
                     AmountValue={props.AmountValue}
                  />
               );
            })}

         </Table.Body>
      </Table>
   );
};

const ListProduct = (props: Props) => {
   useEffect(() => {
      // console.log("AAAA", props.listP)
   }, [])
   return (
      <>
         <Table className="mt-5 overflow-y-scroll text-sm text-gray-700 dark:text-gray-200 h-64 block">
            <Table.Head>
               <Table.HeadCell>Name</Table.HeadCell>
               <Table.HeadCell>Price</Table.HeadCell>
               <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

               {props.listP.map((serviceDetail: any, index: any) => {
                  return (
                     <RenderProduct
                        key={index}
                        serviceDetail={serviceDetail}
                        onChangeProps={props.onChangeProps}
                        onChangeAmount={props.onChangeAmount}
                        idChoose={props.idChoose}
                        AmountValue={props.AmountValue}
                     />
                  );
               })}
            </Table.Body>
         </Table>
      </>
   );
};

const DetailChoose = (pros: Props) => {
   const [sale, setSale] = useState(0)
   const [price, setPrice] = useState(0)
   const saleCost = (combo: any, chose: any) => {
      // console.log("combo",combo)
      // console.log("chose", chose)
      if (combo == null) return 0;
      let sale = combo.find((x: any) => x.Ma_Dv == chose)
      // console.log("sale",sale)
      if (sale != null) {
         return sale.Giamgia
      }
      else {
         return 0;
      }
   }

   useEffect(() => {
      let sale1 = saleCost(pros.dataCheck.data2, pros.detailChoose.MA_DV)
      let total1 = pros.detailChoose?.GIA * (Number(pros.AmountValue)) - pros.detailChoose?.GIA * sale1 * (Number(pros.AmountValue)) / 100
      setPrice(total1)
      pros.setTotal(total1)
      setSale(sale1)
   }, [])
   useEffect(() => {
      let sale1 = saleCost(pros.dataCheck.data2, pros.detailChoose.MA_DV)
      let total1 = pros.detailChoose?.GIA * (Number(pros.AmountValue)) - pros.detailChoose?.GIA * sale1 * (Number(pros.AmountValue)) / 100
      setPrice(total1)
      pros.setTotal(total1)
      setSale(sale1)
   }, [pros.detailChoose.MA_DV])
   useEffect(() => {
      let sale1 = saleCost(pros.dataCheck.data2, pros.detailChoose.MA_DV)
      let total1 = pros.detailChoose?.GIA * (Number(pros.AmountValue)) - pros.detailChoose?.GIA * sale1 * (Number(pros.AmountValue)) / 100
      setPrice(total1)
      pros.setTotal(total1)
   }, [pros.AmountValue])
   return (
      <section className="flex justify-center items-center px-2 pt-16">
         <div className="wrapper w-4/5 bg-gray-50 rounded-b-md shadow-lg overflow-hidden">
            <div className="p-3  space-y-3 bg-gray-200 text-center">
               <div className="flex justify-around items-center px-2 ">
                  <h3 className="text-gray-700 text-4xl font-semibold text-md">
                     Customer: {pros.dataCheck.data1.Ten_KH}
                  </h3>
                  <h3 className="text-gray-700 text-4xl font-semibold text-md pl-7">
                     Phone: {pros.dataCheck.data1.SDT}
                  </h3>
               </div>
               <h3 className="text-gray-700 text-4xl font-semibold text-md">
                  Service name: {pros.detailChoose?.Tendichvu}
               </h3>
               <p className="text-3xl text-gray-900 leading-sm">
                  Location: {pros.detailChoose?.DIADIEM}
               </p>
               <p className="text-3xl text-gray-900 leading-sm">
                  Price: {pros.detailChoose?.GIA}
               </p>
               <p className="text-3xl text-gray-900 leading-sm">
                  Amount: {pros.AmountValue}
               </p>
               <p className="text-3xl text-gray-900 leading-sm">
                  Sale: {sale} %
               </p>
               <p className="text-3xl text-gray-900 leading-sm">
                  Total: {price}
               </p>
            </div>
         </div>
      </section>
   );
};

const Hotel = (props: Props) => {
   const [type, setType] = useState("Service");
   const [choose, setChoose] = useState("");
   const [detailChoose, setDetailChoose] = useState<any>([]);

   const [showTables, setShowTables] = useState<any>(0);
   const [HotelService, setHoTelService] = useState([])
   const [Product, setProduct] = useState([])
   const [phone, setPhone] = useState('')
   const [dataCheck, setDataCheck] = useState<any>(null)
   const [loading, setLoading] = useState(true)
   const [amount, setAmount] = useState("1")
   const [total, setTotal] = useState(0)
   const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setType(e.target.value);
      setLoading(true)
   };

   const handleChangeList = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChoose(e.target.value);
      setAmount("1")
      // console.log("click", e.target.value)
      if (type === "Service") {
         let serviceChoose = HotelService.find((s: any) => s.MA_DV == e.target.value)
         // console.log(serviceChoose)
         setDetailChoose(serviceChoose)
      }
      if (type === "Product") {
         let productChoose = Product.find((s: any) => s.MA_DV == e.target.value)
         // console.log(productChoose)
         setDetailChoose(productChoose)
      }
   };

   const handleCheck = () => {
      const regexPhoneNumber = /(0)+([0-9]{9})\b/g;
      const valid = phone.match(regexPhoneNumber);

      if (valid == null) {
         let phoneClass = document.querySelector('#waringPhone')
         // console.log(phoneClass)
         phoneClass?.classList.remove('hidden')
      }
      else {
         let phoneClass = document.querySelector('#waringPhone')
         // console.log(phoneClass)
         phoneClass?.classList.add('hidden')
         axios.get(`https://localhost:44335/api/DichVu/Check?phone=${phone}`)
            .then(res => {
               if (res.data === 'Not found') {
                  setLoading(true)

               }
               else if (res.data === 'Error') {
                  setLoading(true)
               }
               else {
                  setLoading(false)
               }
               setDataCheck(res.data)

               console.log("AAAA", res.data)
            })
      }
   }

   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(Number(e.target.value));
      setAmount(e.target.value)
   };

   const toastShow = (message: string, config: any) => {
      toast(message, config);
   }

   const handleRegister = () => {

      toastShow("In progress", { theme: "dark", type: "info", })
      let ma;
      let loai;
      if (type === 'Service') {
         ma = choose
         loai = "Service"
      }
      else {
         ma = choose
         loai = "Product"
      }
      let formSend = {
         "ma_Phieu_DP": dataCheck?.data1.MA_PHIEU_DP,
         "sdt": dataCheck?.data1.SDT,
         "MA_DV": ma,
         "soLuong": amount,
         "tongTien": total,
         "ma_Nv": sessionStorage.getItem('Ma_NV'),
         "loai": loai
      }
      // console.log(formSend)
      axios.post('https://localhost:44335/api/DichVu/RegisterHS', formSend, {
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(res => {
            toastShow("Registation successfully.", { theme: "dark", type: "success", })

            // console.log(res.data)
         }).catch(e => {
            toastShow("Error.", { theme: "dark", type: "error", })

         })
   }
   const showError = () => {
      if (dataCheck) {
         if (dataCheck === 'Not found') {
            let alertClass = document.querySelector('#alert1')
            // console.log(phoneClass)
            alertClass?.classList.remove('hidden')

         }
         else if (dataCheck === 'Error') {
            let alertClass = document.querySelector('#alert2')
            // console.log(phoneClass)
            alertClass?.classList.remove('hidden')
         }
         else {
            let alertClass = document.querySelector('#alert1')
            // console.log(phoneClass)
            alertClass?.classList.add('hidden')
            setLoading(false)
         }
      }
   }
   useEffect(() => {
      // console.log(dataCheck)
      showError()
   }, [dataCheck])
   useEffect(() => {
      setChoose("");
   }, [type]);
   const getData = () => {
      axios.get('https://localhost:44335/api/DichVu/HotelService')
         .then(res => {
            // console.log("AAAA",res.data)
            // setChoose(res.data[0].MA_DV)
            setHoTelService(res.data)
         })
      axios.get('https://localhost:44335/api/DichVu/Product')
         .then(res => {
            // console.log("B BBB",res.data)
            setProduct(res.data)
         })
   }
   const [role, setRole] = useState<string | null>(null)

   useEffect(() => {
      getData()
      console.log(typeof (sessionStorage.getItem('CHUC_VU')))
      let temp = sessionStorage.getItem('CHUC_VU')
      setRole(temp)
   }, []);


   const RenderInfo = (pros: Props) => {
      return (
         <div>
            <div>
               <DetailChoose dataCheck={dataCheck} detailChoose={detailChoose} AmountValue={amount} setTotal={setTotal} />
            </div>
            <div className="flex justify-evenly   items-center px-2 pb-24 pt-10">
               <button
                  className="mr-5 text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => { handleRegister() }}
               >
                  Đăng ký
               </button>
               <a
                  className="text-black text-xl bg-slate-200  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  href="/service"
               >
                  Hủy
               </a>
            </div>
         </div>
      );
   }

   return (
      <DefaultLayout>
         {
            role === 'LE TAN' ?
               <NoSSR>
                  <div className="flex justify-around justify-items-center">
                     <p className="text-3xl px-6 py-4">Lựa chọn loại hình</p>
                  </div>
                  <div className="flex justify-around justify-items-center">
                     <div className="px-6 py-4" onClick={() => setShowTables(0)}>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <input
                              id="Service"
                              type="radio"
                              name="Type"
                              value="Service"
                              checked={type === "Service"}
                              onChange={(e) => {
                                 onOptionChange(e);
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                           />
                           <label
                              htmlFor="Service"
                              className="w-full text-xl px-6 py-4 text-gray-900 rounded dark:text-gray-300"
                           >
                              Đăng ký dịch vụ
                           </label>
                        </div>
                     </div>
                     <div className="px-6 py-4 flex  gap-4  ">
                        <div>
                           <label
                              htmlFor="Phone"
                              className="w-full text-xl px-6 py-4 text-gray-900 rounded dark:text-gray-300"
                           >
                              Phone
                           </label>
                           <input
                              type="tel"
                              name="Phone"
                              id="Phone"
                              onChange={(e) => {
                                 setPhone(e.target.value)
                              }}
                              className="bg-gray-50 border h-fit mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           />
                           <label
                              htmlFor="Phone"
                              id="waringPhone"
                              className="w-full text-sm px-6 py-4 text-red-600 rounded dark:text-gray-300 hidden"
                           >
                              Please check phone
                           </label>
                        </div>
                     </div>
                     <div
                        className="px-6 py-4"
                        onClick={() => setShowTables(() => 1)}
                     >
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <input
                              id="Product"
                              type="radio"
                              name="Type"
                              value="Product"
                              checked={type === "Product"}
                              onChange={(e) => {
                                 // console.log(e.target.value);
                                 onOptionChange(e);
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                           />
                           <label
                              htmlFor="Product"
                              className="w-full text-xl px-6 py-4 text-gray-900 rounded dark:text-gray-300"
                           >
                              Mua sản phẩm
                           </label>
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-center items-center mb-3">
                     {showTables === 0 ? (
                        <ListService
                           type={type}
                           listHS={HotelService}
                           onChangeProps={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleChangeList(e)
                           }
                           idChoose={choose}
                           onChangeAmount={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleChangeValue(e)
                           }}
                           AmountValue={amount.toString()}
                        />
                     ) : (
                        showTables === 1 && (
                           <ListProduct
                              type={type}
                              listP={Product}
                              onChangeProps={(
                                 e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChangeList(e)}
                              idChoose={choose}
                              onChangeAmount={(e: React.ChangeEvent<HTMLInputElement>) => {
                                 handleChangeValue(e)
                              }}
                              AmountValue={amount.toString()}
                           />
                        )
                     )}
                  </div>
                  <div className="flex justify-center p-4 mt-8">
                     <button
                        className="text-white text-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => {
                           // console.log(phone)
                           handleCheck();
                        }}
                        disabled={choose === ""}
                     >
                        Kiểm tra thông tin và giá
                     </button>
                  </div>
                  <div className="flex justify-center">

                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative hidden" id="alert1">
                        <strong className="font-bold text-xl">Can't find booking information from phone number</strong>
                     </div>
                  </div>
                  <div className="flex justify-center">

                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative hidden" id="alert2">
                        <strong className="font-bold text-xl">Error while loading, please refesh page</strong>
                     </div>
                  </div>
                  {!loading && (
                     <RenderInfo />
                  )}
               </NoSSR> : <div>You don't have premisson</div>
         }
      </DefaultLayout>
   );
};
export default Hotel;
