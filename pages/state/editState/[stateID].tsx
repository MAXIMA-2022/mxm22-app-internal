import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { 
  Box, 
  Flex, 
  Text, 
  Center, 
  FormLabel, 
  Input, 
  Select, 
  Textarea, 
  Button 
} from "@chakra-ui/react";
import MxmIconSVG from "../../../public/mxmIcon.svg";
import Image from "next/image";
import { useEffect, useState } from 'react'
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

interface StateInfo{
  name: string,
  quota: number,
  day: string,
  category: string,
  stateLogo: string,
  coverPhoto: string,
  shortDesc: string,
}

const editState = ({stateID}: {stateID: number}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(undefined);
  const router = useRouter()
  const jwt = useReadLocalStorage<string | undefined>("token");
  const [state, setstate] = useState<string[] | number[]>([]);
  const [dataState, setDataState] = useState<StateInfo[]>([])
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const headers = {
    'x-access-token': jwt!
  }
  useEffect(() => {
    try {
      const fetchstate = async () => {
        const response = await axios.get(`${process.env.API_URL}/api/stateAct/${stateID}`,{headers})
        setstate(response.data)
      }
      const ambildata = async () => {
        const res = await axios.get(`${process.env.API_URL}/api/stateAct/`,{headers})
        setDataState(res.data)
      }
      fetchstate()
      ambildata()
    } catch(err: any) {
      console.log(err)
    }
  },[])

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      setIsButtonLoading(true);
      const formData = new FormData()
        formData.append("name", data.name)
        formData.append("quota", data.quota)
        formData.append("day", data.day)
        formData.append("category", data.category)
        formData.append("shortDesc", data.shortDesc)
        formData.append("stateLogo", data.stateLogo[0])
        formData.append("coverPhoto", data.coverPhoto[0])
      const response = await axios.put(
        `${process.env.API_URL}/api/stateAct/update/${stateID}`, 
        formData, {headers}
      )
      toast.success(response.data.message);
      setIsButtonLoading(false);
      router.reload()
    } catch (err: any) {
      toast.error(err.response.data.message)
      console.log(err.response.data.message);
      setError(err.response.data.message);
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Edit STATE
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
          {state.map((data: any, index)=>(
            <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
              <Box width={"100%"} px={2}>
                <FormLabel textColor={"black"}>Nama STATE</FormLabel>
                <Input {...register("name", { required: "Nama STATE harap diisi" })} type={"text"} name="name" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} defaultValue={data.name}/>
                {errors.name !== undefined && <Text textColor={"red"}>{errors.name.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={"black"}>Kuota</FormLabel>
                <Input
                  {...register("quota", { required: "quota harap diisi", min: { value: 1, message: "quota tidak boleh ≤ 0" },
                  //max: { value: 100, message: "quota tidak boleh lebih dari 100" } 
                  })}
                  type={"number"}
                  name="quota"
                  textColor={"black"}
                  border={"solid"}
                  borderColor={"#CBD5E0"}
                  _hover={{ border: "solid #CBD5E0" }}
                  defaultValue={data.quota}
                />
                {errors.quota !== undefined && <Text textColor={"red"}>{errors.quota.message}</Text>}
              </Box>
            </Flex>
            <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
              <Box width={"100%"} px={2}>
                <FormLabel textColor={"black"}>
                  Hari Kegiatan
                </FormLabel>
                <Select {...register("day", { required: "Hari kegiatan harap dipilih" })} placeholder="Pilih Hari Pelaksanaan STATE" name="day" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} defaultValue={data.day}>
                  {dataState.map((hari: any) => {
                    return (
                      <option defaultValue={data.day} value={hari.day}>{hari.day}</option>
                    )
                  })}
                </Select>
                {errors.day !== undefined && <Text textColor={"red"}>{errors.day.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={"black"}>
                  Kategori
                </FormLabel>
                <Select {...register("category", { required: "category harap dipilih" })} placeholder="Pilih Kategori STATE" name="category" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} defaultValue={data.category}>
                {dataState.map((cat: any) => {
                    return (
                      <option value={cat.category}>{cat.category}</option>
                    )
                })}
                </Select>
                {errors.category !== undefined && <Text textColor={"red"}>{errors.category.message}</Text>}
              </Box>
            </Flex>
            <Box width={"100%"} px={2} mb={"0.8em"}>
              <FormLabel textColor={"black"}>Deskripsi Singkat</FormLabel>
              <Textarea {...register("shortDesc", { required: "Deskripsi singkat harap diisi" })} name="shortDesc" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} defaultValue={data.shortDesc}/>
              {errors.shortDesc !== undefined && <Text textColor={"red"}>{errors.shortDesc.message}</Text>}
            </Box>
            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"1em"}>
              <FormLabel textColor={"black"}>Logo</FormLabel>
              <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>\
                <Input {...register('stateLogo')} type={'file'} pt={1} name='stateLogo' _placeholder={{color: 'darkgray'}} bgColor={'gray.200'} textColor={'black'}/>
              </Box>
              {errors.stateLogo !== undefined && <Text textColor={"red"}>{errors.stateLogo.message}</Text>}
            </Box>
            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
              <FormLabel textColor={"black"}>Foto Sampul</FormLabel>
              <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                <Input {...register('coverPhoto')} type={'file'} pt={1} name='coverPhoto' _placeholder={{color: 'darkgray'}} bgColor={'gray.200'} textColor={'black'}/>
              </Box>
              {errors.coverPhoto !== undefined && <Text textColor={"red"}>{errors.coverPhoto.message}</Text>}
            </Box>
            <Flex width={"100%"} px={2} mt={2} justifyContent={"right"}>
              {isButtonLoading === true ? (
                <Button isLoading w={100} borderRadius={"999px"} type="submit" textColor="black" bgColor={"green.200"} _hover={{ bgColor: "yellow.200" }}>
                  SUBMIT
                </Button>
              ) : (
                <Button w={100} borderRadius={"999px"} type="submit" textColor="black" bgColor={"green.200"} _hover={{ bgColor: "yellow.200" }}>
                  SUBMIT
                </Button>
              )}
            </Flex>
          </form>
          ))}
          </Box>
        </Box>
      </Flex>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
};

editState.getInitialProps = async ({query}: any) => {
  const { stateID } = query;
    return {
      stateID
    }
}

export default editState;
