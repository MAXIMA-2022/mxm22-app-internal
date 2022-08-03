import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
<<<<<<< Updated upstream:pages/state/editState/[stateID].tsx
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
=======
import { Box, Flex, Text, Center, FormLabel, Input, Select, Textarea, Button } from "@chakra-ui/react";
>>>>>>> Stashed changes:pages/state/daftarState/editState/[stateID].tsx
import MxmIconSVG from "../../../public/mxmIcon.svg";
import Image from "next/image";
import { useEffect, useState } from 'react'
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StateInfo{
  name: string,
  quota: number,
  day: string,
  category: string,
  stateLogo: string,
  coverPhoto: string,
  shortDesc: string,
}

const Previews = (props: any) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  if(files.length !== 0){
    props.setFiles(files)
  }
  const thumbs = files.map((file: any) => (
    <Box display={"inline-flex"} borderRadius={4} border={"2px solid #eaeaea"} mt={"16px"} mx={1} w={"auto"} h={"auto"} p={1} boxSizing={"border-box"} key={file.name}>
      <Box display={"flex"} w={"auto"} h={"100%"}>
        <img
          src={file.preview}
          style={{ display: "block", width: "auto", height: "100%" }}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <Center p={"0.8em"} border={"dashed #e2e8f0"} width={"100%"} height={"5em"} borderRadius={10} {...getRootProps({ className: "dropzone" })} transition={"0.1s ease-in-out"} _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Text color={"#A6A8AC"} userSelect={"none"} align={"center"}>
          Seret dan taruh file di sini, atau klik untuk memilih file
        </Text>
      </Center>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {thumbs}
      </Box>
    </>
  );
};

const editState = ({ID}: {ID: number}) => {
  console.log(ID)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filesstateLogo, setFilesstateLogo] = useState([])
  const [filesSampul, setFilesSampul] = useState([])
  const [error, setError] = useState(undefined);
  const jwt = useReadLocalStorage<string | undefined>("token");
  const [state, setstate] = useState<string[] | number[]>([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  useEffect(() => {
    try {
      const fetchstate = async () => {
        const response = await axios.get(`${process.env.API_URL}/api/stateAct/${ID}`,{
          headers:{
            "x-access-token": jwt!
          }
        })
        setstate(response.data)
      }
      fetchstate()
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
        formData.append("stateLogo", filesstateLogo[0])
        formData.append("coverPhoto", filesSampul[0])
      const response = await axios.put(
        `${process.env.API_URL}/api/stateAct/update/${ID}`, 
        formData, {
          headers: {
            'x-access-token': jwt!
          }
        }
      )
      toast.success(response.data.message);
      setIsButtonLoading(false);
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
                <FormLabel textColor={"black"} placeholder="Pilih Hari Pelaksanaan STATE">
                  Hari Kegiatan
                </FormLabel>
                <Select {...register("day", { required: "Hari kegiatan harap dipilih" })} name="day" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }}>
                  {state.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.day}>{item.day}</option>
                    )
                  })}
                </Select>
                {errors.day !== undefined && <Text textColor={"red"}>{errors.day.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={"black"} placeholder="Pilih category STATE">
                  Kategori
                </FormLabel>
                <Select {...register("category", { required: "category harap dipilih" })} name="category" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }}>
                {state.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.category}>{item.category}</option>
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
              <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                <Previews name="stateLogo" setFiles={setFilesstateLogo}/>
              </Box>
              {errors.stateLogo !== undefined && <Text textColor={"red"}>{errors.stateLogo.message}</Text>}
            </Box>
            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
              <FormLabel textColor={"black"}>Foto Sampul</FormLabel>
              <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                <Previews name="coverPhoto" setFiles={setFilesSampul}/>
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

  // return (
  //   <>
  //     <Navbar />
  //     <Sidebar />
  //     <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
  //       <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
  //         <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
  //           <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
  //             Detail STATE
  //           </Text>
  //           <Flex p={"10px"}>
  //             <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
  //           </Flex>
  //         </Flex>
  //         <Box display={["block", "flex"]} justifyContent={"space-between"} mx={4} minHeight={"15em"}>
  //     <Center width={["100%", "60%"]} py={["1em", "0"]}>
  //       <Image src={UltimagzPNG} />
  //     </Center>
  //     <Box width={"100%"} py={["0", "2em"]}>
  //         <Box ps={["0", "1.5em"]}>
  //           {/* <Heading pb={"0.5em"} fontSize={["2xl", "4xl"]} fontFamily="rubik" fontWeight={"extrabold"}>
  //             {state[0].name}
  //           </Heading>
  //           <VStack spacing={[2, 5]} align="stretch">
  //             <HStack spacing={5}>
  //               <Image src={JadwalSVG} />
  //               <Text fontFamily="rubik">
  //                 Hari ke-{state[0].day} ({state[0].day})
  //               </Text>
  //             </HStack>
  //             <HStack spacing={5}>
  //               <Image src={ParticipantSVG} />
  //               <Text fontFamily="rubik">{state[0].registered}</Text>
  //             </HStack>
  //             <HStack spacing={5}>
  //                 <Image src={KeySVG} />
  //                 <Text fontFamily="rubik">{state[0].shortDesc}</Text>
  //             </HStack>
  //           </VStack> */}
  //         </Box>
  //     </Box>
  //   </Box>
  //         <Box py={4} mx={4}>
  //           {/* <MUIDataTable
  //             title=""
  //             columns={columneditState}
  //             data={state}
  //             options={{
  //               rowsPerPage: 5,
  //               selectableRows: "none",
  //               elevation: 0,
  //             }}
  //           /> */}
  //         </Box>
  //       </Box>
  //     </Flex>
  //   </>
  // );
};

editState.getInitialProps = async ({query}: any) => {
<<<<<<< Updated upstream:pages/state/editState/[stateID].tsx
  const {ID} = query
  return{
=======
  const { ID } = query;
  return {
>>>>>>> Stashed changes:pages/state/daftarState/editState/[stateID].tsx
    ID
  }
}

export default editState;
