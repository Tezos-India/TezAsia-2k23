
# this is a copy from the online IDE code , to run locally you need to make some changes

import smartpy as sp


@sp.module
def main():
    
    class University(sp.Contract):
        def __init__(self):
            self.data.isAdmissionOpen = False
            self.data.students = []

        @sp.entrypoint
        def OpenAdmission(self):
            assert self.data.isAdmissionOpen == False
            self.data.isAdmissionOpen = True

        @sp.entrypoint
        def CloseAdmission(self):
            assert self.data.isAdmissionOpen == True
            self.data.isAdmissionOpen = False

        @sp.entrypoint
        def AddStudent(self,student):
            assert self.data.isAdmissionOpen == True    
            self.data.students.push(student)
