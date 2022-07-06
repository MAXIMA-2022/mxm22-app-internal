import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Avatar,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Select
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import { TableCell } from '@material-ui/core';
import { VStack } from '@chakra-ui/react';
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { Formik, Form, Field } from "formik";

const tambahPIC = () => {
  function validateAkunOrganisator(value: any) {
    let akunOrganisatorError;
    if (!value) {
      akunOrganisatorError = "Akun Organisator tidak boleh kosong";
    }
    return akunOrganisatorError;
  }

  function validateKegiatanSTATE(value: any) {
    let kegiatanSTATEError;
    if (!value) {
      kegiatanSTATEError = "Kegiatan STATE tidak boleh kosong";
    }
    return kegiatanSTATEError;
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
                  Tambah PIC
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
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.akunOrganisator && form.touched.akunOrganisator}>
                    <FormLabel htmlFor="akunOrganisator">
                      <b>Akun Organisator</b>
                    </FormLabel>
                    <Select border={"solid"} {...field} id="akunOrganisator" placeholder="">
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
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.kegiatanSTATE && form.touched.kegiatanSTATE}>
                    <FormLabel htmlFor="kegiatanSTATE">
                      <b>Kegiatan STATE</b>
                    </FormLabel>
                    <Select border={"solid"} {...field} id="kegiatanSTATE" placeholder="">
                      <option value=""></option>
                      <option value="1">Kategori 1</option>
                      <option value="2">Kategori 2</option>
                    </Select>
                    <FormErrorMessage>{form.errors.kegiatanSTATE}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Flex w={'100%'} justifyContent={'right'} >
              <Button borderRadius={'999px'} fontFamily={'rubik'} isLoading={props.isSubmitting} type="submit">SUBMIT</Button>
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

export default tambahPIC;