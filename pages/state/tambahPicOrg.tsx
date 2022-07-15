import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Avatar, FormControl, FormLabel, FormErrorMessage, Button, Select } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell } from "@material-ui/core";
import { VStack } from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const tambahPIC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <Navbar />
      <Sidebar />
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Tambah PIC
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <Box mb={"0.8em"}>
                  <FormLabel>Akun Organisator</FormLabel>
                  <Select mb={"0.8em"} {...register("akun_organisator", { required: "Akun organisator harap dipilih" })} name="akun_organisator" textColor={"black"} border={"solid"} />
                  {errors.akun_organisator !== undefined && <Text textColor={"red"}>{errors.akun_organisator.message}</Text>}
                </Box>
                <Box>
                  <FormLabel>Kegiatan STATE</FormLabel>
                  <Select {...register("kegiatan_state", { required: "Kegiatan STATE harap dipilih" })} name="kegiatan_state" textColor={"black"} border={"solid"} />
                  {errors.kegiatan_state !== undefined && <Text textColor={"red"}>{errors.kegiatan_state.message}</Text>}
                </Box>
              </FormControl>
              <Flex w={"100%"} justifyContent={"right"} py={3}>
                {isButtonLoading === true ? (
                  <Button isLoading borderRadius={"999px"} type="submit" fontFamily={"rubik"}>
                    SUBMIT
                  </Button>
                ) : (
                  <Button borderRadius={"999px"} type="submit" fontFamily={"rubik"}>
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

export default tambahPIC;
