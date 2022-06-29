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
  Stack,
} from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon, InfoOutlineIcon } from "@chakra-ui/icons";

//importing MUI data tables
import MUIDataTable from "mui-datatables";
import { TableCell, FormControlLabel } from "@material-ui/core";
import { MUIDataTableColumn } from "mui-datatables";
import { render } from "react-dom";

const DaftarSTATE: NextPage = () => {
  interface DaftarSTATE {
    shift(): void;
    namaSTATE: String;
    kuota: Number;
    kodePresensi: String;
    pengaturan: Boolean;
  }

  const [data]: DaftarSTATE[] = useState([
    { namaSTATE: "UMN Band", kuota: 101, kodePresensi: "ABS102", pengaturan: false },
    { namaSTATE: "Skystar Venture", kuota: 95, kodePresensi: "SKY280", pengaturan: false },
    { namaSTATE: "J-Cafe", kuota: 129, kodePresensi: "WIBU891", pengaturan: false },
    { namaSTATE: "Jurnalistik", kuota: 70, kodePresensi: "FILM21", pengaturan: false },
  ]);

  const columns: MUIDataTableColumn[] = [
    {
      label: "Nama STATE",
      name: "namaSTATE",
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
              {tableMeta.rowData[3] ? (
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
      label: "Kuota Terisi",
      name: "kuota",
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
              {tableMeta.rowData[3] ? (
                <Editable defaultValue={value} isPreviewFocusable={true}>
                  <EditablePreview />
                  &nbsp;/ 200
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              ) : (
                <Editable defaultValue={value} isPreviewFocusable={false}>
                  <EditablePreview />
                  &nbsp;/ 200
                  <Input as={EditableInput} onChange={(event) => updateValue(event.target.value)} />
                </Editable>
              )}
            </>
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[3] ? (
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
              <Stack spacing={2} direction={["column", "row"]}>
                {value ? (
                  <ButtonGroup>
                    <Button w={["auto", "6em"]} colorScheme="facebook" size="xs" onClick={(event: any) => {}}>
                      <Flex justifyContent={"space-between"}>
                        <Center>
                          <InfoOutlineIcon fontVariant={"outline"} />
                        </Center>
                        <Center ms={"0.5em"}>Detail</Center>
                      </Flex>
                    </Button>
                    <Button
                      w={["auto", "5em"]}
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
                  </ButtonGroup>
                ) : (
                  <ButtonGroup>
                    <Button w={["auto", "6em"]} colorScheme="facebook" size="xs" onClick={(event: any) => {}}>
                      <Flex justifyContent={"space-between"}>
                        <Center>
                          <InfoOutlineIcon fontVariant={"outline"} />
                        </Center>
                        <Center ms={"0.5em"}>Detail</Center>
                      </Flex>
                    </Button>
                    <Button
                      w={["auto", "5em"]}
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
                  </ButtonGroup>
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
              </Stack>
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
          <Heading size={["sm", "lg"]}>Daftar STATE</Heading>
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

export default DaftarSTATE;
