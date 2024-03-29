import {
    Flex,
    Text,
    Box,
    Button,
    HStack,
    Link,
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
    FormLabel,
    Heading,
    Center,
    Select,
    Stack,
} from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { isExpired } from "react-jwt";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUserInfo {
    nim: string;
    password: string;
    role: string;
}

const signIn = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserInfo>();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const [, setLocalStorage] = useLocalStorage("token", "");
    const jwt = useReadLocalStorage("token");
    const isMyTokenExpired = isExpired(jwt as string);

    useEffect(() => {
        if (jwt && !isMyTokenExpired) {
            router.push("/");
        }
    }, []);

    const onSubmit: SubmitHandler<IUserInfo> = async (data: IUserInfo) => {
        try {
            setIsButtonLoading(true);

            const formData = new FormData();
            formData.append("nim", data.nim);
            formData.append("password", data.password);

            let response;

            if (data.role === "panitia") {
                response = await axios.post(`${process.env.API_URL}/api/panit/login`, formData);
            } else if (data.role === "organisator") {
                response = await axios.post(`${process.env.API_URL}/api/org/login`, formData);
            }

            setLocalStorage(response?.data?.token);

            router.push("/");
        } catch (err: any) {
            toast.error(err.response.data.message);
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
                    padding={"2em 2.5em"}
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
                                Log In to Dashboard
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
                                        type="number"
                                        name="nim"
                                        textColor={"black"}
                                        border={"solid"}
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </InputGroup>
                                {errors.nim !== undefined && (
                                    <Text textColor={"red"}>{errors.nim.message}</Text>
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
                                        _hover={{ border: "solid #CBD5E0" }}
                                    />
                                </InputGroup>
                                {errors.password !== undefined && (
                                    <Text textColor={"red"}>{errors.password.message}</Text>
                                )}
                                <FormLabel mt={"1em"} fontFamily="rubik" textColor={"black"}>
                                    Role
                                </FormLabel>
                                <Select
                                    borderColor={"#CBD5E0"}
                                    {...register("role", { required: "Role harus dipilih" })}
                                    placeholder="Pilih Role"
                                    name="role"
                                    textColor={"black"}
                                    border={"solid"}
                                >
                                    <option value="panitia">Panitia</option>
                                    <option value="organisator">Organisator</option>
                                </Select>
                                {errors.role !== undefined && (
                                    <Text textColor={"red"}>{errors.role.message}</Text>
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
                                        Sign In
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
                                        Sign In
                                    </Button>
                                )}
                            </Flex>
                        </form>
                        <Stack justifyContent={"center"} alignItems={"center"}>
                            <Text fontSize={"14px"} fontFamily="rubik" color={"gray.500"}>
                                Need an panitia account?
                                <Link href="/signUp/panitia" color={"#FF855F"} fontFamily="rubik">
                                    <a>
                                        {" "}
                                        <b>Panitia</b>
                                    </a>
                                </Link>
                            </Text>
                            <Text fontSize={"14px"} fontFamily="rubik" color={"gray.500"}>
                                Need an organisator account?
                                <Link
                                    href="/signUp/organisator"
                                    color={"#FF855F"}
                                    fontFamily="rubik"
                                >
                                    <a>
                                        {" "}
                                        <b>Organisator</b>
                                    </a>
                                </Link>
                            </Text>
                        </Stack>
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
                draggable={false}
                pauseOnHover
            />
        </>
    );
};

export default signIn;
