import React from 'react'
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface ICustomCardProps {
    title: string,
    desc: string,
    text1: string,
    text2?: string,
    link1: string,
    link2?: string,
    img:string
}

const CustomCard = ({ title, desc, text1, text2, link1, link2, img }: ICustomCardProps) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            style={{cursor: 'pointer',transition:'0.5s all ease'}}
            _hover={{transform:'scale(1.05)'}}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={`${img}`}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{title}</Heading>
                    <Text py='2'>
                        {desc}
                    </Text>
                </CardBody>

                <CardFooter letterSpacing={2} >
                    <Link to={link1}><Button variant='solid' colorScheme='purple' style={{margin:'.5rem'}}>
                        {text1}
                    </Button></Link>
                    {text2!==undefined && <Link to={link2}><Button variant='solid' colorScheme='yellow' style={{margin:'.5rem'}}>
                        {text2}
                    </Button></Link>}

                </CardFooter>
            </Stack>
        </Card>

    )
}

export default CustomCard