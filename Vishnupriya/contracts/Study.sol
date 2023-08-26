pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;
contract Study{
    uint public teacherCount=0;
    uint public studentCount=0;
    uint public studentfilesCount=0;
    uint public teacherfilesCount=0;
    mapping (address => string) public roles;
    struct Teacher{
        uint id;
        address addr;
        string name;
        string phonenumber;
        string email;
        string dob;
        string orgname;
        string Address;       
    } 
    mapping(uint => Teacher) public teachers;
    
    struct Student{
        uint id;
        address addr;
        string name;
        string phonenumber;
        string email;
        string dob;
        string Address;
        string IDproof;
    } 
    mapping(uint => Student) public students;

    struct FileTeacher{
        uint id;
        string filehash;
        string subject;
        string time;
        string description;
        address teacher;
    }
    mapping(uint => FileTeacher) public filesbyteachers;

    struct FileStudent{
        uint id;
        string filehash;
        string subject;
        string time;
        string description;
        address student;
    }
    mapping(uint => FileStudent) public filesbystudents;
 
   mapping (address => mapping(address=>string [])) public messages;

    mapping(address =>string) public teacherpreferences;   
    mapping(address =>string) public studentpreferences;

    function addMessage(address _to,string memory _msg) public {
        //string [] storage _msgs=messages[msg.sender][_to];
        //_msgs.push(_msg);
        //messages[msg.sender][_to]=_msgs;  
          messages[msg.sender][_to].push(_msg);    
    }
   function returnmessages(address _from,address _to) public view  returns ( string [] memory)   {
       return  messages[_from][_to];
  }
    function storepreferenceTeacher(string memory _preference) public {
        teacherpreferences[msg.sender]=_preference;
    }
    function storepreferenceStudent(string memory _preference) public {
        studentpreferences[msg.sender]=_preference;
    }
    function registerteacher(string memory _name, string memory _phonenumber, string memory _email,string memory _dob,string memory _orgname, string memory _Address) public {
        teacherCount++;
        teachers[teacherCount]=Teacher(teacherCount,msg.sender,_name,_phonenumber,_email,_dob,_orgname,_Address);
         roles[msg.sender]="1";  
    }
    function registerstudent(string memory _name,  string memory _phonenumber,string memory _email,string memory _dob,string memory _Address,string memory _IDproof) public {
        studentCount++;
        students[studentCount]=Student(studentCount,msg.sender,_name,_phonenumber,_email,_dob, _Address,_IDproof);
        roles[msg.sender]="2";        
    }
    function addNewfilebyStudent(string memory _subject, string memory _description,string memory _filehash, string memory _time ) public {
        studentfilesCount++;
        filesbystudents[studentfilesCount]=FileStudent(studentfilesCount,_filehash,_subject,_time,_description,msg.sender);       
    }
    function addNewfilebyTeacher( string memory _subject, string memory _filehash, string memory _time,string memory _description ) public {
        teacherfilesCount++;
        filesbyteachers[teacherfilesCount]=FileTeacher(studentfilesCount,_filehash,_subject,_time,_description,msg.sender);   
        
    }
  
    

}