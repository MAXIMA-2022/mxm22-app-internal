import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Button, CloseButton, Flex, HStack, Text, UnorderedList } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { TableCell } from "@material-ui/core";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";

const edit = () => {
  const DragAndDropFiles = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <Box>
        <Button size={"xs"} borderRadius={4} {...getRootProps({ className: "dropzone" })} p={"1em"}>
          Browse
          <input {...getInputProps()} />
        </Button>
        <aside>
          <UnorderedList>{files}</UnorderedList>
        </aside>
      </Box>
    );
  };

  interface edit {
    img: any;
  }

  const dataEdit: edit[] = [
    {
      img: <ChakraImage src={"https://bit.ly/dan-abramov"} width={"250px"} height={"150px"} />,
    },
    {
      img: <ChakraImage src={"https://bit.ly/dan-abramov"} width={"250px"} height={"150px"} />,
    },
    {
      img: <ChakraImage src={"https://bit.ly/dan-abramov"} width={"250px"} height={"150px"} />,
    },
  ];

  const columnEdit: MUIDataTableColumn[] = [
    {
      label: "Media",
      name: "img",
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
      label: "Replace Image",
      name: "replaceImg",
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
          return <DragAndDropFiles />;
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
        customBodyRender: (value) => {
          return <DeleteIcon w={5} h={5} color={"#bd0017"} _hover={{ color: "#d01c1f", cursor: "pointer" }} />;
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
              data={dataEdit}
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
          <Flex width={"100%"} px={10} my={6} justifyContent={"right"}>
            <Button w={100} borderRadius={"999px"} type="submit" textColor="black" bgColor={"green.200"} _hover={{ bgColor: "yellow.200" }}>
              SUBMIT
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default edit;
