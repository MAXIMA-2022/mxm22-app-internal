import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import {
    Box,
    Flex,
    Text,
    FormLabel,
    Input,
    Select,
    Button,
    Img,
    HStack,
    Link,
} from "@chakra-ui/react";
import MxmIconSVG from "../../../public/mxmIcon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

interface StateInfo {
    name: string;
    quota: number;
    day: string;
    category: string;
    stateLogo: string;
    coverPhoto: string;
    shortDesc: string;
}

const editState = ({ stateID }: { stateID: number }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState(undefined);
    const router = useRouter();
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [state, setstate] = useState<StateInfo[]>([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [date, setDate] = useState<string[]>([]);
    const [hari, setHari] = useState<string>("0");
    const [cat, setCat] = useState<string>("0");
    const headers = {
        "x-access-token": jwt!,
    };
    useEffect(() => {
        try {
            const fetchstate = async () => {
                const response = await axios.get(`${process.env.API_URL}/api/stateAct/${stateID}`, {
                    headers,
                });
                const res = await axios.get(`${process.env.API_URL}/api/dayManagement`, {
                    headers,
                });
                setDate(res.data);
                setstate(response.data);

                setHari(response.data[0].day);
                setCat(response.data[0].category);
            };
            fetchstate();
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            setIsButtonLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("quota", data.quota);
            formData.append("day", data.day);
            formData.append("stateLogo", data.stateLogo[0]);
            const response = await axios.put(
                `${process.env.API_URL}/api/stateAct/update/${stateID}`,
                formData,
                { headers }
            );
            toast.success(response.data.message);
            setIsButtonLoading(false);
            router.reload();
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
                            Edit STATE
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        {state.map((data: any, index) => (
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
                                            defaultValue={data.name}
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
                                                    value: 100,
                                                    message: "Kuota tidak boleh lebih dari 100",
                                                },
                                            })}
                                            type={"number"}
                                            name="quota"
                                            textColor={"black"}
                                            border={"solid"}
                                            borderColor={"#CBD5E0"}
                                            _hover={{ border: "solid #CBD5E0" }}
                                            defaultValue={data.quota}
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
                                            onChange={(e) => setHari(e.target.value)}
                                            value={hari}
                                        >
                                            {date.map((res: any) => {
                                                return (
                                                    <option value={res.day as string}>
                                                        {res.date}
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
                                        <Input
                                            {...register("stateLogo")}
                                            type={"file"}
                                            pt={1}
                                            name="stateLogo"
                                            _placeholder={{ color: "darkgray" }}
                                            bgColor={"gray.200"}
                                            textColor={"black"}
                                        />
                                        <Img src={data.stateLogo} width={"auto"} height={"100%"} />
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
    );
};

editState.getInitialProps = async ({ query }: any) => {
    const { stateID } = query;
    return {
        stateID,
    };
};

export default editState;
