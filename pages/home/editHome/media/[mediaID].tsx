import Sidebar from "../../../../components/Sidebar";
import Navbar from "../../../../components/Navbar";
import { Box, Button, CloseButton, Flex, HStack, Img, Text } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import MxmIconSVG from "../../../../public/mxmIcon.svg";
import Image from "next/image";
import { TableCell } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../useContext/UserContext";

interface DataMedia {
    photoID: number;
    homeID: number;
    linkMedia: string;
    homeName: string;
}

const editMedia = ({ mediaID }: { mediaID: number }) => {
    const [dataMedia, setDataMedia] = useState<DataMedia[]>([]);
    const jwt = useReadLocalStorage<string | undefined>("token");
    const {divisiCode} = useUserContext();
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);

    useEffect(() => {
        try {
            setIsSkeletonLoading(false);
            const fetchMedia = async () => {
                const res = await axios.get(
                    `${process.env.API_URL}/api/homeMedia/homeID/${mediaID}`,
                    {
                        headers: {
                            "x-access-token": jwt!,
                        },
                    }
                );

                console.log(res);

                setDataMedia(res.data);
            };
            fetchMedia();
            setIsSkeletonLoading(true);
        } catch (err) {
            console.log(err);
            setIsSkeletonLoading(true);
        }
    }, []);

    const handleRemove = async (photoID: number) => {
        try {
            const res = await axios.delete(
                `${process.env.API_URL}/api/home/deleteHomeMedia/${photoID}`,
                {
                    headers: {
                        "x-access-token": jwt!,
                    },
                }
            );

            toast.success(res.data.message);

            const res2 = await axios.get(`${process.env.API_URL}/api/homeMedia/homeID/${mediaID}`, {
                headers: {
                    "x-access-token": jwt!,
                },
            });

            setDataMedia(res2.data);
        } catch (err: any) {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        }
    };

    const columnEdit: MUIDataTableColumn[] = [
        {
            label: "Photo",
            name: "photoID",
            options: {
                display: false,
            },
        },
        {
            label: "Media",
            name: "linkMedia",
            options: {
                filter: true,
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <b>{column.label}</b>
                        </TableCell>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Box>
                            <Img
                                src={value}
                                alt="media"
                                width={"auto"}
                                height={"100%"}
                                objectFit="cover"
                            />
                        </Box>
                    );
                },
            },
        },
        {
            label: "Action",
            name: "action",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} style={{ zIndex: -1 }}>
                            <Text>
                                <b>{column.label}</b>
                            </Text>
                        </TableCell>
                    );
                },
                customBodyRender: (value: any, tableMeta: any) => {
                    return (
                        <CloseButton
                            size="sm"
                            color="white"
                            bgColor={"#bd0017"}
                            _hover={{ bgColor: "#d01c1f" }}
                            onClick={() => handleRemove(tableMeta.rowData[0])}
                        />
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
                            Edit Media
                        </Text>
                        <Flex p={"10px"}>
                            <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
                        </Flex>
                    </Flex>
                    <Box py={4} mx={4}>
                        <MUIDataTable
                            title=""
                            columns={columnEdit}
                            data={dataMedia}
                            options={{
                                rowsPerPage: 5,
                                selectableRows: "none",
                                elevation: 0,
                                customToolbar: () => {
                                    return <Box w={"100%"} h={"auto"}></Box>;
                                },
                                search: false,
                                print: false,
                                download: false,
                                viewColumns: false,
                                filter: false,
                                pagination: false,
                            }}
                        />
                    </Box>
                    <HStack width={"100%"} px={10} my={6} justifyContent={"right"}>
                        <Link href="/home/daftarHome">
                            <Button
                                w={100}
                                borderRadius={"999px"}
                                textColor="white"
                                colorScheme={"facebook"}
                            >
                                BACK
                            </Button>
                        </Link>
                        {["D01", "D02", "D03", "D04"].includes(divisiCode!) && (
                            <Link href="/home/tambahMediaHome">
                                <Button
                                    w={100}
                                    borderRadius={"999px"}
                                    type="submit"
                                    textColor="black"
                                    bgColor={"green.200"}
                                    _hover={{ bgColor: "yellow.200" }}
                                >
                                    TAMBAH
                                </Button>
                            </Link>
                        )}
                    </HStack>
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

editMedia.getInitialProps = async ({ query }: any) => {
    const { mediaID } = query;
    return {
        mediaID,
    };
};

export default editMedia;
