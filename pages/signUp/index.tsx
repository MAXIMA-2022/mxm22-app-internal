import {
    Flex, Text, Box, Button, Image, Stack, Link, Select,
    Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, FormControl, FormLabel
} from '@chakra-ui/react'
import MxmIconSVG from '../../public/mxmIcon.svg'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'  
import {useEffect, useState} from 'react'

const signUp = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const onSubmit = async (data)=>{}
    return ( 
        <>
        <Flex border={'solid'} minH={'100vh'} justifyContent={'center'} alignItems={'center'} bgGradient={'linear(to-r, #bd0116, #f74f24)'}>
            <Flex height={'500px'} width={'400px'} borderRadius={25} boxShadow={'2xl'} bgColor={'#fff'} justifyContent={'center'} alignItems={'center'}>
                <VStack>
                    <Flex border={'solid'} width={'400px'}></Flex>
                    <Flex border={'solid'} width={'400px'}></Flex>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl width={'350px'} onSubmit={handleSubmit(onSubmit)}>
                            <FormLabel>Nomor Induk Mahasiswa</FormLabel>
                            <Input {...register('nim', {required: "NIM harus diisi"})} type='text' name='nim' textColor={'black'} border={'solid'}/>
                            {errors.nim !== undefined && <Text textColor={'red'}>{errors.nim.message}</Text>}
                            <FormLabel>Password</FormLabel>
                            <Input {...register('password', {required: "Password harus diisi"})} type='password' name='password' textColor={'black'} border={'solid'}/>
                            {errors.password !== undefined && <Text textColor={'red'}>{errors.password.message}</Text>}
                        </FormControl>
                        <Flex w={'100%'} justifyContent={'center'} py={3}>
                            <Button borderRadius={'md'} width={'350px'} type="submit" fontFamily={'rubik'}>SUBMIT</Button>
                        </Flex>
                    </form>
                </VStack>
            </Flex>
        </Flex>
        </>
     );
}
 
export default signUp;