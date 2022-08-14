import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, FormControl, FormLabel, Button, Select, Center } from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataHoME {
    homeID: number;
    name: string;
}

const Previews = (props: any) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 3,
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
                    Seret dan taruh 1 hingga 3 file di sini, atau klik untuk memilih file
                </Text>
            </Center>
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                {thumbs}
            </Box>
        </>
    );
};

const tambahMedia = () => {
    const jwt = useReadLocalStorage<string | undefined>("token");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [files, setFiles] = useState([]);
    const [dataHoME, setDataHoME] = useState<DataHoME[]>([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        try {
            const fetchHoME = async () => {
                const res = await axios.get(`${process.env.API_URL}/api/homeInfo`);
                setDataHoME(res.data);
            };
            fetchHoME();
        } catch (err: any) {
            console.log(err);
        }
    }),
        [];

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            setIsButtonLoading(true);

            const formData = new FormData();
            formData.append("homeID", data.homeID);
            files.map((file: any) => {
                formData.append("linkMedia", file);
            });

            const res = await axios.post(
                `${process.env.API_URL}/api/home/createHomeMedia`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            toast.success(res.data.message);

            setIsButtonLoading(false);
        } catch (err: any) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
            toast.error(err.response.data.message);
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
                                    <FormLabel textColor={"black"}>Nama HoME</FormLabel>
                                    <Select
                                        {...register("homeID", {
                                            required: "HoME harap dipilih",
                                        })}
                                        placeholder={"Pilih HoME"}
                                        name="homeID"
                                        textColor={"black"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    >
                                        {dataHoME.map((HoME: DataHoME) => (
                                            <option value={HoME.homeID}>{HoME.name}</option>
                                        ))}
                                    </Select>
                                    {errors.homeID !== undefined && (
                                        <Text textColor={"red"}>{errors.homeID.message}</Text>
                                    )}
                                </Box>
                                <Box>
                                    <FormLabel textColor={"black"}>Photo HoME</FormLabel>
                                    <Box
                                        padding={"1em"}
                                        border={"solid #CBD5E0"}
                                        width={"100%"}
                                        height={"100%"}
                                        borderRadius={10}
                                        transition={"0.1s ease-in-out"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    >
                                        <Previews name="linkMedia" setFiles={setFiles} />
                                    </Box>
                                    {errors.linkMedia !== undefined && (
                                        <Text textColor={"red"}>{errors.linkMedia.message}</Text>
                                    )}
                                </Box>
                            </FormControl>
                            <Flex w={"100%"} justifyContent={"right"} py={3}>
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
                            </Flex>
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
                draggable={false}
                pauseOnHover
            />
        </>
    );
};

export default tambahMedia;
