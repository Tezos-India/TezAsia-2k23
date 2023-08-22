import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    createStandaloneToast,
    Highlight,
    useDisclosure
} from '@chakra-ui/react'

import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react'
import { showToast } from '../utils/showToasts';
import { addDoctor, addPatient } from '../utils/operation';

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [registered, setRegistered] = useState(false);
    const [msg,setMsg] = useState('')
    const [form, setForm] = useState({
        name: '',
        aadhar: '',
        age: '',
        sex: '',
        hospital: '',
        speciality: ''
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const handleSubmit = async () =>{

        const request = await axios.get("https://efficacious-writing-production.up.railway.app/api/newUser").
            then(async (response) => {
                const res = response.data
                const reg = await addDoctor(form.speciality, form.aadhar, form.sex, res.public, form.name, form.hospital, form.age).
                    then((con) => {
                        console.log(con)
                        console.log("secretKey is as follows")
                        console.log(res.privateKey)
                        setForm(prev => (
                            {
                                ...prev,
                                privateKey: res.private
                            }))
                
                        // redirect()
                        setRegistered(true);
                        setMsg(res.private)
                    }).
                    catch((err) => {
                        console.log(err)
                    })
            })
    }

    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
        {registered?
        <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} my={'6rem'} maxW={'80vw'} py={12} px={6}>
 <Heading lineHeight='tall'>
 Registered Successfully! Please note down your private key as this will be only shown once now
    and you will not be able to access this ever again. Click the button to view the key.
    <Button onClick={onToggle}>Click Me</Button>
      <SlideFade in={isOpen} offsetY='4px' style={{fontSize:'1rem'}}>
        <Box
          p='50px'
          color='white'
          mt='5'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
        {JSON.stringify(msg).slice(1,-1)}
        </Box>
      </SlideFade>
  
</Heading>
<Button onClick={()=>navigate('/doctor_login')}>Login now</Button>

</Stack>
</Flex>

        :
        
        <Flex
        minH={'130vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool features ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={6}>
                    <HStack>
                        <Box>
                            <FormControl id="Name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, name: e.target.value }))
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="Age" isRequired>
                                <FormLabel>Age</FormLabel>
                                <Input type="Age" onChange={(e) => {
                                    setForm(prev => ({ ...prev, age: e.target.value }))
                                }} />
                            </FormControl>

                        </Box>
                    </HStack>
                    <FormControl id="aadhar" isRequired>
                        <FormLabel>Aadhar Card Number</FormLabel>
                        <Input type="text" onChange={(e) => {
                            setForm(prev => ({ ...prev, aadhar: e.target.value }))
                        }} />
                    </FormControl>
                    
                    <FormControl id="hospital" isRequired>
                        <FormLabel>Hospital/Clinic Name</FormLabel>
                        <Input type="text" onChange={(e) => {
                            setForm(prev => ({ ...prev, hospital: e.target.value }))
                        }} />
                    </FormControl>
                    <FormControl id="speciality" isRequired>
                        <FormLabel>Speciality</FormLabel>
                        <Input type="text" onChange={(e) => {
                            setForm(prev => ({ ...prev, speciality: e.target.value }))
                        }} />
                    </FormControl>
                    
                    <FormControl id="gender" isRequired>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup defaultValue='1'>
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='blue' value='male' onChange={(e) => {
                                    setForm(prev => ({ ...prev, sex: 'male' }))
                                }}>
                                    Male
                                </Radio>
                                <Radio colorScheme='pink' value='female' onChange={(e) => {
                                    setForm(prev => ({ ...prev, sex: 'female' }))
                                }}>
                                    Female
                                </Radio>
                                <Radio colorScheme='yellow' value='other' onChange={(e) => {
                                    setForm(prev => ({ ...prev, sex: 'other' }))
                                }}>
                                    Other
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={(e) => {
                                handleSubmit();

                            }}>
                            Sign up
                        </Button>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Already registered doctor? <Link color={'blue.400'} href="/doctor_login">Login</Link>
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Stack>   
    </Flex>
    }                                       
            <ToastContainer />
        </>
    )
}