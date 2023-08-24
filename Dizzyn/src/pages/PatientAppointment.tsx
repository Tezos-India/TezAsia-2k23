import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select,
    createStandaloneToast,

} from '@chakra-ui/react'

import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react'
import { showToast } from '../utils/showToasts';
import { addPatient, addRecord, makeAppointment } from '../utils/operation';
import { useSessionStorage } from '../utils/useSessionStorage';

const { toast, ToastContainer } = createStandaloneToast();

export default function PatientAppointment() {
    const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
    const thisuser = JSON.parse(user);
    const [mock, setMock] = useState([])
    

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://efficacious-writing-production.up.railway.app/api/DoctorList");
            setMock(response.data.data);
        }
        fetchData();
    }, []);

    const [newDiagnosis, setNewDiagnosis] = useState({
        name: thisuser.name,
        aadhar: thisuser.aadhar,
        privateKey: "",
        doctorAadhar: "",
        symptoms: "",
    })

    useEffect(() => {
        console.log(newDiagnosis);
    }, [newDiagnosis])

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const allFieldsFilled = () => {
        const values = Object.values(newDiagnosis);
        return values.every(value => value.trim().length > 0);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewDiagnosis(prevValue => (
            {
                ...prevValue,
                [name]: value
            })
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        // console.log("newDiagnosis ", newDiagnosis)
        setNewDiagnosis(prev=>({
            ...prev, 
            privateKey: prev.privateKey.replace(/\\n/g, '\n')
        }))
        
        const url =  'https://efficacious-writing-production.up.railway.app/api/makeAppointment'
        let config = {
          maxBodyLength: Infinity,
          headers: { 
            'Content-Type': 'application/json'
          }
        };
        console.log("Making the call")
        axios.post(url, newDiagnosis, config)
        .then(async (response) => {
          console.log(response.data)
          console.log(JSON.stringify(response.data));
        
          console.log("hashedAadhar ", response.data.hashedAadhar)
          console.log("symptons ", response.data.symptons)
          console.log("docAadhar ", newDiagnosis.doctorAadhar)
          console.log("AESencrypt ", response.data.AESencryptForDoctor)
          console.log("rsa ", response.data.rsa)
          console.log("encyptedDocName ", response.data.encyptedDocName)
          await makeAppointment(response.data.hashedAadhar,response.data.symptoms , newDiagnosis.doctorAadhar,
            response.data.AESencryptForDoctor, response.data.rsa,response.data.encryptedDoctorName).
            then(res=>{
              console.log(res);
              
            }).catch(err=>{
              console.log(err);
              
            })
        })
        .catch((error) => {
          if ("response" in error){
            if ("data" in error.response){
                console.log(error.response.data.message)
            }
            console.log(error.response.data.message)
          }
          else{
          console.log("Error Occured");
          }
        });
        // const appointment = await makeAppointment(thisuser.aadhar, newDiagnosis.symptoms, newDiagnosis.doctorAadhar)
        //     .catch(err => console.log(err));

        // console.log("added appointment", newDiagnosis)
    }

    // useEffect(() => {
    //     setMock([{id:1,name:"Peter MC1",aadhar:"12345671"},{id:2,name:"Peter MC2",aadhar:"12345672"},{id:3,name:"Peter MC3",aadhar:"12345673"}])
    
    // }, [mock])
   

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} my={20}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Make an Appointment
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            with any doctor! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="privatekey" isRequired>
                                <FormLabel>Enter your private key</FormLabel>
                                <Input type="text" name="privateKey"
                                    value={newDiagnosis.privateKey} onChange={handleChange} />
                            </FormControl>

                            <FormControl id="doctor" isRequired>
                            <FormLabel>Doctor</FormLabel>
                            <Select placeholder='Select Doctor' onChange={e=>{
                                const { target } = e;
                                if (target.type === 'select-one') {
                                   const selectValue = target.selectedOptions[0].value;
                                   setNewDiagnosis(prev=>({...prev,doctorAadhar:selectValue}))
                                }
                            }}>
                                {(mock && mock.length)? mock.map(doctor => {
                                    return(
                                        <>
                                        <option key={doctor.id} value={doctor.aadhar}>{doctor.name}</option>
                                        </>
                                    )
                                }):""}
                            </Select>
                            </FormControl>


                            <FormControl id="symptoms" isRequired>
                                <FormLabel>Symptoms</FormLabel>
                                <Input type="text" name="symptoms"
                                    value={newDiagnosis.symptoms} onChange={handleChange} />
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
                                        handleSubmit(e);
                                    }}>
                                    Make appointment
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Wanna add your Diagnosis? <Link color={'blue.400'} href="/patient_adddiag">Add Diagnosis</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

            <ToastContainer />
        </>
    )
}
