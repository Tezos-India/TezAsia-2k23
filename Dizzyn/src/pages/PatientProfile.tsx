import { Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSessionStorage } from '../utils/useSessionStorage';

const PatientProfile = () => {
    const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
    const {name,age,sex,aadhar} = JSON.parse(user);
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} my={20}>
                <Stack align={'center'}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Patient Profile</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Name
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Hi {name}!
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Age
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Your, i.e {name}'s age is {age}.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Gender
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {sex}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Aadhar Card Number
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {aadhar}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
                </Stack>
                </Stack>
                </Flex>
                )
}

                export default PatientProfile