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
    Textarea,
    Center,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReadLocalStorage } from "usehooks-ts";

interface DataHoME {
    name: string;
    chapter: string;
    longDesc: string;
    linkYoutube: string;
    linkLine: string;
    linkInstagram: string;
    linkFacebook: string;
    linkTwitter: string;
    linkTiktok: string;
    linkLinkedIn: string;
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

const tambahHomeInfo = () => {
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [files, setFiles] = useState([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [chapter, setChapter] = useState<string[]>([]);

    useEffect(() => {
        try {
            const fetchChap = async () => {
                const chap = await axios.get(`${process.env.API_URL}/api/chapter`, {
                    headers: {
                        "x-access-token": jwt!,
                    },
                });
                setChapter(chap.data);
            };
            fetchChap();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const onSubmit: SubmitHandler<any> = async (data: DataHoME) => {
        try {
            setIsButtonLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("chapter", data.chapter);
            formData.append("longDesc", data.longDesc);
            formData.append("linkInstagram", data.linkInstagram);
            formData.append("linkLine", data.linkLine);
            formData.append("linkYoutube", data.linkYoutube);
            formData.append("linkFacebook", data.linkFacebook);
            formData.append("linkTwitter", data.linkTwitter);
            formData.append("linkTiktok", data.linkTiktok);
            formData.append("linkLinkedIn", data.linkLinkedIn);
            formData.append("linkLogo", files[0]);

            console.log(data);

            const response = await axios.post(
                `${process.env.API_URL}/api/home/createHomeInfo`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            toast.success(response.data.message);

            setIsButtonLoading(false);
        } catch (err: any) {
            setError(err.response.data.message);
            toast.error(err.response.data.message);
            setIsButtonLoading(false);
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
                            Tambah HoME Information
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
                                    <FormLabel textColor={"black"}>Nama HoME</FormLabel>
                                    <Input
                                        {...register("name", { required: "Nama HoME harap diisi" })}
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
                                    <FormLabel textColor={"black"}>Chapter</FormLabel>
                                    <Select
                                        {...register("chapter", {
                                            required: "chapter harap dipilih",
                                        })}
                                        name="chapter"
                                        placeholder="Pilih Chapter"
                                        textColor={"black"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    >
                                        {chapter.map((chap: any) => (
                                            <option value={chap.homeChapterID}>{chap.name}</option>
                                        ))}
                                    </Select>
                                    {errors.chapter !== undefined && (
                                        <Text textColor={"red"}>{errors.chapter.message}</Text>
                                    )}
                                </Box>
                            </Flex>
                            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                                <FormLabel textColor={"black"} htmlFor="no_hp">
                                    Narasi Panjang
                                </FormLabel>
                                <Textarea
                                    {...register("longDesc", {
                                        required: "Narasi panjang harap diisi",
                                    })}
                                    name="longDesc"
                                    textColor={"black"}
                                    border={"solid"}
                                    borderColor={"#CBD5E0"}
                                    _hover={{ border: "solid #CBD5E0" }}
                                />
                                {errors.longDesc !== undefined && (
                                    <Text textColor={"red"}>{errors.longDesc.message}</Text>
                                )}
                            </Box>
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
                                    <Previews name="linkLogo" setFiles={setFiles} />
                                </Box>
                                {errors.linkLogo !== undefined && (
                                    <Text textColor={"red"}>{errors.linkLogo.message}</Text>
                                )}
                            </Box>
                            <Box width={"100%"} px={2} mt={[2, 2, 0, 0]} mb={"0.8em"}>
                                <FormLabel textColor={"black"}>Link Video YouTube</FormLabel>
                                <Input
                                    {...register("linkYoutube")}
                                    name="linkYoutube"
                                    textColor={"black"}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    border={"solid"}
                                    borderColor={"#CBD5E0"}
                                    _hover={{ border: "solid #CBD5E0" }}
                                />
                            </Box>
                            <Flex
                                justifyContent={"space-between"}
                                mt={2}
                                mb={"0.8em"}
                                flexDirection={["column", "column", "row", "row"]}
                            >
                                <Box width={"100%"} px={2}>
                                    <FormLabel textColor={"black"}>Media Sosial (LINE)</FormLabel>
                                    <Input
                                        {...register("linkLine")}
                                        name="linkLine"
                                        textColor={"black"}
                                        placeholder={"https://line.me/ti/p/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                                    <FormLabel textColor={"black"}>
                                        Media Sosial (Instagram)
                                    </FormLabel>
                                    <Input
                                        {...register("linkInstagram")}
                                        name="linkInstagram"
                                        textColor={"black"}
                                        placeholder={"https://www.instagram.com/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                mt={2}
                                mb={"0.8em"}
                                flexDirection={["column", "column", "row", "row"]}
                            >
                                <Box width={"100%"} px={2}>
                                    <FormLabel textColor={"black"}>
                                        Media Sosial (Facebook)
                                    </FormLabel>
                                    <Input
                                        {...register("linkFacebook")}
                                        name="linkFacebook"
                                        textColor={"black"}
                                        placeholder={"https://www.facebook.com/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                                    <FormLabel textColor={"black"}>
                                        Media Sosial (Twitter)
                                    </FormLabel>
                                    <Input
                                        {...register("linkTwitter")}
                                        name="linkTwitter"
                                        textColor={"black"}
                                        placeholder={"https://www.twitter.com/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                            </Flex>
                            <Flex
                                justifyContent={"space-between"}
                                mt={2}
                                mb={"0.8em"}
                                flexDirection={["column", "column", "row", "row"]}
                            >
                                <Box width={"100%"} px={2}>
                                    <FormLabel textColor={"black"}>Media Sosial (Tiktok)</FormLabel>
                                    <Input
                                        {...register("linkTiktok")}
                                        name="linkTiktok"
                                        textColor={"black"}
                                        placeholder={"https://www.tiktok.com/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                                    <FormLabel textColor={"black"}>
                                        Media Sosial (LinkedIn)
                                    </FormLabel>
                                    <Input
                                        {...register("linkLinkedIn")}
                                        name="linkLinkedIn"
                                        textColor={"black"}
                                        placeholder={"https://www.linkedin.com/"}
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </Box>
                            </Flex>
                            <Flex
                                width={"100%"}
                                px={2}
                                mt={2}
                                mb={"0.8em"}
                                justifyContent={"right"}
                            >
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

export default tambahHomeInfo;
