import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, HStack, Switch } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { TableCell } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../useContext/UserContext";

interface DataPanit {
    name: String;
    nim: String;
    divisi: String;
    verified: number;
}

const DaftarPanit = () => {
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [panit, setPanit] = useState<DataPanit[]>([]);
    const {divisiCode} = useUserContext();
    const headers = {
        "x-access-token": jwt!,
    };



    useEffect(() => {
        try {
            const fetchPanit = async () => {
                const res = await axios.get(`${process.env.API_URL}/api/panit`, { headers });
                setPanit(res.data);
            };
            fetchPanit();
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }, []);

    const verifyData = async (nim: number, verified: string) => {
        try {
            const formData = new FormData();
            formData.append("verified", verified);
            const response = await axios.put(
                `${process.env.API_URL}/api/panit/updateVerified/${nim}`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            const res = await axios.get(`${process.env.API_URL}/api/panit`, { headers });
            setPanit(res.data);

            toast.success(response.data.message);
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        }
    };

    const columnsPanit: MUIDataTableColumn[] = [
        {
            label: "Nama Panitia",
            name: "name",
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
                        <HStack>
                            <Text>{value}</Text>
                            {tableMeta.rowData[3] === true ? (
                                <CheckCircleIcon w={4} h={4} color={"green.500"} />
                            ) : (
                                <></>
                            )}
                        </HStack>
                    );
                },
            },
        },
        {
            label: "NIM",
            name: "nim",
            options: {
                filter: true,
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
            label: "Email",
            name: "email",
            options: {
                filter: true,
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
            label: "Divisi",
            name: "divisiName",
            options: {
                filter: true,
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
            label: "Verifikasi",
            name: "verified",
            options: {
                filter: true,
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <Flex w={"60px"} justifyContent={{ base: "none", lg: "center" }}>
                            <form>
                                {value === 1 ? (
                                    <Switch
                                        colorScheme={"blue"}
                                        borderRadius={"full"}
                                        bg={"gray.500"}
                                        disabled = {['D01', 'D02', 'D04'].includes(divisiCode!) ? false : true}
                                        isChecked
                                        onChange={() => verifyData(tableMeta.rowData[1], "0")}
                                    />
                                ) : (
                                    <Switch
                                        colorScheme={"blue"}
                                        borderRadius={"full"}
                                        bg={"gray.500"}
                                        disabled = {['D01', 'D02', 'D04'].includes(divisiCode!) ? false : true}
                                        onChange={() => verifyData(tableMeta.rowData[1], "1")}
                                    />
                                )}
                            </form>
                        </Flex>
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
                            Daftar Panitia
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <MUIDataTable
                            title=""
                            columns={columnsPanit}
                            data={panit}
                            options={{
                                rowsPerPage: 5,
                                selectableRows: "none",
                                elevation: 1,
                            }}
                        />
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

export default DaftarPanit;
