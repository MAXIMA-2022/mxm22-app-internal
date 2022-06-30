import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Text
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import { TableCell } from '@material-ui/core';
import { EditIcon } from '@chakra-ui/icons';

const listOrganisator = () => {
  interface DataORGHome {
    name: String,
    kategori: String,
  }
  
  const dataORGHome: DataORGHome[] = [
    {
      name: "Bank Sampah",
      kategori: "UKM Sampah",
    },
    {
      name: "Duta Anti Narkoba",
      kategori: "UKM Narkoba",
    },
    {
      name: "Kompas Corner",
      kategori: "UKM Nongkrong",
    },
    {
      name: "Teater Katak",
      kategori: "UKM Drama Musikal",
    },
    {
      name: "Game Development Club",
      kategori: "UKM GG Gaming",
    }
  ]

  const columnORGHome: MUIDataTableColumn[] = [
    {
      label: "Nama Organisator",
      name: "name",
      options:{
        filter: true,
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              {column.label}
            </TableCell>
          )
        }
      }
    },
    {
      label: "Kategori",
      name: "kategori",
      options:{
        filter: true,
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              {column.label}
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
              <Text>
                <b>{column.label}</b>
              </Text>
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
              Daftar PIC Organisator
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
              columns={columnORGHome}
              data={dataORGHome}
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
 
export default listOrganisator;