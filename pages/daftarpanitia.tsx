import type { NextPage } from "next";
import React, { useState } from "react";
import { useEffect } from "react";

//importing local components
import Layout from "../components/Layout";
import ActiveLink from "../components/ActiveLink";

//importing local icons
import MaximaIcon from "../components/svgs/mxmIcon.svg";

//importing chakra ui components
import { Box, Center, Container, Flex, Heading, Divider, Text, Button, Editable, EditableInput, EditableTextarea, EditablePreview, useEditableControls, Input, IconButton, ButtonGroup, FormControl, Switch, Image } from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";

//importing MUI data tables
import MUIDataTable from "mui-datatables";
import { TableCell, FormControlLabel } from "@material-ui/core";
import { MUIDataTableColumn } from "mui-datatables";

const DaftarPanitia: NextPage = () => {
  interface DaftarPanitia {
    namaPanitia: String;
    nim: Number;
    divisi: String;
    verifikasi: Boolean;
  }

  const [data]: DaftarPanitia[] = useState([
    { namaPanitia: "William Chandra", nim: "34995", divisi: "Rocuta", verifikasi: true },
    { namaPanitia: "Muhammad Naufal Syarif", nim: "34996", divisi: "Rocuta", verifikasi: false },
    { namaPanitia: "Raditya Herikristo", nim: "34997", divisi: "Rocuta", verifikasi: false },
    { namaPanitia: "Tesalonika Abigail", nim: "34998", divisi: "Rocuta", verifikasi: false },
    { namaPanitia: "Felix Ferdianto", nim: "34999", divisi: "Rocuta", verifikasi: false },
    { namaPanitia: "Chris Evan", nim: "34995", divisi: "Acting", verifikasi: true },
    { namaPanitia: "Korean Jett", nim: "35000", divisi: "Duelist", verifikasi: false },
  ]);

  const columns: MUIDataTableColumn[] = [
    {
      label: "Nama Panitia",
      name: "namaPanitia",
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
      label: "Divisi",
      name: "divisi",
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
      label: "Verifikasi",
      name: "verifikasi",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ zIndex: -1 }}>
              <Flex justifyContent={{ base: "none", lg: "center" }}>
                <b>{column.label}</b>
              </Flex>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Flex ms={["0.7em", "0.7em", "0.7em", "2em"]} justifyContent={{ base: "none", lg: "center" }}>
              <FormControlLabel
                label=""
                value={value ? "Yes" : "No"}
                control={<Switch colorScheme={"blue"} isChecked={value} value={value ? "Yes" : "No"} />}
                onChange={(event) => {
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            </Flex>
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

export default DaftarPanitia;
