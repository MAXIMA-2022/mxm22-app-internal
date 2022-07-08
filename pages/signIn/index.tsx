import {
    Flex, Text, Box, Button, HStack, Link, Select,
    Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, FormControl, FormLabel
} from '@chakra-ui/react'
import MxmIconSVG from '../../public/mxmIcon.svg'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'  
import {useEffect, useState} from 'react'

const signIn = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const onSubmit = async (data)=>{}
    return ( 
        <>
        <Flex border={'solid'} minH={'100vh'} justifyContent={'center'} alignItems={'center'} bgGradient={'linear(to-r, #bd0116, #f74f24)'}>
            <Flex height={'500px'} width={'400px'} borderRadius={25} boxShadow={'2xl'} bgColor={'#fff'} justifyContent={'center'} alignItems={'center'}>
                <VStack>
                    <Flex border={'solid'} width={'400px'} px={5}>
                        <HStack>
                            <Image src={MxmIconSVG} width={'50px'} height={'50px'}/>
                            <Text>MAXIMA 2022</Text>
                        </HStack>
                    </Flex>
                    <Flex border={'solid'} width={'400px'} justifyContent={'center'} alignItems={'center'}><Text>Log In to Dashboard</Text></Flex>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl width={'350px'} onSubmit={handleSubmit(onSubmit)}>
                            <FormLabel>Nomor Induk Mahasiswa</FormLabel>
                            <Input {...register('nim', {required: "NIM harus diisi"})} placeholder='44898' type='text' name='nim' textColor={'black'} border={'solid'}/>
                            {errors.nim !== undefined && <Text textColor={'red'}>{errors.nim.message}</Text>}
                            <FormLabel>Password</FormLabel>
                            <Input {...register('password', {required: "Password harus diisi"})} placeholder='********' type='password' name='password' textColor={'black'} border={'solid'}/>
                            {errors.password !== undefined && <Text textColor={'red'}>{errors.password.message}</Text>}
                        </FormControl>
                        <Flex w={'100%'} justifyContent={'center'} py={3}>
                            <Button borderRadius={'md'} width={'350px'} type="submit" fontFamily={'rubik'} color={'#fff'} colorScheme={'orange'}>Sign In</Button>
                        </Flex>
                    </form>
                    <Flex border={'solid'} width={'400px'} justifyContent={'center'} alignItems={'center'}><Text>Don't Have an Account? <Link href='/signUp'><a>Register</a></Link></Text></Flex>
                </VStack>
            </Flex>
        </Flex>
        </>
     );
}
 
export default signIn;