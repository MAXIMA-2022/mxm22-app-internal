import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
    Box,
    Flex,
    Text,
    FormLabel,
    Input,
    Button,
    Select,
    Center,
    HStack,
    Link,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useReadLocalStorage } from "usehooks-ts";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (files.length !== 0) {
        props.setFiles(files);
    }
    const thumbs = files.map((file: any) => (
        <Box
            display={"inline-flex"}
            borderRadius={4}
            border={"2px solid #eaeaea"}
            mt={"16px"}
            mx={1}
            w={"auto"}
            h={"auto"}
            p={1}
            boxSizing={"border-box"}
            key={file.name}
        >
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
            <Center
                p={"0.8em"}
                border={"dashed #e2e8f0"}
                width={"100%"}
                height={"5em"}
                borderRadius={10}
                {...getRootProps({ className: "dropzone" })}
                transition={"0.1s ease-in-out"}
                _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}
            >
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
    const [filesstateLogo, setFilesstateLogo] = useState([]);
    const [filesSampul, setFilesSampul] = useState([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [date, setDate] = useState([]);
    const jwt = useReadLocalStorage<string | undefined>("token");
    const headers = {
        "x-access-token": jwt!,
    };

    useEffect(() => {
        const fetchstate = async () => {
            try {
                const res = await axios.get(`${process.env.API_URL}/api/dayManagement`, {
                    headers,
                });
                console.log(res.data);
                setDate(res.data);
            } catch (err: any) {
                console.log(err);
            }
        };
        fetchstate();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setIsButtonLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("quota", data.quota);
            formData.append("day", data.day);
            formData.append("stateLogo", filesstateLogo[0]);
            const response = await axios.post(
                `${process.env.API_URL}/api/stateAct/createState`,
                formData,
                { headers }
            );
            toast.success(response.data.message);
            setIsButtonLoading(false);
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
            setError(err.response.data.message);
            setIsButtonLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <Flex
                minH="100vh"
                bg={"#dee1e6"}
                ml={{ base: 0, lg: "240px" }}
                px={5}
                pt={"75px"}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
                    <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        mx={4}
                        borderBottom={"solid black"}
                    >
                        <Text
                            fontSize={["15px", "25px", "25px", "25px"]}
                            fontFamily="rubik"
                            fontWeight={600}
                            textColor={"black"}
                        >
                            Tambah STATE
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Flex
                                justifyContent={"space-between"}
                                mt={2}
                                mb={"0.8em"}
                                flexDirection={["column", "column", "row", "row"]}
                            >
                                <Box width={"100%"} px={2}>
                                    <FormLabel textColor={"black"}>Nama STATE</FormLabel>
                                    <Input
                                        {...register("name", {
                                            required: "Nama STATE harap diisi",
                                        })}
                                        type={"text"}
                                        name="name"
                                        textColor={"black"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                    {errors.name !== undefined && (
                                        <Text textColor={"red"}>{errors.name.message}</Text>
                                    )}
                                </Box>
                                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                                    <FormLabel textColor={"black"}>Kuota</FormLabel>
                                    <Input
                                        {...register("quota", {
                                            required: "Kuota harap diisi",
                                            min: { value: 1, message: "Kuota tidak boleh ≤ 0" },
                                            max: {
                                                value: 200,
                                                message: "Kuota tidak boleh lebih dari 100",
                                            },
                                        })}
                                        type={"number"}
                                        name="quota"
                                        textColor={"black"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                    {errors.quota !== undefined && (
                                        <Text textColor={"red"}>{errors.quota.message}</Text>
                                    )}
                                </Box>
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                mt={2}
                                mb={"0.8em"}
                                flexDirection={["column", "column", "row", "row"]}
                            >
                                <Box width={"100%"} px={2}>
                                    <FormLabel textColor={"black"}>Hari Kegiatan</FormLabel>
                                    <Select
                                        {...register("day", {
                                            required: "Hari kegiatan harap dipilih",
                                        })}
                                        placeholder="Pilih Hari Pelaksanaan STATE"
                                        name="day"
                                        textColor={"black"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    >
                                        {date.map((item: any, index: number) => {
                                            return (
                                                <option key={index} value={item.day}>
                                                    {item.date}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                    {errors.day !== undefined && (
                                        <Text textColor={"red"}>{errors.day.message}</Text>
                                    )}
                                </Box>
                            </Flex>
                            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"1em"}>
                                <FormLabel textColor={"black"}>Logo</FormLabel>
                                <Box
                                    padding={"1em"}
                                    border={"solid #CBD5E0"}
                                    width={"100%"}
                                    height={"100%"}
                                    borderRadius={10}
                                    transition={"0.1s ease-in-out"}
                                    _hover={{ border: "solid #CBD5E0" }}
                                >
                                    <Previews name="stateLogo" setFiles={setFilesstateLogo} />
                                </Box>
                                {errors.stateLogo !== undefined && (
                                    <Text textColor={"red"}>{errors.stateLogo.message}</Text>
                                )}
                            </Box>
                            <HStack
                                width={"100%"}
                                px={2}
                                mt={2}
                                mb={"0.8em"}
                                justifyContent={"right"}
                            >
                                <Link href={"/state/daftarState"}>
                                    <Button
                                        w={100}
                                        borderRadius={"999px"}
                                        textColor="white"
                                        colorScheme={"facebook"}
                                    >
                                        BACK
                                    </Button>
                                </Link>
                                {isButtonLoading === true ? (
                                    <Button
                                        isLoading
                                        w={100}
                                        borderRadius={"999px"}
                                        type="submit"
                                        textColor="black"
                                        bgColor={"green.200"}
                                        _hover={{ bgColor: "yellow.200" }}
                                    >
                                        SUBMIT
                                    </Button>
                                ) : (
                                    <Button
                                        w={100}
                                        borderRadius={"999px"}
                                        type="submit"
                                        textColor="black"
                                        bgColor={"green.200"}
                                        _hover={{ bgColor: "yellow.200" }}
                                    >
                                        SUBMIT
                                    </Button>
                                )}
                            </HStack>
                        </form>
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
    );
};

export default tambahState;
