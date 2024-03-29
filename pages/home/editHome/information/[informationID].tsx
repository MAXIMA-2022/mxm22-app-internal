import Sidebar from "../../../../components/Sidebar";
import Navbar from "../../../../components/Navbar";
import {
    Box,
    Flex,
    Text,
    FormLabel,
    Input,
    Button,
    Select,
    Textarea,
    Img,
    HStack,
} from "@chakra-ui/react";
import MxmIconSVG from "../../../../public/mxmIcon.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserContext } from "../../../../useContext/UserContext";

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
    linkLogo: string;
}

const editHomeInfo = ({ informationID }: { informationID: number }) => {
    const router = useRouter();
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [dataHoME, setDataHoME] = useState<DataHoME[]>([]);
    const [chapter, setChapter] = useState<string[]>([]);
    const [chapterID, setChapterID] = useState<string>("0");
    const {divisiCode} = useUserContext();

    useEffect(() => {
        try {
            const fetchHoME = async () => {
                const res = await axios.get(
                    `${process.env.API_URL}/api/homeInfo/homeID/${informationID}`,
                    {
                        headers: {
                            "x-access-token": jwt!,
                        },
                    }
                );

                const chap = await axios.get(`${process.env.API_URL}/api/chapter`, {
                    headers: {
                        "x-access-token": jwt!,
                    },
                });
                setDataHoME(res.data);
                setChapter(chap.data);

                setChapterID(res.data[0].chapter);
            };
            fetchHoME();
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
            formData.append("linkLogo", data.linkLogo[0]);

            const response = await axios.put(
                `${process.env.API_URL}/api/home/updateHomeInfo/${informationID}`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            toast.success(response.data.message);

            router.reload();

            setIsButtonLoading(false);
        } catch (err: any) {
            console.log(err.response.data.message)
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
                            Edit HoME Information
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        {dataHoME.map((data: DataHoME, index) => (
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
                                            {...register("name", {
                                                required: "Nama HoME harap diisi",
                                            })}
                                            type={"text"}
                                            name="name"
                                            textColor={"black"}
                                            border={"solid"}
                                            borderColor={"#CBD5E0"}
                                            _hover={{ border: "solid #CBD5E0" }}
                                            defaultValue={data.name}
                                        />
                                        {errors.name !== undefined && (
                                            <Text textColor={"red"}>{errors.name.message}</Text>
                                        )}
                                    </Box>
                                    <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                                        <FormLabel textColor={"black"}>Chapter</FormLabel>
                                        <Select
                                            placeholder="Pilih Chapter"
                                            {...register("chapter", {
                                                required: "chapter harap dipilih",
                                            })}
                                            name="chapter"
                                            textColor={"black"}
                                            border={"solid"}
                                            borderColor={"#CBD5E0"}
                                            _hover={{ border: "solid #CBD5E0" }}
                                            onChange={(e) => setChapterID(e.target.value)}
                                            value={chapterID}
                                        >
                                            {chapter.map((chap: any) => (
                                                <option value={chap.homeChapterID}>
                                                    {chap.name}
                                                </option>
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
                                        defaultValue={data.longDesc}
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
                                        <Input
                                            {...register("linkLogo")}
                                            type={"file"}
                                            pt={1}
                                            name="linkLogo"
                                            _placeholder={{ color: "darkgray" }}
                                            bgColor={"gray.200"}
                                            textColor={"black"}
                                        />
                                        <Img src={data.linkLogo} width={"auto"} height={"100%"} />
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
                                        border={"solid"}
                                        borderColor={"#CBD5E0"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                        defaultValue={data.linkYoutube}
                                    />
                                </Box>
                                <Flex
                                    justifyContent={"space-between"}
                                    mt={2}
                                    mb={"0.8em"}
                                    flexDirection={["column", "column", "row", "row"]}
                                >
                                    <Box width={"100%"} px={2}>
                                        <FormLabel textColor={"black"}>
                                            Media Sosial (LINE)
                                        </FormLabel>
                                        <Input
                                            {...register("linkLine")}
                                            name="linkLine"
                                            textColor={"black"}
                                            border={"solid"}
                                            borderColor={"#CBD5E0"}
                                            _hover={{ border: "solid #CBD5E0" }}
                                            defaultValue={data.linkLine}
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
                                            defaultValue={data.linkInstagram}
                                        />
                                        {errors.instagram !== undefined && (
                                            <Text textColor={"red"}>
                                                {errors.instagram.message}
                                            </Text>
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
                                            defaultValue={data.linkFacebook}
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
                                            defaultValue={data.linkTwitter}
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
                                            Media Sosial (Tiktok)
                                        </FormLabel>
                                        <Input
                                            {...register("linkTiktok")}
                                            name="linkTiktok"
                                            textColor={"black"}
                                            placeholder={"https://www.tiktok.com/"}
                                            border={"solid"}
                                            borderColor={"#CBD5E0"}
                                            _hover={{ border: "solid #CBD5E0" }}
                                            defaultValue={data.linkTiktok}
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
                                            defaultValue={data.linkLinkedIn}
                                        />
                                    </Box>
                                </Flex>
                                <HStack
                                    width={"100%"}
                                    px={2}
                                    mt={2}
                                    mb={"0.8em"}
                                    justifyContent={"right"}
                                >
                                    <Link href={"/home/daftarHome"}>
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
                                            disabled = {
                                                !["D01", "D02", "D03", "D04"].includes(divisiCode!) ? true : false
                                            }
                                        >
                                            SUBMIT
                                        </Button>
                                    )}
                                </HStack>
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
                draggable={false}
                pauseOnHover
            />
        </>
    );
};

editHomeInfo.getInitialProps = async ({ query }: any) => {
    const { informationID } = query;
    return {
        informationID,
    };
};

export default editHomeInfo;
