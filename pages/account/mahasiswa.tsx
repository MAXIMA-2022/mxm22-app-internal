import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, HStack, Center } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import Link from "next/link";

const DaftarMHS = () => {
    interface DataMHS {
        name: string;
        nim: number;
        password: string;
        whatsapp: string;
        email: string;
        idInstagram: string;
        idLine: string;
        tanggalLahir: string;
        tempatLahir: string;
        jenisKelamin: string;
        prodi: string;
    }

    const jwt = useReadLocalStorage<string | undefined>("token");
    const [mhs, setMhs] = useState<DataMHS[]>([]);

    useEffect(() => {
        try {
            const headers = {
                "x-access-token": jwt!,
            };
            const fetchMhs = async () => {
                const res = await axios.get(`${process.env.API_URL}/api/mhs`, { headers });
                setMhs(res.data);
                console.log(res.data);
            };
            fetchMhs();
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    const columnsMHS: MUIDataTableColumn[] = [
        {
            label: "NIM",
            name: "nim",
            options: {
                display: false,
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "Nama Mahasiswa",
            name: "name",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "Alamat Email",
            name: "email",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "Nomor HP",
            name: "whatsapp",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "ID Line",
            name: "idLine",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "Instagram",
            name: "idInstagram",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
            },
        },
        {
            label: "Pengaturan",
            name: "action",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <HStack spacing={2}>
                            <Link
                                href={{
                                    pathname: `detailMahasiswa/${tableMeta.rowData[0]}`,
                                }}
                            >
                                <Button
                                    size="xs"
                                    color="white"
                                    bgColor={"#163161"}
                                    _hover={{ bgColor: "#1a4173" }}
                                >
                                    <Center>
                                        <HStack spacing={2}>
                                            <InfoOutlineIcon />
                                            <Text display={{ base: "none", sm: "block" }}>
                                                Detail
                                            </Text>
                                        </HStack>
                                    </Center>
                                </Button>
                            </Link>
                        </HStack>
                    );
                },
            },
        },
    ];

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
                            Daftar Mahasiswa
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <MUIDataTable
                            title=""
                            columns={columnsMHS}
                            data={mhs}
                            options={{
                                rowsPerPage: 5,
                                selectableRows: "none",
                                elevation: 1,
                            }}
                        />
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default DaftarMHS;
