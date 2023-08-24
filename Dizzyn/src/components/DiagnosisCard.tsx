import { Stack, Text, Button } from '@chakra-ui/react'
import {BsGenderFemale, BsGenderMale, BsGenderAmbiguous} from 'react-icons/bs'

interface ICardProps {
    docType:string, document:string, symptoms:string,
     diagnosis:string, doctorName:string, patientName:string
     ,upload:boolean, viewEdit?:any
}

export default function DiagnosisCard({viewEdit, docType, document,
   symptoms, diagnosis, doctorName, patientName, upload}:ICardProps) {

  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" maxW={'20vw'} 
    style={{transition:'0.5s all ease', cursor:'pointer'}}
    _hover={{transform:'scale(1.05)'}}>
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold" style={{fontSize:"1.5rem",display:"flex", flexDirection:"row"
    ,padding:"0.5rem"}}>Diagnosis : {diagnosis}</Text>
      </Stack>

      <Stack direction={{ base: 'column' }} justifyContent="space-between">
      <Text fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Doctor Name: {doctorName}
        </Text> 
        <Text fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Document Type: {docType}
        </Text> 
        <Text fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Symptoms: {symptoms}
        </Text> 
        <Text fontSize={{ base: 'lg' }} textAlign={'left'} maxW={'4xl'}>
          Document: {document} &nbsp;
        </Text>  
        {upload && <Stack direction={{ base: 'column', md: 'row' }}>
          <Button variant="outline" colorScheme="green"
          onClick={viewEdit} >
            Edit to upload
          </Button>
        </Stack>}
      </Stack>
    </Stack>
  )
}