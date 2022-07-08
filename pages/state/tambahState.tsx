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
  UnorderedList,
  Center
} from '@chakra-ui/react'
import Link from 'next/link';
import { useDropzone } from 'react-dropzone'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form';

const tambahState = () => {
  const onSubmit = async (data)=>{}
  const { register, handleSubmit, formState:{errors} } = useForm()
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <FormLabel textColor={'black'}>Nama STATE</FormLabel>
                    <Input {...register('nama_state', {required: "Nama STATE harap diisi"})} type={'text'} name='nama_state' textColor={'black'} border={'solid'}/>
                    {errors.nama_state !== undefined && <Text textColor={'red'}>{errors.nama_state.message}</Text>}
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'}>Kuota</FormLabel>
                    <Input {...register('kuota', {required: "Kuota harap diisi", min: {value: 1, message: "Kuota tidak boleh ≤ 0"}, max: {value: 100, message: "Kuota tidak boleh lebih dari 100"}})} type={'number'} name='kuota' textColor={'black'} border={'solid'}/>
                    {errors.kuota !== undefined && <Text textColor={'red'}>{errors.kuota.message}</Text>}
                  </Box>
              </Flex>
              <Flex justifyContent={'space-between'} mt={2} flexDirection={['column', 'column', 'row', 'row']}>
                  <Box width={'100%'} px={2}>
                    <FormLabel textColor={'black'} placeholder='Pilih Hari Pelaksanaan STATE'>Hari Kegiatan</FormLabel>
                    <Select {...register('hari_state', {required: "Hari kegiatan harap dipilih"})} name='hari_state' textColor={'black'} border={'solid'}/>
                    {errors.hari_state !== undefined && <Text textColor={'red'}>{errors.hari_state.message}</Text>}
                  </Box>
                  <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                    <FormLabel textColor={'black'} placeholder='Pilih Kategori STATE'>Kategori</FormLabel>
                    <Select {...register('kategori', {required: "Kategori harap dipilih"})} name='kategori' textColor={'black'} border={'solid'}/>
                    {errors.kategori !== undefined && <Text textColor={'red'}>{errors.kategori.message}</Text>}
                  </Box>
              </Flex>
              <Box width={'100%'} px={2}>
                <FormLabel textColor={'black'}>Deskripsi Singkat</FormLabel>
                <Textarea {...register('deskripsi_singkat', {required: "Deskripsi singkat harap diisi"})} name='deskripsi_singkat' textColor={'black'} border={'solid'}/>
                {errors.deskripsi_singkat !== undefined && <Text textColor={'red'}>{errors.deskripsi_singkat.message}</Text>}
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel textColor={'black'}>Logo</FormLabel>
                <Box padding={"1em"} border={"solid #e2e8f0"} width={"100%"} height={"100%"} borderRadius={10}>
                  <DragAndDropFiles {...register('logo', {required: "Logo harap diisi"})} name='logo' />
                </Box>
                {errors.logo !== undefined && <Text textColor={'red'}>{errors.logo.message}</Text>}
              </Box>
              <Box width={'100%'} px={2} mt={[2, 2, 0, 0]}>
                <FormLabel>Foto Sampul</FormLabel>
                <Box padding={"1em"} border={"solid #e2e8f0"} width={"100%"} height={"100%"} borderRadius={10}>
                  <DragAndDropFiles {...register('foto_sampul', {required: "Foto sampul harap diisi"})} name='foto_sampul'/>
                </Box>
                {errors.foto_sampul !== undefined && <Text textColor={'red'}>{errors.foto_sampul.message}</Text>}
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