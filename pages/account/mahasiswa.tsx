import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Button,
  HStack
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables"
import { TableCell } from '@material-ui/core'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { EditIcon } from '@chakra-ui/icons'

const DaftarMHS = () => {
  interface DataMHS {
    name: String,
    nim: String,
    email: String
  }
  
  const dataMHS: DataMHS[] = [
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    },
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    },
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    },
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    },
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    },
    {
      name: "William Chandra",
      nim: "34995",
      email: "william.chandra@student.umn.ac.id"
    }
  ]

  const columnsMHS: MUIDataTableColumn[] = [
    {
      label: "Nama Mahasiswa",
      name: 'name',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        }
      }
    },
    {
      label: "NIM",
      name: 'nim',
      options:{
        display: false,
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        }
      }
    },
    {
      label: "Alamat Email",
      name: 'email',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        }
      }
    },
    {
      label: "Pengaturan",
      name: 'action',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        },
        customBodyRender: (value) => {
          return(
            <HStack spacing={2}>
              <Button
                size={'xs'}
                leftIcon={<EditIcon/>}
                bgColor="white"
                color={'#163161'}
                border={'1px'}
                borderColor={'#163161'}
              >
                Edit
              </Button>
            </HStack>
          )
        }
      }
    }
  ]
  
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
              Daftar Mahasiswa
            </Text>
            <Flex p={'10px'}>
              <Image src={MxmIconSVG} width={'50px'} height={'50px'}/>
            </Flex>
          </Flex>
          <Box
            py={4}
            mx={4}
          >
            <MUIDataTable
              title=""
              columns={columnsMHS}
              data={dataMHS}
              options={{
                rowsPerPage: 5,
                selectableRows: 'none',
                elevation: 1
              }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  )
}
 
export default DaftarMHS;