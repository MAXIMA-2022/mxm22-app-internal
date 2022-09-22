import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { TableCell } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../useContext/UserContext";
import CheckIconSVG from "../../public/checkIcon.svg";
import CrossIconSVG from "../../public/crossIcon.svg";

interface DataEksternal {
    id: number;
    name: String;
    nim: String;
    divisi: String;
    verified: number;
    timeVerified: string;
}

const svgSize = "16px";

const dataEksternal = () => {
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [eks, setEks] = useState<DataEksternal[]>([]);
    const { divisiCode } = useUserContext();
    const headers = {
        "x-access-token": jwt!,
    };

    useEffect(() => {
        try {
            const fetcheks = async () => {
                const res = await axios.get(`${process.env.API_URL}/api/malpunOuts`, { headers });
                for (let i = 0; i < res.data.length; i++) {
                    const date = new Date(res.data[i].timeVerified);
                    const hari = date.toLocaleTimeString();
                    if (hari === "7:00:00 AM") {
                        res.data[i].timeVerified = "";
                    } else {
                        res.data[i].timeVerified = hari;
                    }
                }
                setEks(res.data);
            };
            fetcheks();
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }, []);

    const verifyData = async (ID: number, verified: string) => {
        try {
            const formData = new FormData();
            formData.append("verified", verified);
            const response = await axios.put(
                `${process.env.API_URL}/api/malpunOuts/verifyOuts/${ID}`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            const res = await axios.get(`${process.env.API_URL}/api/malpunOuts`, { headers });
            for (let i = 0; i < res.data.length; i++) {
                const date = new Date(res.data[i].timeVerified);
                const hari = date.toLocaleTimeString();
                if (hari === "7:00:00 AM") {
                    res.data[i].timeVerified = "";
                } else {
                    res.data[i].timeVerified = hari;
                }
            }
            setEks(res.data);

            toast.success(response.data.message);
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        }
    };

    const columnseks: MUIDataTableColumn[] = [
        {
            label: "Nama Peserta",
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
            label: "ID",
            name: "id",
            options: {
                display: false,
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
                                    <Button
                                        colorScheme={"blue"}
                                        borderRadius={"full"}
                                        bg={"red.400"}
                                        disabled={
                                            ["D01", "D02", "D04", "D10", "D14"].includes(
                                                divisiCode!
                                            )
                                                ? false
                                                : true
                                        }
                                        onClick={() => verifyData(tableMeta.rowData[1], "0")}
                                    >
                                        Undo
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme={"blue"}
                                        borderRadius={"full"}
                                        bg={"green.200"}
                                        disabled={
                                            ["D01", "D02", "D04", "D10", "D14"].includes(
                                                divisiCode!
                                            )
                                                ? false
                                                : true
                                        }
                                        onClick={() => verifyData(tableMeta.rowData[1], "1")}
                                    >
                                        Verify
                                    </Button>
                                )}
                            </form>
                        </Flex>
                    );
                },
            },
        },
        {
            label: "Check In",
            name: "timeVerified",
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
            label: "Status",
            name: "Status",
            options: {
                filter: true,
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <Flex justifyContent={{ base: "none", lg: "center" }}>
                                <b>{column.label}</b>
                            </Flex>
                        </TableCell>
                    );
                },
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <Flex justifyContent={{ base: "none", lg: "center" }}>
                            {tableMeta.rowData[4] === 1 ? (
                                <Image src={CheckIconSVG} width={svgSize} height={svgSize} />
                            ) : (
                                <Image src={CrossIconSVG} width={svgSize} height={svgSize} />
                            )}
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
                            Daftar Peserta
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <MUIDataTable
                            title=""
                            columns={columnseks}
                            data={eks}
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

export default dataEksternal;
