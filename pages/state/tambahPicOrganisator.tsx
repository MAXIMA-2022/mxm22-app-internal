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
} from "@chakra-ui/react";

//importing chakra ui icons
import { EditIcon, CheckIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";

//importing Formik components
import { Formik, Form, Field } from "formik";

const TambahPICOrganisator: NextPage = () => {
  const Header = () => {
    return (
      <Flex justifyContent={"space-between"} p={["0", "1em 0"]}>
        <Center>
          <Heading size={["sm", "lg"]}>Tambah PIC</Heading>
        </Center>
        <Center>
          <MaximaIcon />
        </Center>
      </Flex>
    );
  };

  const TambahPICOrganisatorForm = () => {
    function validateAkunOrganisator(value) {
      let akunOrganisatorError;
      if (!value) {
        akunOrganisatorError = "Akun Organisator tidak boleh kosong";
      }
      return akunOrganisatorError;
    }

    function validateKegiatanSTATE(value) {
      let kegiatanSTATEError;
      if (!value) {
        kegiatanSTATEError = "Kegiatan STATE tidak boleh kosong";
      }
      return kegiatanSTATEError;
    }

    return (
      <Formik
        initialValues={{ akunOrganisator: "", kegiatanSTATE: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Box w={"full"} mb={"1em"}>
              <Field name="akunOrganisator" validate={validateAkunOrganisator}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.akunOrganisator && form.touched.akunOrganisator}>
                    <FormLabel htmlFor="akunOrganisator">
                      <b>Akun Organisator</b>
                    </FormLabel>
                    <Select {...field} id="akunOrganisator" placeholder="">
                      <option value=""></option>
                      <option value="1">Kategori 1</option>
                      <option value="2">Kategori 2</option>
                    </Select>
                    <FormErrorMessage>{form.errors.akunOrganisator}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="kegiatanSTATE" validate={validateKegiatanSTATE}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.kegiatanSTATE && form.touched.kegiatanSTATE}>
                    <FormLabel htmlFor="kegiatanSTATE">
                      <b>Kegiatan STATE</b>
                    </FormLabel>
                    <Select {...field} id="kegiatanSTATE" placeholder="">
                      <option value=""></option>
                      <option value="1">Kategori 1</option>
                      <option value="2">Kategori 2</option>
                    </Select>
                    <FormErrorMessage>{form.errors.kegiatanSTATE}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Flex justifyContent={"end"}>
              <Button mt={4} colorScheme={"gray"} color={"black"} isLoading={props.isSubmitting} type="submit" borderRadius={"full"}>
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
          <TambahPICOrganisatorForm />
        </Box>
      </Layout>
    </Box>
  );
};

export default TambahPICOrganisator;
