import {
    Flex,
    Text,
    Box,
    Button,
    HStack,
    Link,
    Select,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    InputLeftElement,
    VStack,
    FormControl,
    FormLabel,
    Heading,
    Center,
    Container,
} from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdOutlineAlternateEmail } from "react-icons/md";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUserInfo {
    nim: string;
    password: string;
    name: string;
    email: string;
    divisiID: string;
}

const signUp = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserInfo>();

    const [divisi, setDivisi] = useState<string[] | number[]>([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const jwt = useReadLocalStorage("token");
    const isMyTokenExpired = isExpired(jwt as string);

    useEffect(() => {
        if (jwt && !isMyTokenExpired) {
            router.push("/");
        }
        const fetchDivisi = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/divisi`);
                setDivisi(response.data);
            } catch (err: any) {
                console.log(err);
            }
        };
        fetchDivisi();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setIsButtonLoading(true);
            const formData = new FormData();
            formData.append("nim", data.nim);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("divisiID", data.divisiID);
            await axios.post(`${process.env.API_URL}/api/panit/register`, formData);
            toast.success("Pendaftaran berhasil!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            <Flex
                minH={"100vh"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"#DEE1E6"}
            >
                <Flex
                    height={"100%"}
                    padding={["1.5em", "2em"]}
                    m={["0em", "1em"]}
                    borderRadius={25}
                    boxShadow={"lg"}
                    bgColor={"#fff"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box>
                        <HStack>
                            <Image src={MxmIconSVG} width={"20px"} height={"20px"} />
                            <Text color={"#FF6B6B"} fontWeight={"bold"}>
                                MAXIMA 2022
                            </Text>
                        </HStack>
                        <Center>
                            <Heading as="h3" size="lg" color={"#5E81F4"} my={"0.5em"}>
                                Panitia Registration<span style={{ color: "#F16484" }}>!</span>
                            </Heading>
                        </Center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl onSubmit={handleSubmit(onSubmit)}>
                                <FormLabel fontFamily="rubik" textColor={"black"}>
                                    Nomor Induk Mahasiswa
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<RiAccountCircleLine color="black" />}
                                    />
                                    <Input
                                        borderColor={"#CBD5E0"}
                                        {...register("nim", { required: "NIM harus diisi" })}
                                        placeholder="44898"
                                        type="text"
                                        name="nim"
                                        textColor={"black"}
                                        border={"solid"}
                                    />
                                </InputGroup>
                                {errors.nim !== undefined && (
                                    <Text textColor={"red"}>{errors.nim.message}</Text>
                                )}
                                <FormLabel mt={"1em"} fontFamily="rubik" textColor={"black"}>
                                    Nama Lengkap
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<MdDriveFileRenameOutline color="black" />}
                                    />
                                    <Input
                                        borderColor={"#CBD5E0"}
                                        {...register("name", {
                                            required: "Nama lengkap harus diisi",
                                        })}
                                        placeholder="John Doe"
                                        type="text"
                                        name="name"
                                        textColor={"black"}
                                        border={"solid"}
                                    />
                                </InputGroup>
                                {errors.name !== undefined && (
                                    <Text textColor={"red"}>{errors.name.message}</Text>
                                )}
                                <FormLabel mt={"1em"} fontFamily="rubik" textColor={"black"}>
                                    Email Student
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<MdOutlineAlternateEmail color="black" />}
                                    />
                                    <Input
                                        borderColor={"#CBD5E0"}
                                        {...register("email", { required: "Email harus diisi" })}
                                        placeholder="abc@student.umn.ac.id"
                                        type="text"
                                        name="email"
                                        textColor={"black"}
                                        border={"solid"}
                                    />
                                </InputGroup>
                                {errors.email !== undefined && (
                                    <Text textColor={"red"}>{errors.email.message}</Text>
                                )}
                                <FormLabel mt={"1em"} fontFamily="rubik" textColor={"black"}>
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<RiKey2Fill color="black" />}
                                    />
                                    <Input
                                        borderColor={"#CBD5E0"}
                                        {...register("password", {
                                            required: "Password harus diisi",
                                        })}
                                        placeholder="****"
                                        type="password"
                                        name="password"
                                        textColor={"black"}
                                        border={"solid"}
                                    />
                                </InputGroup>
                                {errors.password !== undefined && (
                                    <Text textColor={"red"}>{errors.password.message}</Text>
                                )}
                                <FormLabel mt={"1em"} fontFamily="rubik" textColor={"black"}>
                                    Divisi
                                </FormLabel>
                                <Select
                                    borderColor={"#CBD5E0"}
                                    {...register("divisiID", { required: "Divisi harus dipilih" })}
                                    placeholder="Pilih Divisi"
                                    name="divisiID"
                                    textColor={"black"}
                                    border={"solid"}
                                >
                                    {divisi.map((item: any, index: number) => {
                                        return (
                                            <option key={index} value={item.divisiID}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                                {errors.divisiID !== undefined && (
                                    <Text textColor={"red"}>{errors.divisiID.message}</Text>
                                )}
                            </FormControl>
                            <Flex w={"100%"} justifyContent={"center"} py={3} mt={"0.5em"}>
                                {isButtonLoading === true ? (
                                    <Button
                                        isLoading
                                        borderRadius={"md"}
                                        w={"full"}
                                        type="submit"
                                        fontFamily={"rubik"}
                                        color={"#fff"}
                                        colorScheme={"orange"}
                                        bgColor={"#FF855F"}
                                    >
                                        Sign Up
                                    </Button>
                                ) : (
                                    <Button
                                        borderRadius={"md"}
                                        w={"full"}
                                        type="submit"
                                        fontFamily={"rubik"}
                                        color={"#fff"}
                                        colorScheme={"orange"}
                                        bgColor={"#FF855F"}
                                    >
                                        Sign Up
                                    </Button>
                                )}
                            </Flex>
                        </form>
                        <Flex justifyContent={"center"} alignItems={"center"}>
                            <Text fontSize={"14px"} fontFamily="rubik" color={"gray.500"}>
                                Already a User?
                                <Link href="/signIn" color={"#FF855F"} fontFamily="rubik">
                                    <a> Login</a>
                                </Link>
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
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

export default signUp;
