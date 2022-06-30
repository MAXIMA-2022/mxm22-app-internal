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
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import Link from 'next/link';
import Dropzone from 'react-dropzone'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'


const tambahState = () => {
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
              Tambah STATE
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
                    <FormLabel textColor={'black'}>Nama STATE</FormLabel>
                    <Input border={'solid'}/>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'}>Kuota</FormLabel>
                    <NumberInput defaultValue={0}>
                      <NumberInputField border={'solid'}/>
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
              </Flex>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <FormLabel textColor={'black'} placeholder='Pilih Hari Pelaksanaan STATE'>Hari Kegiatan</FormLabel>
                    <Select border={'solid'}/>
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'} placeholder='Pilih Kategori STATE'>Kategori</FormLabel>
                    <Select border={'solid'}/>
                  </Box>
              </Flex>
              <Box width={'100%'} px={2}>
                <FormLabel textColor={'black'}>Deskripsi Singkat</FormLabel>
                <Textarea border={'solid'}/>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={'black'}>Logo</FormLabel>
                <Box border={'solid'} borderRadius={10}>
                  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                      <Flex border={'1px'} borderColor={'gray.200'} {...getRootProps()} h={20} borderRadius={10}>
                        <input type={'file'} {...getInputProps()} accept={"image/*"}/>
                      </Flex>
                    )}
                  </Dropzone>
                </Box>
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel>Foto Sampul</FormLabel>
                <Box border={'solid'} borderRadius={10}>
                  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                      <Flex border={'1px'} borderColor={'gray.200'} {...getRootProps()} h={20} borderRadius={10}>
                          <input type={'file'} {...getInputProps()} accept={"image/*"}/>
                      </Flex>
                    )}
                  </Dropzone>
                </Box>
              </Box>
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
 
export default tambahState;