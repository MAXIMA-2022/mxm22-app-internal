import { Flex, Text, Box, Button, HStack, Link, Select, Input, InputGroup, InputLeftAddon, InputRightAddon, InputLeftElement, VStack, FormControl, FormLabel, Heading, Center, Container } from "@chakra-ui/react";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdOutlineAlternateEmail } from "react-icons/md";

const signIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {};
  return (
    <>
      <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} bgGradient={"linear(to-r, #bd0116, #f74f24)"}>
        <Flex height={"100%"} padding={["1.5em", "2em"]} m={["0em", "1em"]} borderRadius={25} boxShadow={"lg"} bgColor={"#fff"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <HStack>
              <Image src={MxmIconSVG} width={"20px"} height={"20px"} />
              <Text color={"#FF6B6B"} fontWeight={"bold"}>
                MAXIMA 2022
              </Text>
            </HStack>
            <Center>
              <Heading as="h3" size="lg" color={"#5E81F4"} my={"0.5em"}>
                Let's Create Your Account<span style={{ color: "#F16484" }}>!</span>
              </Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <FormLabel fontFamily="rubik">Nomor Induk Mahasiswa</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<RiAccountCircleLine color="black" />} />
                  <Input {...register("nim", { required: "NIM harus diisi" })} placeholder="44898" type="text" name="nim" textColor={"black"} border={"solid"} />
                </InputGroup>
                {errors.nim !== undefined && <Text textColor={"red"}>{errors.nim.message}</Text>}
                <FormLabel mt={"1em"} fontFamily="rubik">
                  Nama Lengkap
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<MdDriveFileRenameOutline color="black" />} />
                  <Input {...register("namaLengkap", { required: "Nama lengkap harus diisi" })} placeholder="John Doe" type="text" name="namaLengkap" textColor={"black"} border={"solid"} />
                </InputGroup>
                {errors.namaLengkap !== undefined && <Text textColor={"red"}>{errors.namaLengkap.message}</Text>}
                <FormLabel mt={"1em"} fontFamily="rubik">
                  Email Student
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<MdOutlineAlternateEmail color="black" />} />
                  <Input {...register("email", { required: "Email harus diisi" })} placeholder="abc@student.umn.ac.id" type="text" name="email" textColor={"black"} border={"solid"} />
                </InputGroup>
                {errors.email !== undefined && <Text textColor={"red"}>{errors.email.message}</Text>}
                <FormLabel mt={"1em"} fontFamily="rubik">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<RiKey2Fill color="black" />} />
                  <Input {...register("password", { required: "Password harus diisi" })} placeholder="****" type="password" name="password" textColor={"black"} border={"solid"} />
                </InputGroup>
                {errors.password !== undefined && <Text textColor={"red"}>{errors.password.message}</Text>}
                <FormLabel mt={"1em"} fontFamily="rubik">
                  Divisi
                </FormLabel>
                <Select {...register("divisi", { required: "Divisi harus dipilih" })} placeholder="Divisi 1" name="divisi" textColor={"black"} border={"solid"} />
                {errors.divisi !== undefined && <Text textColor={"red"}>{errors.divisi.message}</Text>}
              </FormControl>
              <Flex w={"100%"} justifyContent={"center"} py={3} mt={"0.5em"}>
                <Button borderRadius={"md"} w={"full"} type="submit" fontFamily={"rubik"} color={"#fff"} colorScheme={"orange"} bgColor={"#FF855F"}>
                  Sign Up
                </Button>
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
    </>
  );
};

export default signIn;
