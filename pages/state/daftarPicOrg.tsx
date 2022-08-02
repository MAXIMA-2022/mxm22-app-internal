import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
  Box,
  Flex,
  Text,
  Img
} from '@chakra-ui/react'
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import { TableCell } from '@material-ui/core';
import Image from 'next/image'
import MxmIconSVG from '../../public/mxmIcon.svg'

const listPIC = () => {
  interface DataPIC {
    //id: number,
    namePIC: String,
    nim: String,
    nameState: String
  }
  
  const dataPIC: DataPIC[] = [
    {
      namePIC: "William Chandra",
      nim: "34995",
      nameState: "Ultimagz"
    },
    {
      namePIC: "Tom Holland",
      nim: "34995",
      nameState: "Ultima Sonora"
    },
    {
      namePIC: "Cristiano Ronaldo",
      nim: "34995",
      nameState: "J-Cafe"
    },
    {
      namePIC: "Giannis Antetokoumpo",
      nim: "34995",
      nameState: "Mufomic"
    },
    {
      namePIC: "Bruce Wayne",
      nim: "34995",
      nameState: "The Batman"
    },
    {
      namePIC: "William Chandra",
      nim: "34995",
      nameState: "Ultimagz"
    },
    {
      namePIC: "Tom Holland",
      nim: "34995",
      nameState: "Ultima Sonora"
    },
    {
      namePIC: "Cristiano Ronaldo",
      nim: "34995",
      nameState: "J-Cafe"
    },
    {
      namePIC: "Giannis Antetokoumpo",
      nim: "34995",
      nameState: "Mufomic"
    },
    {
      namePIC: "William Chandra",
      nim: "34995",
      nameState: "Ultimagz"
    },
    {
      namePIC: "Tom Holland",
      nim: "34995",
      nameState: "Ultima Sonora"
    },
    {
      namePIC: "Cristiano Ronaldo",
      nim: "34995",
      nameState: "J-Cafe"
    },
    {
      namePIC: "Giannis Antetokoumpo",
      nim: "34995",
      nameState: "Mufomic"
    },
    {
      namePIC: "Bruce Wayne",
      nim: "34995",
      nameState: "The Batman"
    }
  ]
  
  const columnsPIC: MUIDataTableColumn[] = [
    {
      label: "PIC",
      name: 'namePIC',
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
      label: "STATE",
      name: 'nameState',
      options:{
        customHeadRender: ({index, ...column}) => {
          return(
            <TableCell key={index} style={{zIndex: -1}}>
              <b>{column.label}</b>
            </TableCell>
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
              columns={columnsPIC}
              data={dataPIC}
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
 
export default listPIC;