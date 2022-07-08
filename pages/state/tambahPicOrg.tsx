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
import { useForm } from 'react-hook-form'

const tambahPIC = () => {
  const onSubmit = async (data)=>{}
  const { register, handleSubmit, formState:{errors} } = useForm()
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Akun Organisator</FormLabel>
                <Select {...register('akun_organisator', {required: "Akun organisator harap dipilih"})} name='akun_organisator' textColor={'black'} border={'solid'}/>
                {errors.akun_organisator !== undefined && <Text textColor={'red'}>{errors.akun_organisator.message}</Text>}
                <FormLabel>Kegiatan STATE</FormLabel>
                <Select {...register('kegiatan_state', {required: "Kegiatan STATE harap dipilih"})} name='kegiatan_state' textColor={'black'} border={'solid'}/>
                {errors.kegiatan_state !== undefined && <Text textColor={'red'}>{errors.kegiatan_state.message}</Text>}
              </FormControl>
              <Flex w={'100%'} justifyContent={'right'} py={3}>
                  <Button borderRadius={'999px'} type="submit" fontFamily={'rubik'}>SUBMIT</Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
 
export default tambahPIC;