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
  Input,
  Button,
  Select,
  Textarea
} from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Dropzone from 'react-dropzone';
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'

const tambahHome = () => {
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
            <Flex>
              
            </Flex>
            <form>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <FormLabel textColor={'black'}>Nama Organisator</FormLabel>
                    <Input border={'solid'}/>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'}>Kategori</FormLabel>
                    <Select border={'solid'}/>
                  </Box>
              </Flex>
              <Box width={'100%'} px={2}>
                <FormLabel textColor={'black'}>Narasi Pendek</FormLabel>
                <Input border={'solid'}/>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={'black'} htmlFor='no_hp'>Narasi Panjang</FormLabel>
                <Textarea border={'solid'}/>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel>Link Logo</FormLabel>
                <Input border={'solid'}/>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel>Link Video Youtube</FormLabel>
                <Input border={'solid'}/>
              </Box>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <FormLabel textColor={'black'}>Media Sosial (LINE)</FormLabel>
                    <Input border={'solid'}/>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'}>Media Sosial (Instagram)</FormLabel>
                    <Input placeholder='Tidak Perlu Menggunakan @' border={'solid'}/>
                  </Box>
              </Flex>
              <Flex width={'100%'} px={2} mt={2} justifyContent={'right'}>
                  <Button w={100} borderRadius={'999px'} type="submit" textColor= 'black' bgColor={'green.200'} _hover={{bgColor: "yellow.200"}}>SUBMIT</Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
 
export default tambahHome;