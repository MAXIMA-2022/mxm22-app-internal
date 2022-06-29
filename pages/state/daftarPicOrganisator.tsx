import type { NextPage } from "next";
import React, { useState } from "react";
import { useEffect } from "react";

//importing local components
import Layout from "../../components/Layout";
import ActiveLink from "../../components/ActiveLink";

//importing local icons
import MaximaIcon from "../../components/svgs/mxmIcon.svg";

//importing chakra ui components
import { Box, Center, Container, Flex, Heading, Divider, Text, Button, Editable, EditableInput, EditableTextarea, EditablePreview, useEditableControls, Input, IconButton, ButtonGroup, FormControl, Switch, Image } from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";

//importing MUI data tables
import MUIDataTable from "mui-datatables";
import { TableCell, FormControlLabel } from "@material-ui/core";
import { MUIDataTableColumn } from "mui-datatables";

const DaftarPICOrganisator: NextPage = () => {
  interface DaftarAkunOrganisator {
    pic: String;
    nim: Number;
    state: String;
  }

  const [data]: DaftarAkunOrganisator[] = useState([
    { pic: "William Chandra", nim: "34995", state: "UMN Band" },
    { pic: "Muhammad Naufal Syarif", nim: "34996", state: "J-Cafe" },
    { pic: "Raditya Herikristo", nim: "34997", state: "Skystar Venture" },
    { pic: "Chris Evan", nim: "34995", state: "Teater Katak" },
    { pic: "Alucard", nim: "35000", state: "Mobile Legends" },
  ]);

  const columns: MUIDataTableColumn[] = [
    {
      label: "PIC",
      name: "pic",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ zIndex: -1 }}>
              <b>{column.label}</b>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value);
          return (
            <Flex>
              <Center>
                <Text>{value}</Text>
              </Center>
              <Center ms={"0.5em"}>{tableMeta.rowData[3] ? <CheckCircleIcon color="green" /> : null}</Center>
            </Flex>
          );
        },
      },
    },
    {
      label: "NIM",
      name: "nim",
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
      label: "STATE",
      name: "state",
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
  ];

  const options = {
    filterType: "dropdown",
    elevation: 1,
    responsive: "stacked",
    selectableRows: "none",
    rowsPerPage: 5,
    // tableBodyHeight: "400px",
    rowsPerPageOptions: [5, 10, 15],
  };

  const TableHeader = () => {
    return (
      <Flex justifyContent={"space-between"} p={["0", "1em 0"]}>
        <Center>
          <Heading size={["sm", "lg"]}>Daftar Panitia</Heading>
        </Center>
        <Center>
          <MaximaIcon />
        </Center>
      </Flex>
    );
  };

  return (
    <Box>
      <Layout>
        <Box m={"4.5em 8.5em"} backgroundColor={"black"} display={["none", "none", "block"]}></Box>
        <Box w={"full"} backgroundColor={"#ffffff"} m={{ base: "4.5em 1em", md: "4.5em 1.3em" }} p={["1rem", "1.5em"]} borderRadius={"1em"}>
          <TableHeader />
          <Divider my={"1em"} borderColor={"black"} borderWidth={"0.1em"} />
          <MUIDataTable title="" data={data} columns={columns} options={options} />
        </Box>
      </Layout>
    </Box>
  );
};

export default DaftarPICOrganisator;
