import React from 'react'
import CustomCard from '../components/CustomCard'
import { Flex, Stack, useColorModeValue } from '@chakra-ui/react'

const Welcome = () => {
    return (
        <><Flex
        maxH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={4} mx={'5rem'} my={'7rem'} maxW={'40vw'}>
        <CustomCard title="Patient" desc="If you are a patient please continue here" text1="Signup" 
        text2="Login" link1="/register" link2="/login" img="http://surl.li/kgllp"/>
        <CustomCard title="Doctor" desc="If you are a doctor please continue here" text1="Signup" 
        text2="Login" link1="/doctor_register" link2="/doctor_login" img="https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg?w=2000"/>
        <CustomCard title="Hospital" desc="If you want to view hospitals and doctors click here" text1="Enter Hospitals"
         link1="/hospital"  img="http://surl.li/kgljb" />
        </Stack>
        </Flex>
        </>
    )
}

export default Welcome
