import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Flex, Text, Avatar, FormControl, FormLabel, FormErrorMessage, Input, Button, Select, Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, UnorderedList, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import MxmIconSVG from "../../public/mxmIcon.svg";
import Image from "next/image";
import { Formik, Form, Field } from "formik";

const tambahState = () => {
  const DragAndDropFiles = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <Box>
        <Box border={"dashed #e2e8f0"} width={"100%"} height={"5em"} borderRadius={10} {...getRootProps({ className: "dropzone" })} p={"0"}>
          <Center>
            <input {...getInputProps()} />
          </Center>
        </Box>
        <aside>
          <UnorderedList>{files}</UnorderedList>
        </aside>
      </Box>
    );
  };

  function validateNamaSTATE(value: any) {
    let namaSTATEError;
    if (!value) {
      namaSTATEError = "Nama STATE tidak boleh kosong";
    }
    return namaSTATEError;
  }

  function validateKuota(value: any) {
    let kuotaError;
    if (!value) {
      kuotaError = "Kuota tidak boleh kosong";
    }
    return kuotaError;
  }

  function validateHariKegiatan(value: any) {
    let hariKegiatanError;
    if (!value) {
      hariKegiatanError = "Hari Kegiatan tidak boleh kosong";
    }
    return hariKegiatanError;
  }

  function validateKategori(value: any) {
    let kategoriError;
    if (!value) {
      kategoriError = "Kategori tidak boleh kosong";
    }
    return kategoriError;
  }

  function validateDeskripsiSingkat(value: any) {
    let deskripsiSingkatError;
    if (!value) {
      deskripsiSingkatError = "Deskripsi Singkat tidak boleh kosong";
    }
    return deskripsiSingkatError;
  }

  function validateLogo(value: any) {
    let logoError;
    if (!value) {
      logoError = "Logo tidak boleh kosong";
    }
    return logoError;
  }

  function validateFotoSampul(value: any) {
    let fotoSampulError;
    if (!value) {
      fotoSampulError = "Foto Sampul tidak boleh kosong";
    }
    return fotoSampulError;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Tambah STATE
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
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
                <Flex justifyContent={"space-between"} mt={2} flexDirection={["column", "column", "row", "row"]}>
                  <Box width={"100%"} px={2}>
                    <Field name="namaState" validate={validateNamaSTATE}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.namaState && form.touched.namaState}>
                        <FormLabel htmlFor="namaState" textColor={"black"}>
                          Nama STATE
                        </FormLabel>
                        <Input border={"solid"} {...field} id="namaState" placeholder="" />
                        <FormErrorMessage>{form.errors.namaState}</FormErrorMessage>
                      </FormControl>
                    )}
                    </Field>
                  </Box>
                  <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                    <Field name="kuote" validate={validateKuota}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.kuota && form.touched.kuota}>
                          <FormLabel htmlFor="kuota" textColor={"black"}>
                            Kuota
                          </FormLabel>
                          <NumberInput min={0}  id="kuota" >
                            <NumberInputField {...field} border={"solid"} id="kuota" placeholder="0"/>
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
                <Flex justifyContent={"space-between"} mt={2} flexDirection={["column", "column", "row", "row"]}>
                  <Box width={"100%"} px={2}>
                    <Field name="hariKegiatan" validate={validateHariKegiatan}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.hariKegiatan && form.touched.hariKegiatan}>
                          <FormLabel htmlFor="hariKegiatan" textColor={"black"}>
                            Hari Kegiatan
                          </FormLabel>
                          <Select border={"solid"} {...field} id="hariKegiatan">
                            <option value="">Pilih Hari Kegiatan</option>
                            <option value="1">Kategori 1</option>
                            <option value="2">Kategori 2</option>
                          </Select>
                          <FormErrorMessage>{form.errors.hariKegiatan}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <Field name="kategori" validate={validateKategori}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.kategori && form.touched.kategori}>
                        <FormLabel htmlFor="kategori" textColor={"black"}>
                          Kategori
                        </FormLabel>
                        <Select border={"solid"} {...field} id="kategori" placeholder="">
                          <option value="">Pilih Kategori STATE</option>
                          <option value="1">Kategori 1</option>
                          <option value="2">Kategori 2</option>
                        </Select>
                        <FormErrorMessage>{form.errors.kategori}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </Box>
                </Flex>
                <Box width={"100%"} px={2}>
                  <Field name="deskripsiSingkat" validate={validateDeskripsiSingkat}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.deskripsiSingkat && form.touched.deskripsiSingkat}>
                        <FormLabel htmlFor="deskripsiSingkat" textColor={"black"}>
                          Deskripsi Singkat
                        </FormLabel>
                        <Textarea border={"solid"} {...field} id="deskripsiSingkat" />
                        <FormErrorMessage>{form.errors.deskripsiSingkat}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel textColor={"black"}>Logo</FormLabel>
                  <Box padding={"1em"} border={"solid #e2e8f0"} width={"100%"} height={"100%"} borderRadius={10}>
                    <DragAndDropFiles />
                  </Box>
                </Box>
                <Box width={"100%"} px={2} mt={[2, 2, 0, 0]}>
                  <FormLabel>Foto Sampul</FormLabel>
                  <Box padding={"1em"} border={"solid #e2e8f0"} width={"100%"} height={"100%"} borderRadius={10}>
                    <DragAndDropFiles />
                  </Box>
                </Box>
                <Flex width={"100%"} px={2} mt={2} justifyContent={"right"}>
                  <Button w={100} borderRadius={"999px"} type="submit" textColor="black" bgColor={"green.200"} _hover={{ bgColor: "yellow.200" }} isLoading={props.isSubmitting}>
                    SUBMIT
                  </Button>
                </Flex>
              </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default tambahState;
