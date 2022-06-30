import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import { TableCell } from '@material-ui/core';
import { VStack } from '@chakra-ui/react';
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'


const tambahMedia = () => {
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
              Tambah Media HoME
            </Text>
            <Flex p={'10px'}>
              <Image src={MxmIconSVG} width={'50px'} height={'50px'}/>
            </Flex>
          </Flex>
          <Box
            py={4}
            mx={4}
          >
            <VStack spacing={3}>
              <FormControl>
                <FormLabel>Akun Organisator</FormLabel>
                <Select border={'solid'}/>
                <FormLabel>Link Media</FormLabel>
                <Input border={'solid'}/>
              </FormControl>
              <Flex w={'100%'} justifyContent={'right'}>
                  <Button borderRadius={'999px'} fontFamily={'rubik'}>SUBMIT</Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
 
export default tambahMedia;