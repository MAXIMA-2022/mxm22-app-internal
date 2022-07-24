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


export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map((stateID: any) => {
    return {
      params: {
        stateID: stateID.name.toString()
      },
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?name=${params.stateID}`);
  const data = await res.json();
  return {
    props: {
      dataSTATE: data
    }
  }
}

const detailSTATE = ({dataSTATE}: any) => {
  console.log(dataSTATE);
  interface DataDetailSTATE {
    name: String;
    nim: String;
    kehadiran: Boolean;
  }

  const svgSize = "16px";

  const dataDetailSTATE: DataDetailSTATE[] = [
    {
      name: "William",
      nim: "34995",
      kehadiran: false,
    },
    {
      name: "Doodles",
      nim: "34995",
      kehadiran: true,
    },
    {
      name: "Bruce",
      nim: "34995",
      kehadiran: false,
    },
    {
      name: "Uzumaki Naruto",
      nim: "34995",
      kehadiran: false,
    },
    {
      name: "Terra Luna",
      nim: "34995",
      kehadiran: true,
    },
  ];

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
          <Box display={["block", "flex"]} justifyContent={"space-between"} mx={4} minHeight={"15em"}>
      <Center width={["100%", "60%"]} py={["1em", "0"]}>
        <Image src={UltimagzPNG} />
      </Center>
      <Box width={"100%"} py={["0", "2em"]}>
          <Box ps={["0", "1.5em"]}>
            <Heading pb={"0.5em"} fontSize={["2xl", "4xl"]} fontFamily="rubik" fontWeight={"extrabold"}>
              {dataSTATE[0].name}
            </Heading>
            <VStack spacing={[2, 5]} align="stretch">
              <HStack spacing={5}>
                <Image src={JadwalSVG} />
                <Text fontFamily="rubik">
                  Hari ke-{dataSTATE[0].email} ({dataSTATE[0].website})
                </Text>
              </HStack>
              <HStack spacing={5}>
                <Image src={ParticipantSVG} />
                <Text fontFamily="rubik">{dataSTATE[0].address.city}</Text>
              </HStack>
              <HStack spacing={5}>
                  <Image src={KeySVG} />
                  <Text fontFamily="rubik">{dataSTATE[0].address.street}</Text>
                </HStack>
            </VStack>
          </Box>
      </Box>
    </Box>
          <Box py={4} mx={4}>
            <MUIDataTable
              title=""
              columns={columnDetailSTATE}
              data={dataDetailSTATE}
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

export default detailSTATE;
