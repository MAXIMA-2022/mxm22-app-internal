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
import { CheckCircleIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useReadLocalStorage } from 'usehooks-ts'
import { useState, useEffect } from 'react'

const listAkun = () => {
  interface DataAkunOrg {
    name: String,
    nim: String,
    state: String,
    verifikasi: Boolean
  }

  const jwt = useReadLocalStorage<string | undefined>("token")
  const [org, setOrg] = useState<DataAkunOrg[]>([])

  useEffect(() => {
    try{
      const fetchOrg = async () => {
        const res = await axios.get(`${process.env.API_URL}/api/org`,{
          headers:{
            "x-access-token": jwt!
          }
        })
        setOrg(res.data)
        console.log(res.data)
      }
      fetchOrg()
    } catch(err: any){
      console.log(err)
    }
  }, [])

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
              data={org}
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