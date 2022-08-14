import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, HStack, Switch, Skeleton } from "@chakra-ui/react";
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

interface DataToggle {
    name: String;
    id: number;
    toggle: number;
}

const DaftarPanit = () => {
    const jwt = useReadLocalStorage<string | undefined>("token");
    const [toggle, setToggle] = useState<DataToggle[]>([]);
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
    const headers = {
        "x-access-token": jwt!,
    };

    useEffect(() => {
        try {
            setIsSkeletonLoading(false);
            const fetchToggle = async () => {
                const res = await axios.get(`${process.env.API_URL}/api/toggle`, { headers });
                setToggle(res.data);
            };
            fetchToggle();
            setIsSkeletonLoading(true);
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message);
            setIsSkeletonLoading(true);
        }
    }, []);

    const verifyData = async (id: number, toggle: string) => {
        try {
            const formData = new FormData();
            formData.append("toggle", toggle);
            const response = await axios.put(
                `${process.env.API_URL}/api/toggle/updateToggle/${id}`,
                formData,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            const res = await axios.get(`${process.env.API_URL}/api/toggle`, { headers });
            setToggle(res.data);

            toast.success(response.data.message);
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        }
    };

    const columnsToggle: MUIDataTableColumn[] = [
        {
            label: "Toggle ID",
            name: "id",
            options: {
                display: false,
            },
        },
        {
            label: "Nama Toggle",
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
            label: "Aksi",
            name: "toggle",
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
                                        isChecked
                                        onChange={() => verifyData(tableMeta.rowData[0], "0")}
                                    />
                                ) : (
                                    <Switch
                                        colorScheme={"blue"}
                                        borderRadius={"full"}
                                        bg={"gray.500"}
                                        onChange={() => verifyData(tableMeta.rowData[0], "1")}
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
                            Toggle
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <Skeleton isLoaded={isSkeletonLoading}>
                            <MUIDataTable
                                title=""
                                columns={columnsToggle}
                                data={toggle}
                                options={{
                                    rowsPerPage: 5,
                                    selectableRows: "none",
                                    elevation: 1,
                                }}
                            />
                        </Skeleton>
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
