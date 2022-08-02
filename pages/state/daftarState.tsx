import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Button, CloseButton, HStack, Center} from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { TableCell, TableRow } from "@material-ui/core";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useReadLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
import { useRouter } from 'next/router'

interface StateInfo{
  id: number,
  name: string,
  quota: number,
  day: string,
  category: string,
  identifier: string,
  // stateLogo: string,
  // coverPhoto: string,
}

const dataSTATE: StateInfo[] = [
  {id: 1, name: 'Home 1', day: 'day 1', quota: 100, category: 'cat', identifier: 'asd'},
  {id: 2, name: 'Home 2', day: 'day 2', quota: 100, category: 'cat', identifier: 'asd'},
  {id: 3, name: 'Home 3', day: 'day 3', quota: 100, category: 'cat', identifier: 'asd'},
  {id: 4, name: 'Home 4', day: 'day 4', quota: 100, category: 'cat', identifier: 'asd'},
  {id: 5, name: 'Home 5', day: 'day 5', quota: 100, category: 'cat', identifier: 'asd'},
  {id: 6, name: 'Home 6', day: 'day 6', quota: 100, category: 'cat', identifier: 'asd'},
]

const listSTATE = () => {
  const [state, setState] = useState<StateInfo[]>([]);
  const jwt = useReadLocalStorage<string>("token")
  useEffect(() => {
    const fetchState = async () => {
      try{
        const response = await axios.get(`${process.env.API_URL}/api/stateAct`,{
          headers: {
            "x-access-token": jwt!
          }
        })
        setState(response.data)
        console.log(response.data)
      } catch(err: any){
        console.log(err)
      }
    }
    fetchState()
  }, [])
  const columnsSTATE: MUIDataTableColumn[] = [
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
      label: "kuota",
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
      name: "kodePresensi",
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
    {/* {data.map((item: any, index: number) => {
          return (
            <Flex key={index} value={item.id}>{item.name}</Flex>
          )
        })} */}
      <Flex>
      {state.map((item: any, index: number) => {
                    return (
                      <Text key={index}>{item.name}</Text>
                    )
                  })}
      </Flex>
      {/* <Navbar />
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
              data={dataSTATE}
              options={{
                rowsPerPage: 5,
                selectableRows: "none",
                elevation: 1,
              }}
            />
          </Box>
        </Box>
      </Flex> */}
    </>
  );
};

export default listSTATE;
