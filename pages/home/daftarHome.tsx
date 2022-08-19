import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, CloseButton, HStack, Center, Skeleton } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReadLocalStorage } from "usehooks-ts";
import Swal from "sweetalert2";
import { useUserContext } from "../../useContext/UserContext";

interface DataHoME {
    homeID: number;
    search_key: string;
    linkLogo: string;
    name: string;
    chapter: string;
    shortDesc: string;
    longDesc: string;
    instagram: string;
    lineID: string;
    linkYoutube: string;
    chapterName: string;
    media: [
        {
            photoID: number;
            linkMedia: string;
        }
    ];
}

const listHOME = () => {
    const [dataHoME, setDataHoME] = useState<DataHoME[]>([]);
    const jwt = useReadLocalStorage<string>("token");
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const headers = {
        "x-access-token": jwt!,
    };
    const {divisiCode} = useUserContext()

    useEffect(() => {
        try {
            setIsSkeletonLoading(false);
            const fetchHoME = async () => {
                const response = await axios.get(`${process.env.API_URL}/api/homeInfo`);
                setDataHoME(response.data);
            };
            fetchHoME();
            setIsSkeletonLoading(true);
        } catch (err: any) {
            console.log(err);
            setIsSkeletonLoading(true);
        }
    }, []);

    const handleRemove = async (data: any) => {
        try {
            Swal.fire({
                title: "Apakah anda ingin menghapus HoME?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(
                        `${process.env.API_URL}/api/home/deleteHomeInfo/${data}`,
                        { headers }
                    );
                    toast.success(response.data.message);
                    const res = await axios.get(`${process.env.API_URL}/api/homeInfo`);
                    setDataHoME(res.data);
                }
            });
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    };

    const columnsHoME: MUIDataTableColumn[] = [
        {
            label: "Home ID",
            name: "homeID",
            options: {
                display: false,
            },
        },
        {
            label: "Nama HoME",
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
            label: "Chapter",
            name: "chapterName",
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
                            <Text w={"160px"} textAlign={"center"}>
                                <b>{column.label}</b>
                            </Text>
                        </TableCell>
                    );
                },
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <HStack
                            spacing={2}
                            w={"200px"}
                            justify={["flex-start", "flex-start", "flex-start", "center"]}
                        >
                            <Link
                                href={{
                                    pathname: `editHome/information/${tableMeta.rowData[0]}`,
                                }}
                            >
                                <Button
                                    size={"xs"}
                                    color="white"
                                    bgColor={"#163161"}
                                    _hover={{ bgColor: "#1a4173" }}
                                >
                                    <Center>
                                        <HStack spacing={2}>
                                            <EditIcon />
                                            <Text display={{ base: "none", sm: "block" }}>
                                                Information
                                            </Text>
                                        </HStack>
                                    </Center>
                                </Button>
                            </Link>
                            <Link
                                href={{
                                    pathname: `editHome/media/${tableMeta.rowData[0]}`,
                                }}
                            >
                                <Button
                                    size={"xs"}
                                    bgColor="white"
                                    color={"#163161"}
                                    border={"1px"}
                                    borderColor={"#163161"}
                                >
                                    <Center>
                                        <HStack spacing={2}>
                                            <EditIcon />
                                            <Text display={{ base: "none", sm: "block" }}>
                                                Media
                                            </Text>
                                        </HStack>
                                    </Center>
                                </Button>
                            </Link>
                            <CloseButton
                                size="sm"
                                color="white"
                                bgColor={"#bd0017"}
                                _hover={{ bgColor: "#d01c1f" }}
                                onClick={() => handleRemove(tableMeta.rowData[0])}
                                disabled = { !["D01", "D02", "D03", "D04"].includes(divisiCode!) ? true : false}
                            />
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
                            Daftar HoME
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <Skeleton isLoaded={isSkeletonLoading}>
                            <MUIDataTable
                                title=""
                                columns={columnsHoME}
                                data={dataHoME}
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

export default listHOME;
