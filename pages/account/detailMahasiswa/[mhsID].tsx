import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { 
  Box, 
  Flex, 
  Text, 
  FormLabel, 
  Input, 
  Button, 
  Select, 
  Textarea, 
  Center 
} from "@chakra-ui/react";
import MxmIconSVG from "../../../public/mxmIcon.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

interface DataMHS {
  name: string,
  nim: number,
  password: string,
  whatsapp: string,
  email: string,
  idInstagram: string,
  idLine: string,
  tanggalLahir: string,
  tempatLahir: string,
  jenisKelamin: string,
  prodi: string
}

const detailMahasiswa = ({mhsID}: {mhsID: string}) => {
  const jwt = useReadLocalStorage<string | undefined>('token')
  const [dataMhs, setDataMhs] = useState<DataMHS[]>([])

  useEffect(() => {
    try{
      const fetchMhs = async () => {
        const res = await axios.get(`${process.env.API_URL}/api/mhs/${mhsID}`, {
          headers: {
            'x-access-token': jwt!
          }
        })
        setDataMhs(res.data)
      }
      fetchMhs()
    } catch(err){
      console.log(err)
    }
  }, [])
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <Flex minH="100vh" bg={"#dee1e6"} ml={{ base: 0, lg: "240px" }} px={5} pt={"75px"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} bgColor={"white"} borderRadius={20} mb={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mx={4} borderBottom={"solid black"}>
            <Text fontSize={["15px", "25px", "25px", "25px"]} fontFamily="rubik" fontWeight={600} textColor={"black"}>
              Detail Mahasiswa
            </Text>
            <Flex p={"10px"}>
              <Image src={MxmIconSVG} width={"50px"} height={"50px"} />
            </Flex>
          </Flex>
          <Box py={4} mx={4}>
            {dataMhs.map((data: DataMHS) => (
              <Flex
                justifyContent={"space-between"} 
                mt={2} mb={"0.8em"} 
                flexDirection={["column"]}
              >
                <Box width={"100%"} px={2}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Nama Mahasiswa
                  </FormLabel>
                  <Input 
                    value={data.name} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Nomor Induk Mahasiswa
                  </FormLabel>
                  <Input 
                    value={data.nim} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Nomor Hp
                  </FormLabel>
                  <Input 
                    value={data.whatsapp} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Email
                  </FormLabel>
                  <Input 
                    value={data.email} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Instagram
                  </FormLabel>
                  <Input 
                    value={data.idInstagram} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Line
                  </FormLabel>
                  <Input 
                    value={data.idLine} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Jenis Kelamin
                  </FormLabel>
                  <Input 
                    value={data.jenisKelamin} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Tanggal Lahir
                  </FormLabel>
                  <Input 
                    value={data.tanggalLahir} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
                <Box width={"100%"} px={2} mt={[2]}>
                  <FormLabel 
                    textColor={"black"}
                  >
                    Prodi
                  </FormLabel>
                  <Input 
                    value={data.prodi} 
                    border={"solid"} 
                    borderColor={'#CBD5E0'} 
                    _hover={{border: 'solid #CBD5E0'}}
                    _focus={{border: 'solid #CBD5E0'}}
                    disabled={true}
                    _disabled={{
                      textColor: 'black',
                    }}
                  />
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

detailMahasiswa.getInitialProps = async ({query}: any) => {
  const { mhsID } = query;
  return {
    mhsID
  }
}
 
export default detailMahasiswa;