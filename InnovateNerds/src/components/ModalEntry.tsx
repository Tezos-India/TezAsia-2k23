import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ModalEntryComponent() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal defaultOpen={true} isOpen={!isOpen} onOpenChange={onOpenChange}
      classNames={{
        // body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
      }}>
      
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">How to play??</ModalHeader>
              <ModalBody>
                <p> 
                  There is a NFT hidden among these cards. Flip a card and try your luck to win an NFT.
                  You get one chance every trial. If you loose click on try again for another chance.
                </p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
