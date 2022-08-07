import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { Box, Flex, HStack, VStack, Switch, Text, Center, Heading } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import MxmIconSVG from "../../../public/mxmIcon.svg";
import CheckIconSVG from "../../../public/checkIcon.svg";
import CrossIconSVG from "../../../public/crossIcon.svg";
import JadwalSVG from "../../../public/jadwal.svg";
import ParticipantSVG from "../../../public/participant.svg";
import KeySVG from "../../../public/key.svg";
import UltimagzPNG from "../../../public/ultimagz.png";
import Image from "next/image";
import { TableCell } from "@material-ui/core";
import { EditIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useReadLocalStorage } from "usehooks-ts";

interface StateInfo{
    name: string,
    quota: number,
    day: string,
    category: string,
    stateLogo: string,
    coverPhoto: string,
    shortDesc: string,
    registered: number,
}

const detailSTATE = ({stateID}: {stateID: number}) => {
  const jwt = useReadLocalStorage<string | undefined>("token");
  const [state, setstate] = useState<StateInfo[]>([]);
  const [participant, setParticipant] = useState([])
  const headers = {
    'x-access-token': jwt!
  }
  useEffect(() => {
    try {
      const fetchstate = async () => {
        const response = await axios.get(`${process.env.API_URL}/api/stateAct/${stateID}`,{headers})
        setstate(response.data)
        console.log(response.data)
      }
      const fetchparticipants = async () => {
        const res = await axios.get(`${process.env.API_URL}/api/stateReg`,{headers})
        setParticipant(res.data)
        console.log(res.data)
      }
      fetchparticipants()
      fetchstate()
    } catch(err: any) {
      console.log(err)
    }
  },[])

  const svgSize = "16px";

  const columnDetailSTATE: MUIDataTableColumn[] = [
    {
      label: "Nama Mahasiswa",
      name: "name",
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
      label: "Kehadiran",
      name: "kehadiran",
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
          return <Flex justifyContent={{ base: "none", lg: "center" }}>{tableMeta.rowData[2] === true ? <Image src={CheckIconSVG} width={svgSize} height={svgSize} /> : <Image src={CrossIconSVG} width={svgSize} height={svgSize} />}</Flex>;
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
              Detail STATE
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          {state.map((data: any, index: number)=>{
            return(
              <div key={index}>
              <Box
                display={["block", "flex"]}
                justifyContent={"space-between"}
                mx={4}
                minHeight={"15em"}
              >
                <Center width={["100%", "60%"]} py={["1em", "0"]}>
                  <Image src={data.stateLogo} width={"250px"} height={"100%"} />
                </Center>
                <Box width={"100%"} py={["0", "2em"]}>
                  <Box ps={["0", "1.5em"]}>
                    <Heading
                      pb={"0.5em"}
                      fontSize={["2xl", "4xl"]}
                      fontFamily="rubik"
                      fontWeight={"extrabold"}
                      textColor={"black"}
                    >
                      {data.name}
                    </Heading>
                    <VStack spacing={[2, 5]} align="stretch">
                      <HStack spacing={5}>
                        <Image src={JadwalSVG} />
                        <Text fontFamily="rubik" textColor={"black"}>
                          Hari ke-{data.day} ({data.date})
                        </Text>
                      </HStack>
                      <HStack spacing={5}>
                        <Image src={ParticipantSVG} />
                        <Text fontFamily="rubik" textColor={"black"}>
                          {data.registered}/{data.quota}
                        </Text>
                      </HStack>
                      <HStack spacing={5}>
                        <Image src={KeySVG} />
                        <Text fontFamily="rubik" textColor={"black"}>
                          {data.attendanceCode}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </div>
            )
          })}
          <Box py={4} mx={4}>
          <Text fontFamily="rubik" textColor={"black"} fontWeight={"extrabold"}>Peserta Registrasi STATE</Text>
            <MUIDataTable
              title=""
              columns={columnDetailSTATE}
              data={participant}
              options={{
                rowsPerPage: 5,
                selectableRows: "none",
                elevation: 0,
              }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

detailSTATE.getInitialProps = async ({query}: any) => {
    const { stateID } = query;
    return {
      stateID
    }
}

export default detailSTATE;