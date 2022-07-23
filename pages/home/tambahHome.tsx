import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Avatar, Img, FormControl, FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import Dropzone from "react-dropzone";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

const tambahHome = () => {
  const [divisi, setDivisi] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      setIsButtonLoading(true);
      setTimeout(async () => {
        setIsButtonLoading(false);
      }, 3000);
    } catch (err: any) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      setTimeout(async () => {
        setIsButtonLoading(false);
      }, 3000);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Navbar />
      <Sidebar />
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Tambah HoME
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
                <Box width={"100%"} px={2}>
                  <FormLabel textColor={"black"}>Nama Organisator</FormLabel>
                  <Input {...register("nama_organisator", { required: "Nama organisator harap diisi" })} type={"text"} name="nama_organisator" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                  {errors.nama_organisator !== undefined && <Text textColor={"red"}>{errors.nama_organisator.message}</Text>}
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel textColor={"black"}>Kategori</FormLabel>
                  <Select {...register("kategori", { required: "Kategori harap dipilih" })} name="kategori" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                  {errors.kategori !== undefined && <Text textColor={"red"}>{errors.kategori.message}</Text>}
                </Box>
              </Flex>
              <Box width={"100%"} px={2} mb={"0.8em"}>
                <FormLabel textColor={"black"}>Narasi Pendek</FormLabel>
                <Input {...register("narasi_pendek", { required: "Narasi pendek harap diisi" })} name="narasi_pendek" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                {errors.narasi_pendek !== undefined && <Text textColor={"red"}>{errors.narasi_pendek.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                <FormLabel textColor={"black"} htmlFor="no_hp">
                  Narasi Panjang
                </FormLabel>
                <Textarea {...register("narasi_panjang", { required: "Narasi panjang harap diisi" })} name="narasi_panjang" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                {errors.narasi_panjang !== undefined && <Text textColor={"red"}>{errors.narasi_panjang.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                <FormLabel textColor={"black"}>Link Logo</FormLabel>
                <Input {...register("link_logo", { required: "Link logo harap diisi" })} name="link_logo" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                {errors.link_logo !== undefined && <Text textColor={"red"}>{errors.link_logo.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                <FormLabel textColor={"black"}>Link Video YouTube</FormLabel>
                <Input {...register("link_yt", { required: "Link video YouTube harap diisi" })} name="link_yt" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                {errors.link_yt !== undefined && <Text textColor={"red"}>{errors.link_yt.message}</Text>}
              </Box>
              <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
                <Box width={"100%"} px={2}>
                  <FormLabel textColor={"black"}>Media Sosial (LINE)</FormLabel>
                  <Input {...register("line", { required: "Media sosial (LINE) harap diisi" })} name="line" textColor={"black"} border={"solid"} borderColor={'gray.700'}/>
                  {errors.line !== undefined && <Text textColor={"red"}>{errors.line.message}</Text>}
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel textColor={"black"}>Media Sosial (Instagram)</FormLabel>
                  <Input {...register("instagram", { required: "Media sosial (Instagram) harap diisi" })} name="instagram" textColor={"black"} placeholder="Tidak Perlu Menggunakan @" border={"solid"} borderColor={'gray.700'}/>
                  {errors.instagram !== undefined && <Text textColor={"red"}>{errors.instagram.message}</Text>}
                </Box>
              </Flex>
              <Flex width={"100%"} px={2} mt={2} mb={"0.8em"} justifyContent={"right"}>
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
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default tambahHome;
