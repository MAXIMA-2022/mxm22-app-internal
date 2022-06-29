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

const TambahHoME: NextPage = () => {
  const Header = () => {
    return (
      <Flex justifyContent={"space-between"} p={["0", "1em 0"]}>
        <Center>
          <Heading size={["sm", "lg"]}>Tambah HoME</Heading>
        </Center>
        <Center>
          <MaximaIcon />
        </Center>
      </Flex>
    );
  };

  const HoMEForm = () => {
    function validateNamaOrganisasi(value) {
      let namaOrganisasiError;
      if (!value) {
        namaOrganisasiError = "Nama Organisasi tidak boleh kosong";
      }
      return namaOrganisasiError;
    }

    function validateKategori(value) {
      let kategoriError;
      if (!value) {
        kategoriError = "Kategori tidak boleh kosong";
      }
      return kategoriError;
    }

    function validateNarasiPendek(value) {
      let narasiPendekError;
      if (!value) {
        narasiPendekError = "Narasi Pendek tidak boleh kosong";
      }
      return narasiPendekError;
    }

    function validateNarasiPanjang(value) {
      let narasiPanjangError;
      if (!value) {
        narasiPanjangError = "Narasi Panjang tidak boleh kosong";
      }
      return narasiPanjangError;
    }

    function validateLinkLogo(value) {
      let linkLogoError;
      if (!value) {
        linkLogoError = "Link Logo tidak boleh kosong";
      }
      return linkLogoError;
    }

    function validateLinkYoutube(value) {
      let linkYoutubeError;
      if (!value) {
        linkYoutubeError = "Link Youtube tidak boleh kosong";
      }
      return linkYoutubeError;
    }

    function validateMedsosLine(value) {
      let medsosLineError;
      if (!value) {
        medsosLineError = "Line tidak boleh kosong";
      }
      return medsosLineError;
    }

    function validateMedsosInstagram(value) {
      let medsosInstagramError;
      if (!value) {
        medsosInstagramError = "Instagram tidak boleh kosong";
      }
      return medsosInstagramError;
    }

    return (
      <Formik
        initialValues={{ namaOrganisator: "", kategori: "", narasiPendek: "", narasiPanjang: "", linkLogo: "", linkYoutube: "", medsosLine: "", medsosInstagram: "" }}
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
                <Field name="namaOrganisator" validate={validateNamaOrganisasi}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.namaOrganisator && form.touched.namaOrganisator}>
                      <FormLabel htmlFor="namaOrganisator">
                        <b>Nama Organisasi</b>
                      </FormLabel>
                      <Input {...field} id="namaOrganisator" placeholder="" />
                      <FormErrorMessage>{form.errors.namaOrganisator}</FormErrorMessage>
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
              <Field name="narasiPendek" validate={validateNarasiPendek}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.narasiPendek && form.touched.narasiPendek}>
                    <FormLabel htmlFor="narasiPendek">
                      <b>Narasi Pendek</b>
                    </FormLabel>
                    <Input {...field} id="narasiPendek" placeholder="" />
                    <FormErrorMessage>{form.errors.narasiPendek}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="narasiPanjang" validate={validateNarasiPanjang}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.narasiPanjang && form.touched.narasiPanjang}>
                    <FormLabel htmlFor="narasiPanjang">
                      <b>Narasi Panjang</b>
                    </FormLabel>
                    <Textarea {...field} id="narasiPanjang" placeholder="" resize={"vertical"} />
                    <FormErrorMessage>{form.errors.narasiPanjang}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="linkLogo" validate={validateLinkLogo}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.linkLogo && form.touched.linkLogo}>
                    <FormLabel htmlFor="linkLogo">
                      <b>Link Logo</b>
                    </FormLabel>
                    <Input {...field} id="linkLogo" placeholder="" />
                    <FormErrorMessage>{form.errors.linkLogo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box w={"full"} mb={"1em"}>
              <Field name="linkYoutube" validate={validateLinkYoutube}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.linkYoutube && form.touched.linkYoutube}>
                    <FormLabel htmlFor="linkYoutube">
                      <b>Link Video Youtube</b>
                    </FormLabel>
                    <Input {...field} id="linkYoutube" placeholder="" />
                    <FormErrorMessage>{form.errors.linkYoutube}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Flex justifyContent={"space-between"} mb={"1em"}>
              <Box w={"full"}>
                <Field name="medsosLine" validate={validateMedsosLine}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.medsosLine && form.touched.medsosLine}>
                      <FormLabel htmlFor="medsosLine">
                        <b>Media Sosial (LINE)</b>
                      </FormLabel>
                      <Input {...field} id="medsosLine" placeholder="" />
                      <FormErrorMessage>{form.errors.medsosLine}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box w={"full"} ms={"1em"}>
                <Field name="medsosInstagram" validate={validateMedsosInstagram}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.medsosInstagram && form.touched.medsosInstagram}>
                      <FormLabel htmlFor="medsosInstagram">
                        <b>Medisa Sosial (Instagram)</b>
                      </FormLabel>
                      <Input {...field} id="medsosInstagram" placeholder="Tidak Perlu Menggunakan @" />
                      <FormErrorMessage>{form.errors.medsosInstagram}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
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
          <HoMEForm />
        </Box>
      </Layout>
    </Box>
  );
};

export default TambahHoME;
