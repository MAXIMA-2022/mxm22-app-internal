import {
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import LogoutSVG from '../public/logout.svg'

const Navbar = () => {
  return (
    <>
      <Box pos={'fixed'} width={'100%'} zIndex={1} bg={'#dee1e6'}>
        <Flex pr={4} pl={4} h={16} alignItems={'center'} justifyContent={'flex-end'}>
          <Button 
            bg={'white'} 
            borderRadius={'full'}
            _hover={{bgColor: 'blackAlpha.100'}}
            _focus={{boxShadow: 'none'}}
            zIndex={2}
          >
            <Text textColor={'#FF6B6B'} fontFamily={'rubik'} mr={3}>Keluar</Text>
            <Image src={LogoutSVG}/>
          </Button>
        </Flex>
      </Box>
    </> 
  );
}
 
export default Navbar;