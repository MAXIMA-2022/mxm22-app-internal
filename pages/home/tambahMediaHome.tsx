import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Avatar, FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell } from "@material-ui/core";
import { VStack } from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

const tambahMedia = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [divisi, setDivisi] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const formData = new FormData()
        formData.append("akun_organisator", data.akun_organisator)
        formData.append("link_media", data.link_media)
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
              Tambah Media HoME
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <Box mb={"0.8em"}>
                  <FormLabel textColor={"black"}>Akun Organisator</FormLabel>
                  <Select {...register("akun_organisator", { required: "Akun organisator harap dipilih" })} name="akun_organisator" textColor={"black"} border={"solid"} borderColor={'#CBD5E0'} _hover={{border: 'solid #CBD5E0'}}>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  {errors.akun_organisator !== undefined && <Text textColor={"red"}>{errors.akun_organisator.message}</Text>}
                </Box>
                <Box>
                  <FormLabel textColor={"black"}>Link Media</FormLabel>
                  <Input {...register("link_media", { required: "Link media harap diisi" })} name="link_media" textColor={"black"} border={"solid"} borderColor={'#CBD5E0'} _hover={{border: 'solid #CBD5E0'}}/>
                  {errors.link_media !== undefined && <Text textColor={"red"}>{errors.link_media.message}</Text>}
                </Box>
              </FormControl>
              <Flex w={"100%"} justifyContent={"right"} py={3}>
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

export default tambahMedia;
