import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Avatar,
  Img,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Dropzone from 'react-dropzone';
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { Formik, Form, Field } from "formik";

const tambahHome = () => {
  function validateNamaOrganisasi(value: any) {
    let namaOrganisasiError;
    if (!value) {
      namaOrganisasiError = "Nama Organisasi tidak boleh kosong";
    }
    return namaOrganisasiError;
  }

  function validateKategori(value: any) {
    let kategoriError;
    if (!value) {
      kategoriError = "Kategori tidak boleh kosong";
    }
    return kategoriError;
  }

  function validateNarasiPendek(value: any) {
    let narasiPendekError;
    if (!value) {
      narasiPendekError = "Narasi Pendek tidak boleh kosong";
    }
    return narasiPendekError;
  }

  function validateNarasiPanjang(value: any) {
    let narasiPanjangError;
    if (!value) {
      narasiPanjangError = "Narasi Panjang tidak boleh kosong";
    }
    return narasiPanjangError;
  }

  function validateLinkLogo(value: any) {
    let linkLogoError;
    if (!value) {
      linkLogoError = "Link Logo tidak boleh kosong";
    }
    return linkLogoError;
  }

  function validateLinkYoutube(value: any) {
    let linkYoutubeError;
    if (!value) {
      linkYoutubeError = "Link Youtube tidak boleh kosong";
    }
    return linkYoutubeError;
  }

  function validateMedsosLine(value: any) {
    let medsosLineError;
    if (!value) {
      medsosLineError = "Line tidak boleh kosong";
    }
    return medsosLineError;
  }

  function validateMedsosInstagram(value: any) {
    let medsosInstagramError;
    if (!value) {
      medsosInstagramError = "Instagram tidak boleh kosong";
    }
    return medsosInstagramError;
  }

  return ( 
    <>
      <Navbar/>
      <Sidebar/>
      <Flex
        minH="100vh" 
        bg={'#dee1e6'} 
        ml={{base: 0, lg: '240px'}}
        px={5}
        pt={'75px'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          w={'full'}
          bgColor={'white'}
          borderRadius={20}
          mb={4}
        >
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            mx={4}
            borderBottom={'solid black'}
          >
            <Text 
              fontSize={["15px", "25px", "25px", "25px"]} 
              fontFamily="rubik"
              fontWeight={600}
              textColor={'black'}
            >
              Tambah HoME
            </Text>
            <Flex p={'10px'}>
              <Image src={MxmIconSVG} width={'50px'} height={'50px'}/>
            </Flex>
          </Flex>
          <Box
            py={4}
            mx={4}
          >
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
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <Field name="namaOrganisator" validate={validateNamaOrganisasi}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.namaOrganisator && form.touched.namaOrganisator}>
                        <FormLabel htmlFor="namaOrganisator" textColor={'black'}>
                          Nama Organisasi
                        </FormLabel>
                        <Input border={"solid"} {...field} id="namaOrganisator" placeholder="" />
                        <FormErrorMessage>{form.errors.namaOrganisator}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <Field name="kategori" validate={validateKategori}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.kategori && form.touched.kategori}>
                          <FormLabel htmlFor="kategori" textColor={'black'}>
                            Kategori
                          </FormLabel>
                          <Select border={"solid"} {...field} id="kategori" placeholder="">
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
              <Box width={'100%'} px={2}>
                <Field name="narasiPendek" validate={validateNarasiPendek}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.narasiPendek && form.touched.narasiPendek}>
                      <FormLabel htmlFor="narasiPendek" textColor={"black"}>
                        Narasi Pendek
                      </FormLabel>
                      <Input border={"solid"} {...field} id="narasiPendek" />
                      <FormErrorMessage>{form.errors.narasiPendek}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
              <Field name="narasiPanjang" validate={validateNarasiPanjang}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.narasiPanjang && form.touched.narasiPanjang}>
                    <FormLabel htmlFor="narasiPanjang">
                      <b>Narasi Panjang</b>
                    </FormLabel>
                    <Textarea border={"solid"} {...field} id="narasiPanjang" resize={"vertical"} />
                    <FormErrorMessage>{form.errors.narasiPanjang}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <Field name="linkLogo" validate={validateLinkLogo}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.linkLogo && form.touched.linkLogo}>
                      <FormLabel htmlFor="linkLogo" textColor={"black"}>
                        Link Logo
                      </FormLabel>
                      <Input border={"solid"} {...field} id="linkLogo"/>
                      <FormErrorMessage>{form.errors.linkLogo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <Field name="linkYoutube" validate={validateLinkYoutube}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.linkYoutube && form.touched.linkYoutube}>
                      <FormLabel htmlFor="linkYoutube" textColor={"black"}>
                        Link Video Youtube
                      </FormLabel>
                      <Input border={"solid"} {...field} id="linkYoutube" />
                      <FormErrorMessage>{form.errors.linkYoutube}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <Field name="medsosLine" validate={validateMedsosLine}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.medsosLine && form.touched.medsosLine}>
                          <FormLabel htmlFor="medsosLine" textColor={"black"}>
                            Media Sosial (LINE)
                          </FormLabel>
                          <Input border={"solid"} {...field} id="medsosLine" />
                          <FormErrorMessage>{form.errors.medsosLine}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                  <Field name="medsosInstagram" validate={validateMedsosInstagram}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.medsosInstagram && form.touched.medsosInstagram}>
                        <FormLabel htmlFor="medsosInstagram" textColor={"black"}>
                          Medisa Sosial (Instagram)
                        </FormLabel>
                        <Input border={"solid"} {...field} id="medsosInstagram" placeholder="Tidak Perlu Menggunakan @" />
                        <FormErrorMessage>{form.errors.medsosInstagram}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  </Box>
              </Flex>
              <Flex width={'100%'} px={2} mt={2} justifyContent={'right'}>
                  <Button w={100} borderRadius={'999px'} type="submit" textColor= 'black' bgColor={'green.200'} _hover={{bgColor: "yellow.200"}} isLoading={props.isSubmitting}>SUBMIT</Button>
              </Flex>
            </Form>
            )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default tambahHome;