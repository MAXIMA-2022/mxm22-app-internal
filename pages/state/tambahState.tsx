import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Avatar, FormControl, FormLabel, Input, Button, Select, Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, UnorderedList, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";

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

const tambahState = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filesLogo, setFilesLogo] = useState([])
  const [filesSampul, setFilesSampul] = useState([])
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(filesLogo[0])
    console.log(filesSampul[0])
    try {
      const formData = new FormData()
        formData.append("nama_state", data.nama_state)
        formData.append("kuota", data.kuota)
        formData.append("hari_state", data.hari_state)
        formData.append("kategori", data.kategori)
        formData.append("deskripsi_singkat", data.deskripsi_singkat)
        formData.append("logo", filesLogo[0])
        formData.append("foto_sampul", filesSampul[0])
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
              Tambah STATE
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
                <Box width={"100%"} px={2}>
                  <FormLabel textColor={"black"}>Nama STATE</FormLabel>
                  <Input {...register("nama_state", { required: "Nama STATE harap diisi" })} type={"text"} name="nama_state" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} />
                  {errors.nama_state !== undefined && <Text textColor={"red"}>{errors.nama_state.message}</Text>}
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel textColor={"black"}>Kuota</FormLabel>
                  <Input
                    {...register("kuota", { required: "Kuota harap diisi", min: { value: 1, message: "Kuota tidak boleh ≤ 0" }, max: { value: 100, message: "Kuota tidak boleh lebih dari 100" } })}
                    type={"number"}
                    name="kuota"
                    textColor={"black"}
                    border={"solid"}
                    borderColor={"#CBD5E0"}
                    _hover={{ border: "solid #CBD5E0" }}
                  />
                  {errors.kuota !== undefined && <Text textColor={"red"}>{errors.kuota.message}</Text>}
                </Box>
              </Flex>
              <Flex justifyContent={"space-between"} mt={2} mb={"0.8em"} flexDirection={["column", "column", "row", "row"]}>
                <Box width={"100%"} px={2}>
                  <FormLabel textColor={"black"} placeholder="Pilih Hari Pelaksanaan STATE">
                    Hari Kegiatan
                  </FormLabel>
                  <Select {...register("hari_state", { required: "Hari kegiatan harap dipilih" })} name="hari_state" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} />
                  {errors.hari_state !== undefined && <Text textColor={"red"}>{errors.hari_state.message}</Text>}
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel textColor={"black"} placeholder="Pilih Kategori STATE">
                    Kategori
                  </FormLabel>
                  <Select {...register("kategori", { required: "Kategori harap dipilih" })} name="kategori" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} />
                  {errors.kategori !== undefined && <Text textColor={"red"}>{errors.kategori.message}</Text>}
                </Box>
              </Flex>
              <Box width={"100%"} px={2} mb={"0.8em"}>
                <FormLabel textColor={"black"}>Deskripsi Singkat</FormLabel>
                <Textarea {...register("deskripsi_singkat", { required: "Deskripsi singkat harap diisi" })} name="deskripsi_singkat" textColor={"black"} border={"solid"} borderColor={"#CBD5E0"} _hover={{ border: "solid #CBD5E0" }} />
                {errors.deskripsi_singkat !== undefined && <Text textColor={"red"}>{errors.deskripsi_singkat.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"1em"}>
                <FormLabel textColor={"black"}>Logo</FormLabel>
                <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                  <Previews name="logo" setFiles={setFilesLogo}/>
                </Box>
                {errors.logo !== undefined && <Text textColor={"red"}>{errors.logo.message}</Text>}
              </Box>
              <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                <FormLabel textColor={"black"}>Foto Sampul</FormLabel>
                <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                  <Previews name="foto_sampul" setFiles={setFilesSampul}/>
                </Box>
                {errors.foto_sampul !== undefined && <Text textColor={"red"}>{errors.foto_sampul.message}</Text>}
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
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default tambahState;
