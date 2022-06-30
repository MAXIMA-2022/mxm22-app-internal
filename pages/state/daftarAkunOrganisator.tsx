import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  HStack,
  Switch,
  Text,
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables"
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { TableCell } from '@material-ui/core'
import { EditIcon, CheckCircleIcon } from '@chakra-ui/icons'

const listAkun = () => {
  interface DataAkunOrg {
    name: String,
    nim: String,
    state: String,
    verifikasi: Boolean
  }

  const dataAkunOrg: DataAkunOrg[] = [
    {
      name: "William",
      nim: "34995",
      state: "Bank Sampah",
      verifikasi: false
    },
    {
      name: "Doodles",
      nim: "34995",
      state: "Duta Anti Narkoba",
      verifikasi: true
    },
    {
      name: "Bruce",
      nim: "34995",
      state: "Kompas Corner",
      verifikasi: false
    },
    {
      name: "Uzumaki Naruto",
      nim: "34995",
      state: "Teater Katak",
      verifikasi: false
    },
    {
      name: "Terra Luna",
      nim: "34995",
      state: "Game Development Club",
      verifikasi: true
    }
  ]

  const columnAkunORG: MUIDataTableColumn[] = [
    {
      label: "Nama Mahasiswa",
      name: "name",
      options:{
        filter: true,
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
      label: "Kegiatan STATE",
      name: "state",
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
              Daftar Akun Organisator
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
              columns={columnAkunORG}
              data={dataAkunOrg}
              options={{
                rowsPerPage: 5,
                selectableRows: 'none',
                elevation: 0
              }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
 
export default listAkun;