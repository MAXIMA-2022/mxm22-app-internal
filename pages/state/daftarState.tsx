import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Button,
  CloseButton,
  HStack
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables"
import { TableCell, TableRow } from '@material-ui/core'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { EditIcon, InfoOutlineIcon } from '@chakra-ui/icons'

export const getStaticProps = async ()=>{
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()
  return {
    props: {
      dataSTATE: data
    }
  }
}

const listSTATE = ({dataSTATE}: any) => {
  // interface DataSTATE {
  //   name: String,
  //   registered: String,
  //   quota: String,
  //   kodePresensi: String,
  // }
  
  // const dataSTATE: DataSTATE[] = [
  //   {
  //     name: "Mufomic",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "SDF670",
  //   },
  //   {
  //     name: "Lions",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "ABC170",
  //   },
  //   {
  //     name: "Rencang",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "RTH270",
  //   },
  //   {
  //     name: "YouTube",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "DSC470",
  //   },
  //   {
  //     name: "Instagram",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "WRE770",
  //   },
  //   {
  //     name: "Mufomic",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "DDD670",
  //   },
  //   {
  //     name: "Lions",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "ZCX170",
  //   },
  //   {
  //     name: "Rencang",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "CVX270",
  //   },
  //   {
  //     name: "YouTube",
  //     registered: "100",
  //     quota: "200",
  //     kodePresensi: "PIN470",
  //   },
  //   {
  //     name: "Instagram",
  //     registered: "10",
  //     quota: "200",
  //     kodePresensi: "KIP770",
  //   },
  // ]
  
  const columnsSTATE: MUIDataTableColumn[] = [
    {
      label: "Nama STATE",
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
      label: "kuota",
      name: 'quota',
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
      label: "Kuota Terisi",
      name: 'registered',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
          )
        },
        customBodyRender: (value: any, tableMeta: any) => {
          return(
            <Text>
              {value} / {tableMeta.rowData[1]}
            </Text>
          )
        }
      }
    },
    {
      label: "Kode Presensi",
      name: 'kodePresensi',
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
              <Text w={'160px'} textAlign={'center'}>
                <b>{column.label}</b>
              </Text>
            </TableCell>
          )
        },
        customBodyRender: (value: any, tableMeta: any) => {
          return(
            <HStack spacing={2}>
                  <Link href={"daftarState/" + tableMeta.rowData[0]}>
                    <Button
                      size="xs"
                      leftIcon={<InfoOutlineIcon/>}
                      color="white"
                      bgColor={'#163161'}
                      _hover={{bgColor: '#1a4173'}}
                    >
                      Detail
                    </Button>
                  </Link>
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
              <CloseButton
                size="sm"
                color="white"
                bgColor={'#bd0017'}
                _hover={{bgColor: '#d01c1f'}}
              />
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
              Daftar STATE
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
              columns={columnsSTATE}
              data={dataSTATE}
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
 
export default listSTATE;