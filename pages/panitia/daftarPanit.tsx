import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Switch
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables"
import { CheckCircleIcon } from '@chakra-ui/icons'
import { TableCell } from '@material-ui/core'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { EditIcon } from '@chakra-ui/icons'

const DaftarPanit = () => {
  interface DataPanit {
    name: String,
    nim: String,
    divisi: String,
    verifikasi: Boolean
  }

  const dataPanit: DataPanit[] = [
    {
      name: "William Chandra",
      nim: "34995",
      divisi: "Rocuta",
      verifikasi: true
    },
    {
      name: "Naufal",
      nim: "34991",
      divisi: "Rocuta",
      verifikasi: true
    },
    {
      name: "Anastasius Raditya",
      nim: "34991",
      divisi: "Rocuta",
      verifikasi: true
    },
    {
      name: "Tesalonika Abigail",
      nim: "34111",
      divisi: "Rocuta",
      verifikasi: true
    },
    {
      name: "Do Kwon",
      nim: "34915",
      divisi: "Cerberus",
      verifikasi: false
    },
    {
      name: "Fareza",
      nim: "34444",
      divisi: "Griffin",
      verifikasi: false
    }
  ]

  const columnsPanit: MUIDataTableColumn[] = [
    {
      label: "Nama Panitia",
      name: 'name',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        },
        customBodyRender: (value:any, tableMeta:any) => {
          return(
            <HStack>
              <Text>{value}</Text>
              {tableMeta.rowData[3] === true ? 
                <CheckCircleIcon w={4} h={4} color={'green.500'}/>
              :
                <></>
              }
            </HStack>
          )
        }
      }
    },
    {
      label: "NIM",
      name: "nim",
      options:{
        filter: true,
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
      label: "Divisi",
      name: "divisi",
      options:{
        filter: true,
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
      label: "Verifikasi",
      name: "verifikasi",
      options:{
        filter: true,
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        },
        customBodyRender: (value: any, tableMeta: any) => {
          return(
            <Flex w={'60px'} justifyContent={{base: 'none', lg: 'center'}}>
              <form>
                {value === true ?
                  <Switch 
                    colorScheme={'blue'} 
                    borderRadius={'full'} 
                    bg={'gray.500'}   
                    isChecked                
                  />
                :
                  <Switch 
                    colorScheme={'blue'} 
                    borderRadius={'full'} 
                    bg={'gray.500'}                 
                  />
                }
              </form>
            </Flex>
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
              Daftar Panitia
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
              columns={columnsPanit}
              data={dataPanit}
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
  );
}
 
export default DaftarPanit;