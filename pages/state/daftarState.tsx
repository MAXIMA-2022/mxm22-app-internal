import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, CloseButton, HStack, Center } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell, TableRow } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";

interface StateInfo{
  id: number,
  name: string,
  quota: number,
  day: string,
  category: string,
  identifier: string,
  stateLogo: string,
  coverPhoto: string,
  attendanceCode: string,
  registered: number,
  stateID: number,
}

const listSTATE = () => {
  const jwt = useReadLocalStorage<string>("token");
  const [state, setstate] = useState<StateInfo[]>([]);
  useEffect(() => {
    const fetchstate = async () => {
      try{
        const response = await axios.get(`${process.env.API_URL}/api/stateAct`,{
          headers:{
            "x-access-token": jwt!
          }
        })
        
        setstate(response.data)
        // console.log(response.data)
      } catch(err: any){
        console.log(err)
      }
    }
    fetchstate()
  }, [])

  const columnsSTATE: MUIDataTableColumn[] = [
    {
      label: "STATE ID",
      name: "stateID",
      options:{
        display: false
      }
    },
    {
      label: "Nama STATE",
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
      label: "Kuota",
      name: "quota",
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
      label: "Kuota Terisi",
      name: "registered",
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
            <Text>
              {value} / {tableMeta.rowData[1]}
            </Text>
          );
        },
      },
    },
    {
      label: "Kode Presensi",
      name: "attendanceCode",
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
            <HStack spacing={2}>
              <Link href={"daftarState/" + tableMeta.rowData[0]}>
                <Button size="xs" color="white" bgColor={"#163161"} _hover={{ bgColor: "#1a4173" }}>
                  <Center>
                    <HStack spacing={2}>
                      <InfoOutlineIcon />
                      <Text display={{ base: "none", sm: "block" }}>Detail</Text>
                    </HStack>
                  </Center>
                </Button>
              </Link>
              <Button size={"xs"} bgColor="white" color={"#163161"} border={"1px"} borderColor={"#163161"}>
                <Center>
                  <HStack spacing={2}>
                    <EditIcon />
                    <Text display={{ base: "none", sm: "block" }}>Edit</Text>
                  </HStack>
                </Center>
              </Button>
              <CloseButton size="sm" color="white" bgColor={"#bd0017"} _hover={{ bgColor: "#d01c1f" }} />
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
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Daftar STATE
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            <MUIDataTable
              title=""
              columns={columnsSTATE}
              data={state}
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

export default listSTATE;
