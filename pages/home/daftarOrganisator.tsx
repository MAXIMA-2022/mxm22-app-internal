import type { NextPage } from "next";
import React, { useState, Component } from "react";
import { useEffect } from "react";

//importing local components
import Layout from "../../components/Layout";
import ActiveLink from "../../components/ActiveLink";

//importing local icons
import MaximaIcon from "../../components/svgs/mxmIcon.svg";

//importing chakra ui components
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Divider,
  Text,
  Button,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  Input,
  IconButton,
  ButtonGroup,
  FormControl,
  Switch,
  Image,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";

//importing MUI data tables
import MUIDataTable from "mui-datatables";
import { TableCell, FormControlLabel } from "@material-ui/core";
import { MUIDataTableColumn } from "mui-datatables";
import { render } from "react-dom";

const DaftarOrganisatorHoME: NextPage = () => {
  interface DaftarOrganisatorHoME {
    shift(): void;
    namaOrganisator: String;
    kategori: String;
    pengaturan: Boolean;
  }

  const [data]: DaftarOrganisatorHoME[] = useState([
    { namaOrganisator: "Game Development UMN", kategori: "UKM Pengembangan Game", pengaturan: true },
    { namaOrganisator: "Kompas Corner", kategori: "UKM Nongkrong", pengaturan: false },
    { namaOrganisator: "Fortius E-Sport", kategori: "UKM E-Sport", divisi: "Rocuta", pengaturan: false },
  ]);

  const columns: MUIDataTableColumn[] = [
    {
      label: "Nama Organisator",
      name: "namaOrganisator",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ zIndex: -1 }}>
              <b>{column.label}</b>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[2] ? (
                <Editable defaultValue={value} isPreviewFocusable={true}>
                  <EditablePreview />
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              ) : (
                <Editable defaultValue={value} isPreviewFocusable={false}>
                  <EditablePreview />
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              )}
            </>
          );
        },
      },
    },
    {
      label: "Kategori",
      name: "kategori",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ zIndex: -1 }}>
              <b>{column.label}</b>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[2] ? (
                <Editable defaultValue={value} isPreviewFocusable={true}>
                  <EditablePreview />
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              ) : (
                <Editable defaultValue={value} isPreviewFocusable={false}>
                  <EditablePreview />
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              )}
            </>
          );
        },
      },
    },
    {
      label: "Pengaturan",
      name: "pengaturan",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ zIndex: -1 }}>
              <b>{column.label}</b>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          const EditableHandler = () => {
            return (
              <Flex>
                {value ? (
                  <Button
                    w={"5em"}
                    me={"0.5em"}
                    colorScheme="facebook"
                    size="xs"
                    onClick={(event: any) => {
                      updateValue((event.target.value = false));
                      console.log(value);
                    }}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Center>Done</Center>
                    </Flex>
                  </Button>
                ) : (
                  <Button
                    w={"5em"}
                    me={"0.5em"}
                    colorScheme="facebook"
                    variant="outline"
                    size="xs"
                    onClick={(event: any) => {
                      updateValue((event.target.value = true));
                      console.log(value);
                    }}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Center>
                        <EditIcon />
                      </Center>
                      <Center ms={"0.5em"}>Edit</Center>
                    </Flex>
                  </Button>
                )}
                <Button
                  colorScheme={"red"}
                  size="xs"
                  onClick={() => {
                    data.shift();

                    console.log(data);
                  }}
                >
                  <Center>
                    <CloseIcon />
                  </Center>
                </Button>
              </Flex>
            );
          };
          return <EditableHandler />;
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
          <Heading size={["sm", "lg"]}>Daftar PIC Organisator</Heading>
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

export default DaftarOrganisatorHoME;
