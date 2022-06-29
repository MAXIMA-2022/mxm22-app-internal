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
  Switch,
  Image,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";

//importing Formik components
import { Formik, Form, Field } from "formik";

//importing react-dropzone components
import { useDropzone } from "react-dropzone";

const TambahSTATE: NextPage = () => {
  function DragAndDropFiles(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <Box>
        <Box border={"1px solid #d4d4d4"} w={"full"} h={"5em"} borderRadius={"0.5em"} {...getRootProps({ className: "dropzone" })}>
          <Input {...getInputProps()} />
        </Box>
        <aside>
          <UnorderedList>{files}</UnorderedList>
        </aside>
      </Box>
    );
  }

  const Header = () => {
    return (
      <Flex justifyContent={"space-between"} p={["0", "1em 0"]}>
        <Center>
          <Heading size={["sm", "lg"]}>Tambah STATE</Heading>
        </Center>
        <Center>
          <MaximaIcon />
        </Center>
      </Flex>
    );
  };

  const STATEForm = () => {
    function validateNamaSTATE(value) {
      let namaSTATEError;
      if (!value) {
        namaSTATEError = "Nama STATE tidak boleh kosong";
      }
      return namaSTATEError;
    }

    function validateKuota(value) {
      let kuotaError;
      if (!value) {
        kuotaError = "Kuota tidak boleh kosong";
      }
      return kuotaError;
    }

    function validateHariKegiatan(value) {
      let hariKegiatanError;
      if (!value) {
        hariKegiatanError = "Hari Kegiatan tidak boleh kosong";
      }
      return hariKegiatanError;
    }

    function validateKategori(value) {
      let kategoriError;
      if (!value) {
        kategoriError = "Kategori tidak boleh kosong";
      }
      return kategoriError;
    }

    function validateDeskripsiSingkat(value) {
      let deskripsiSingkatError;
      if (!value) {
        deskripsiSingkatError = "Deskripsi Singkat tidak boleh kosong";
      }
      return deskripsiSingkatError;
    }

    function validateLogo(value) {
      let logoError;
      if (!value) {
        logoError = "Logo tidak boleh kosong";
      }
      return logoError;
    }

    function validateFotoSampul(value) {
      let fotoSampulError;
      if (!value) {
        fotoSampulError = "Foto Sampul tidak boleh kosong";
      }
      return fotoSampulError;
    }

    return (
      <Formik
        initialValues={{ namaState: "", kuota: "", hariKegiatan: "", kategori: "", logo: "", fotoSampul: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Flex justifyContent={"space-between"} mb={"1em"}>
              <Box w={"full"}>
                <Field name="namaState" validate={validateNamaSTATE}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.namaState && form.touched.namaState}>
                      <FormLabel htmlFor="namaState">
                        <b>Nama STATE</b>
                      </FormLabel>
                      <Input {...field} id="namaState" placeholder="" />
                      <FormErrorMessage>{form.errors.namaState}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box w={"full"} ms={"1em"}>
                <Field name="kuote" validate={validateKuota}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.kuota && form.touched.kuota}>
                      <FormLabel htmlFor="kuota">
                        <b>Kuota</b>
                      </FormLabel>
                      <NumberInput min={0} {...field} id="kuota" placeholder="">
                        <NumberInputField id="amount" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{form.errors.kuota}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
            <Flex justifyContent={"space-between"} mb={"1em"}>
              <Box w={"full"}>
                <Field name="hariKegiatan" validate={validateHariKegiatan}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.hariKegiatan && form.touched.hariKegiatan}>
                      <FormLabel htmlFor="hariKegiatan">
                        <b>Hari Kegiatan</b>
                      </FormLabel>
                      <Input {...field} id="hariKegiatan" placeholder="" />
                      <FormErrorMessage>{form.errors.hariKegiatan}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box w={"full"} ms={"1em"}>
                <Field name="kategori" validate={validateKategori}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.kategori && form.touched.kategori}>
                      <FormLabel htmlFor="kategori">
                        <b>Kategori</b>
                      </FormLabel>
                      <Select {...field} id="kategori" placeholder="">
                        <option value=""></option>
                        <option value="1">Kategori 1</option>
                        <option value="2">Kategori 2</option>
                      </Select>
                      <FormErrorMessage>{form.errors.kategori}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
            <Box w={"full"} mb={"1em"}>
              <Field name="deskripsiSingkat" validate={validateDeskripsiSingkat}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.deskripsiSingkat && form.touched.deskripsiSingkat}>
                    <FormLabel htmlFor="deskripsiSingkat">
                      <b>Deskripsi Singkat</b>
                    </FormLabel>
                    <Input {...field} id="deskripsiSingkat" placeholder="" />
                    <FormErrorMessage>{form.errors.deskripsiSingkat}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="logo">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor="logo">
                      <b>Logo</b>
                    </FormLabel>
                    <DragAndDropFiles />
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="fotoSampul">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor="logo">
                      <b>Foto Sampul</b>
                    </FormLabel>
                    <DragAndDropFiles />
                  </FormControl>
                )}
              </Field>
            </Box>
            <Flex justifyContent={"end"}>
              <Button mt={4} colorScheme={"whatsapp"} color={"black"} isLoading={props.isSubmitting} type="submit" borderRadius={"full"}>
                SUBMIT
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Box>
      <Layout>
        <Box m={"4.5em 8.5em"} backgroundColor={"black"} display={["none", "none", "block"]}></Box>
        <Box w={"full"} backgroundColor={"#ffffff"} m={{ base: "4.5em 1em", md: "4.5em 1.3em" }} p={["1rem", "1.5em"]} borderRadius={"1em"}>
          <Header />
          <Divider my={"1em"} borderColor={"black"} borderWidth={"0.1em"} />
          <STATEForm />
        </Box>
      </Layout>
    </Box>
  );
};

export default TambahSTATE;
