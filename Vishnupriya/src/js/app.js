App = {
  web3Provider: null,
  contracts: {},
  teacherpreferences:[],
  studentpreferences:[],
  filedatastudent: null,
  str :"",
  toaddr:null,
 
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    
  },
  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const Study = await $.getJSON('Study.json')
    App.contracts.Study = TruffleContract(Study)
    App.contracts.Study.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.study = await App.contracts.Study.deployed()
    ////window.alert("smart contract loaded")
  },
  setPanelString2: async (name,msg,sender,reciever,filehash,name1,filecontent,id) => {
    //desc,addr,time,subject,filehash
    App.str=` <div class="col-9 col-sm-6 col-md-6 col-lg-9">
    <div class="panel panel-default panel-pet">
      <div class="panel-heading">
        <h3 class="panel-title">Messages</h3>
      </div>
      <div class="panel-body">      
        
        <br/><br/>
        <!-- used for filters -->
        <strong>From:</strong>: <span class="Filedetails">`+name+`</span><br/> 
        <strong>Message:</strong>: <span class="Descriptionaboutfile">`+msg+`</span><br/>
    
        <button class="btn btn-default btn-primary" type="button" data-id="0" onclick="App.replypost('`+sender+`','`+reciever+`')">Reply</button>
        <button class="btn btn-default btn-primary" type="button" data-id="0" onclick="App.deletepost");">Delete</button>
        
      </div>
    </div>
  </div>`;
  
},
replypost :async(sender,reciever)=>{
  window.alert(sender+" "+reciever);
  $("#messagereplysendtobystudent").html(sender);
  $("#signingupstudent").hide();
  $("#signingupteacher").hide();
  $("#choosestudentinterests").hide();
  $("#chooseteacherinterests").hide(); 
  $("#startingpage").hide(); 
  $("#leftmargin").hide()
  $("#studentdashboard").hide();    
  $("#studentleftpanel").show();
  $("#studentpostdashboard").hide();
  $("#showMessagesdashboard").hide();
  $("#messagereplypagestudent").show();

},
postreplybystudent: async ()=>{
  var msgbody=$("#replymessagebody").val();
  var toaddr=$("#messagereplysendtobystudent").text();
  window.alert(msgbody+" "+toaddr);
  await App.study.addMessage(toaddr.toString(),msgbody,{from:App.account});
},
viewfilebystudent: async(filehashofstudentfile)  => {
  var fileurl="https://ipfs.infura.io/ipfs/"+filehashofstudentfile;
  console.log(fileurl);
    window.location.href = fileurl;

},
setPanelString1: async (desc,addr,time,subject,filehash,name,id) => {
  //desc,addr,time,subject,filehash
  
  App.str=` <div class="col-9 col-sm-6 col-md-6 col-lg-9">
  <div class="panel panel-default panel-pet">
    <div class="panel-heading">
      <h3 class="panel-title">`+subject+`</h3>
    </div>
    <div class="panel-body">
      <img alt="140*140"  class="img-rounded img-center" style="height: 55%;width: 55%;" src="2.jpg"  >
      
      <br/><br/>
      <!-- used for filters -->
      <strong>All file details</strong>: <span class="Filedetails">`+time+" "+addr+"  "+name+`</span><br/> 
      <strong>Description about file</strong>: <span class="Descriptionaboutfile">`+desc+`</span><br/>
  
      <button class="btn btn-default btn-primary" type="button" data-id="0" onclick="App.viewfilebyteacher('`+filehash+`');">View</button>
      <button class="btn btn-default btn-primary" type="button" data-id="0" onclick="App.showDoubtpage('`+id+`');">Doubt</button>
      
    </div>
  </div>
</div>`;

},

setPanelString3: async (desc,addr,time,subject,filehash,name,id) => {
  //desc,addr,time,subject,filehash
  
  App.str=` <div class="col-9 col-sm-6 col-md-6 col-lg-9">
  <div class="panel panel-default panel-pet">
    <div class="panel-heading">
      <h3 class="panel-title">`+subject+`</h3>
    </div>
    <div class="panel-body">
      <img alt="140*140"  class="img-rounded img-center" style="height: 55%;width: 55%;" src="2.jpg"  >
      
      <br/><br/>
      <!-- used for filters -->
      <strong>username</strong>: <span class="username">`+time+" "+addr+"  "+name+`</span><br/> 
      <strong>message</strong>: <span class="message">`+desc+`</span><br/>
      <strong>time</strong>: <span class="time">`+desc+`</span><br/>
  
      <button class="btn btn-default btn-primary" type="button" data-id="0"">reply</button>
      <button class="btn btn-default btn-primary" type="button" data-id="0" >Delete</button>
      
    </div>
  </div>
</div>`;

},
showDoubtpage :async (id)=>{
      var file=await App.study.filesbystudents(parseInt(id));
      var to=file[5];
      App.toaddr=to;
      $("#messagesendtobystudent").html(to);
      $("#signingupstudent").hide();
      $("#signingupteacher").hide();
      $("#choosestudentinterests").hide();
      $("#leftmargin").hide()
      $("#chooseteacherinterests").hide(); 
      $("#startingpage").hide(); 
      $("#studentdashboard").hide();     
      $("#teacherleftpanel").hide();
      $("#teacherdashboard").hide();     
      $("#messagepagestudent").show();
},
viewfilebyteacher: async(filehashofstudentfile)  => {
var fileurl="https://ipfs.infura.io/ipfs/"+filehashofstudentfile;
console.log(fileurl);
  window.location.href = fileurl;
},
  render: async() => {
     var role= await App.study.roles(App.account);
    window.alert("Role="+role)
    if(role=="1"){
      //it is a teacher
      $("#signingupstudent").hide();
      $("#signingupteacher").hide();
      $("#choosestudentinterests").hide();
      $("#leftmargin").show()
      $("#chooseteacherinterests").hide(); 
      $("#startingpage").hide(); 
      $("#studentdashboard").hide();     
      $("#teacherleftpanel").hide();
      $("#teacherdashboard").show();     
      $("#messagepagestudent").hide();
    }
    else if(role=="2"){
      //it is a student    
      document.getElementById('studentfileupload') 
      .addEventListener('change', function() {                       
      var fr=new FileReader(); 

      fr.onload=function(){ 
          //  document.getElementById('output') 
          //          .textContent=fr.result; 
          //window.alert(fr.result);
          App.filedatastudent=fr.result;
      }                       
     
      }) ; 
       var preference= await App.study.studentpreferences(App.account);
       console.log(preference);
       if(preference.length>0){
        App.studentpreferences=preference;
        console.log(App.studentpreferences);
          //preference stored already so redirect to dashboard
          //replacing home to POST
          $("#leftsidehome").hide();
          $("#leftsidepost").show();
          //displaying student name
          var studentCount1=await App.study.studentCount();          
          for(var k=1;k<=studentCount1;k++){
            var student=await App.study.students(k);
            var addrstu=student[1];
            if(addrstu.toUpperCase().localeCompare(App.account.toUpperCase())==0){
              studentname=student[2];
              $("#disstudentname").html(studentname);
              break;
            }                 

          }
        
          $("#displayallbooksinstudentdashboard").empty();
          var studentfilesCount=await App.study.studentfilesCount();          
          for(var i=1;i<=studentfilesCount;i++){
              var file=await App.study.filesbystudents(i);                               
              var desc= file[4];
              var studentaddr=file[5];
              var time=file[3];
              var subject=file[2];
              var filehash=file[1];
              var studentname="";
              if(studentaddr.toUpperCase().localeCompare(App.account.toUpperCase())==0){
                var studentCount=await App.study.studentCount();          
                for(var k=1;k<=studentCount;k++){
                  var student=await App.study.students(k);
                  var addrstu=student[1];
                  if(addrstu.toUpperCase().localeCompare(App.account.toUpperCase())==0){
                    studentname=student[2];                   
                    break;
                  }                 

                }
               
                await App.setPanelString1(desc,studentaddr,time,subject,filehash,studentname,parseInt(i));
                console.log(App.str);
                $("#displayallbooksinstudentdashboard").append(App.str); 
              }
              //desc,studentaddr,time,subject,filehash                                
          }

          $("#startingpage").hide();
          $("#signingupstudent").hide()
          $("#signingupteacher").hide()
          $("#leftmargin").hide()
          $("#choosestudentinterests").hide();
          $("#chooseteacherinterests").hide(); 
          $("#studentdashboard").show();
          $("#studentleftpanel").show();
          $("#messagepagestudent").hide();
          $("#showMessagesdashboard").hide();  
       }
       else{
         //preference is not stored. so sho student preference page
        
            
            $("#startingpage").hide();
            $("#signingupstudent").hide()
            $("#signingupteacher").hide()
            $("#leftmargin").show()
            $("#choosestudentinterests").show();
            $("#chooseteacherinterests").hide(); 
            $("#studentdashboard").hide();
            $("#studentleftpanel").hide();
            $("#messagepagestudent").hide();
       }
     
    }
    else{
      //new user
      // var Buffer=require('../../node_modules/buffer/').Buffer;
      // var buf = Buffer.from('abc');
      // console.log(buf);
      $("#startingpage").show();
      $("#leftmargin").show()
      $("#signingupstudent").hide()
      $("#signingupteacher").hide()
      $("#choosestudentinterests").hide();
      $("#chooseteacherinterests").hide();
      $("#messagepagestudent").hide();
     
    }

  }, 
  studentsignupclick:async() => {
    
    $("#signingupstudent").show()
    $("#leftmargin").show()
    $("#signingupteacher").hide()
    $("#messagepagestudent").hide();

  },
  teachersignupclick:async() => {
   
    $("#signingupstudent").hide()
    $("#leftmargin").show()
    $("#signingupteacher").show()

  },
  registerStudent:async() => {
    var name=$("#studentname").val();
    var phonenumber=$("#studentphonenumber").val();
    var email=$("#studentemail").val();
    var dob=$("#studentdob").val();
    var address=$("#studentaddress").val();
    var IDproof=$("#studentIDproof").val();   
   await  App.study.registerstudent(name,phonenumber,email,dob,address,IDproof,{from :App.account});
   await App.render();
    //here we add these datas into bc
    // $("#signingupstudent").hide()
    // $("#signingupteacher").hide()
    // $("#leftmargin").show()
    // $("#choosestudentinterests").show();
    // $("#chooseteacherinterests").hide(); 
    // $("#startingpage").hide();
  },
  
  registerTeacher:async() => {   
    var name=$("#teachername").val();
    var phonenumber=$("#teacherphonenumber").val();
    var email=$("#teacheremail").val();
    var dob=$("#teacherdob").val();
    var orgname=$("#teacherorgname").val();
    var address=$("#teacheraddress").val();
    var IDproof=$("#teacherIDproof").val();
    await  App.study.registerteacher(name,phonenumber,email,dob,orgname,address,{from :App.account});
    await App.render()
    // $("#signingupstudent").hide();
    // $("#signingupteacher").hide();
    // $("#choosestudentinterests").hide();
    // $("#leftmargin").show()
    // $("#chooseteacherinterests").show(); 
    // $("#startingpage").hide(); 
  },
  // student preferences
  addstudentpreferencemaths :async ()=>{
    App.studentpreferences.push("maths");
  },
  viewstudentpreference :async () =>{
    window.alert(App.studentpreferences);
   
  },
  showstudentdashboard :async ()=>{ 
      var str=App.studentpreferences.toString();
      await App.study.storepreferenceStudent(str.toString(),{from : App.account});
      
      $("#signingupstudent").hide();
      $("#signingupteacher").hide();
      $("#choosestudentinterests").hide();
      $("#chooseteacherinterests").hide(); 
      $("#startingpage").hide(); 
      $("#leftmargin").hide()
      $("#studentdashboard").show();
      $("#studentleftpanel").show();
      $("#showMessagesdashboard").hide(); 
  },
  showPostDashboard :async ()=>{
       var str=App.studentpreferences.toString().split(",");
       console.log("Preferferebce str="+str);
          
         $("#displaybooksinstudentpostdashboard").empty();
          var studentfilesCount=await App.study.studentfilesCount();          
          for(var i=1;i<=studentfilesCount;i++){
              var file=await App.study.filesbystudents(i);                               
              var desc= file[4];
              var studentaddr=file[5];
              var time=file[3];
              var subject=file[2];
              var filehash=file[1];
              var studentname=""; 
              var studentCount=await App.study.studentCount();               
              for(var k=1;k<=studentCount;k++){
                var student=await App.study.students(k);
                var addrstu=student[1];
                if(addrstu.toUpperCase().localeCompare(App.account.toUpperCase())==0){
                  studentname=student[2];                   
                  break;
                } 
              }             
              for(var p=0;p<str.length;p++){
               console.log("subject="+subject.toString()) 
               console.log("preference"+p+" ="+str[p].toString())
                if(str[p].toString().toUpperCase().localeCompare(subject.toString().toUpperCase())==0){
                  window.alert("preference matched book found")
                  //condition for old or not
                  
                  //This is the uploaded date and time 
                  console.log("time differences")                 
                  console.log(time)
                  var time1=time.split(" ");
                  var date1=time1[0];
                  var date11=date1.split("-");
                  var year1=date11[0];
                  var month1=date11[1]
                  var day1=date11[2];
                  //console.log("year="+year1+"month="+month1+"day1="+day1);
                  var date1=new Date(year1, month1, day1, 10, 20, 20, 10)


                  //get current date and time
                  var today = new Date();
                  var date2=new Date( today.getFullYear(), (today.getMonth()+1), today.getDate(), 10, 20, 20, 10)
                  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  var currenttime = date+' '+time;
                  var diff=date2-date1;
                  console.log("dat1="+date1.toString());
                  console.log("dat2="+date2.toString());
                  console.log("date differenve="+diff);
                  var msec = diff;
                  var daydiff = Math.floor(msec / 1000 / 60 / 60/24);
                    console.log("day diff="+daydiff);
                  if(daydiff<=1){
                    await App.setPanelString1(desc,studentaddr,time,subject,filehash,studentname,i);                
                    $("#displaybooksinstudentpostdashboard").append(App.str); 
                  }                 
 
                }
               
              }                                                                    
          }
    


    $("#signingupstudent").hide();
    $("#signingupteacher").hide();
    $("#choosestudentinterests").hide();
    $("#chooseteacherinterests").hide(); 
    $("#startingpage").hide(); 
    $("#leftmargin").hide()
    $("#studentdashboard").hide();    
    $("#studentleftpanel").show();
    $("#studentpostdashboard").show();
    $("#showMessagesdashboard").hide(); 
  },
  postbystudent :async()=>{
  
  window.alert("userTo address" +App.toaddr.toString());
  var msgbody=$("#messagebody").val();
  window.alert("userTo msg " +msgbody);
  await App.study.addMessage(App.toaddr.toString(),msgbody,{from:App.account});
  },
  showMessagesDashboard :async ()=>{
    $("#displaymessages").empty();
    var count=await App.study.studentCount();
    
    for(var i=1;i<=count;i++){
      var student=await App.study.students(i);
      var addrstudent=student[1];
      var namestudent=student[2];
      
      var returnmessages=await App.study.returnmessages(addrstudent,App.account);
      if(returnmessages.length>0){

        // var str="<tr><th> From:"+namestudent+"</th></tr>"
        // $("#displaymessages").append(str);
        var str1;
        var msg;
        for(var j=0;j<returnmessages.length;j++){
           msg=returnmessages[j];
          //  str1="<tr><td>"+msg+"</td></tr>"
          // $("#displaymessages").append(str1);
        }
       
        await App.setPanelString2(namestudent,msg,addrstudent,App.account,"","","","");
               
         $("#displaymessages").append(App.str); 
        
      }      

      console.log("student id="+i)
      console.log(returnmessages);
    }
    
    
    $("#signingupstudent").hide();
    $("#signingupteacher").hide();
    $("#choosestudentinterests").hide();
    $("#chooseteacherinterests").hide(); 
    $("#startingpage").hide(); 
    $("#leftmargin").hide()
    $("#studentdashboard").hide();    
    $("#studentleftpanel").show();
    $("#studentpostdashboard").hide();
    $("#showMessagesdashboard").show();    
  },
  retrieveAllPhysics :async()=>{
          $("#displaybooksinstudentpostdashboard").empty(); 
          var studentfilesCount=await App.study.studentfilesCount();          
          for(var i=1;i<=studentfilesCount;i++){
              var file=await App.study.filesbystudents(i);                               
              var desc= file[4];
              var studentaddr=file[5];
              var time=file[3];
              var subject=file[2];
              var filehash=file[1];
              var studentname="";
              window.alert(subject.toString());
              if(subject.toString().localeCompare("Physics")==0){
                window.alert("foound");
                var studentCount=await App.study.studentCount();          
                for(var k=1;k<=studentCount;k++){
                  var student=await App.study.students(k);
                  var addrstu=student[1];
                  if(addrstu.toUpperCase().localeCompare(App.account.toUpperCase())==0){
                    studentname=student[2];                   
                    break;
                  }
                }
                await App.setPanelString1(desc,studentaddr,time,subject,filehash,studentname,i);
                console.log(App.str);
                $("#displaybooksinstudentpostdashboard").append(App.str); 
              }
              //desc,studentaddr,time,subject,filehash                                
          }

  },
  
  addstudentpreferencephysics :async ()=>{
    $("#btnstudentpreferencephysics").prop("disabled",true)
    App.studentpreferences.push("physics");
  },
  addstudentpreferencechemistry :async ()=>{
    $("#btnstudentpreferencechemistry").prop("disabled",true)
    App.studentpreferences.push("chemistry");
  },
  addstudentpreferencebiology :async ()=>{
    $("#btnstudentpreferencebiology").prop("disabled",true)
    App.studentpreferences.push("biology");
  },
  addstudentpreferencecomputerscience :async ()=>{
    $("#btnstudentpreferencecomputerscience").prop("disabled",true)
    App.studentpreferences.push("computerscience");
  },

  addstudentpreferenceenvironmentalscience :async ()=>{
    $("#btnstudentpreferenceenvironmentalscience").prop("disabled",true)
    App.studentpreferences.push("environmentalscience");
  },

  addstudentpreferenceliterature :async ()=>{
    $("#btnstudentpreferenceliterature").prop("disabled",true)
    App.studentpreferences.push("literature");
  },

  addstudentpreferencearts :async ()=>{
   // $("#btnstudentpreferencearts").hide();
    $("#btnstudentpreferencearts").prop("disabled",true)
    App.studentpreferences.push("arts");
  },

  addstudentpreferencesocialogy :async ()=>{
    $("#btnstudentpreferencesocialogy").prop("disabled",true)
    App.studentpreferences.push("socialogy");
  },
  addstudentpreferencepsycology :async ()=>{

    $("#btnstudentpreferencepsycology").prop("disabled",true)
    App.studentpreferences.push("psycology");
  },
  showteacherdashboard :async ()=>{
    
    $("#signingupstudent").hide();
    $("#signingupteacher").hide();
    $("#choosestudentinterests").hide();
    $("#chooseteacherinterests").hide(); 
    $("#startingpage").hide(); 
    $("#studentdashboard").hide();
    $("#leftmargin").hide()
    $("#teacherleftpanel").show();
    $("#teacherdashboard").show();
},

  viewteacherpreference :async () =>{
    window.alert(App.teacherpreferences);
   
  },
  // teacher preferences 
  addteacherpreferencemaths :async ()=>{
    $("#btnteacherpreferencemaths").prop("disabled",true)
    App.teacherpreferences.push("maths");
  },
 
  addteacherpreferencephysics :async ()=>{
    $("#btnteacherpreferencephysics").prop("disabled",true)
    App.teacherpreferences.push("physics");
  },
  addteacherpreferencechemistry :async ()=>{
    $("#btnteacherpreferencechemistry").prop("disabled",true)
    App.teacherpreferences.push("chemistry");
  },
  addteacherpreferencebiology :async ()=>{
    $("#btnteacherpreferencebiology").prop("disabled",true)
    App.teacherpreferences.push("biology");
  },
  addteacherpreferencecomputerscience :async ()=>{
    $("#btnteacherpreferencecomputerscience ").prop("disabled",true)
    App.teacherpreferences.push("computerscience");
  },

  addteacherpreferenceenvironmentalscience :async ()=>{
    $("#btnteacherpreferenceenvironmentalscience").prop("disabled",true)
    App.teacherpreferences.push("environmentalscience");
  },

  addteacherpreferenceliterature :async ()=>{
    $("#btnteacherpreferenceliterature").prop("disabled",true)
    App.teacherpreferences.push("literature");
  },

  addteacherpreferencearts :async ()=>{
    $("#btnteacherpreferencearts").prop("disabled",true)
    App.teacherpreferences.push("arts");
  },

  addteacherpreferencesocialogy :async ()=>{
    $("#btnteacherpreferencesocialogy").prop("disabled",true)
    App.teacherpreferences.push("socialogy");
  },
  addteacherpreferencepsycology :async ()=>{
    $("#btnteacherpreferencepsycology").prop("disabled",true)
    App.teacherpreferences.push("psycology");
  },
  readFileofStudent:async (input)=> {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      console.log(reader.result);
      App.filedatastudent=reader.result;
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
  },
  uploadstudentfile : async ()=>{
    //store file into ipfs
      //Add file to Blockchain
      var studentsubjectfile=$("#studentsubjectfile").val();
      var Descriptionaboutfilebystudent=$("#Descriptionaboutfilebystudent").val();
      const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
      var filehash="";
      //window.alert(App.filedatauser);
      ipfs.add(App.filedatastudent,(err,hash)=>{
        if(err){
          console.log(err); 
          filehash="";
          App.filehash="";
          window.alert("Error in file upload to blockchain"+err) ;     
        }
        else{
          console.log("https://ipfs.infura.io/ipfs/"+hash);
          filehash=hash;  
          App.userfilehash=hash;
          //wrte a javascript code to find current time 
          // var currenttime="02/03/2021 09:";
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var currenttime = date+' '+time;
          //window.alert(currenttime)
            //console.log("subject="+usersubject+"description="+userfiledesription+"file hash="+filehash+"file content="+App.filedatauser)
          // get the current time using jascript

          App.study.addNewfilebyStudent(studentsubjectfile,Descriptionaboutfilebystudent,filehash,currenttime,{from : App.account}).then(()=>{
            window.alert(" Uploaded into blockchain ");
           });  
          window.alert("Uploaded into blockchain ");       
        }
      });
  },

  
   
  
  
    

  uploadstudentfile1 : async ()=>{
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }   
  
    var input = document.getElementById('studentfileupload');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
      App.filedatastudent="";               
    }
    else {           
      document.getElementById('studentfileupload') 
      .addEventListener('change', function() {                       
      var fr=new FileReader(); 
      //fr.readAsArrayBuffer(input.files[0]); 
      fr.readAsText(input.files[0]); 
      fr.onloadend=function(){ 
          //  document.getElementById('output') 
          //          .textContent=fr.result; 
          //window.alert(fr.result);
         // window.alert("Reading...")
          //var buffer=Buffer(fr.result);
          //window.alert(buffer);
         //App.filedatastudent=Buffer(fr.result);
          App.filedatastudent=fr.result;
          window.alert("working with files")
          console.log("file content:")
          console.log(App.filedatastudent);
      }                       
     
     // fr.readAsArrayBuffer(this.files[0]); 
      })
    }
    
    
    
  },
  searchbystudent : async() => {
    $("#displayallbooksinstudentdashboard").empty();
    var searchvaluebystudent=$("#searchvaluebystudent").val()
    window.alert("searchvaluebystudent" +searchvaluebystudent);
    var studentCount=await App.study.studentCount();
    for(var i=1;i<=studentCount;i++){
      var student=await App.study.students(i);
      var studentname=student[2];            
      if(studentname.localeCompare(searchvaluebystudent)==0){
        console.log("student found");
        var studentaddr=student[1]
        var studentfilesCount=await App.study.studentfilesCount();
        for(var j=1;j<=studentfilesCount;j++){
          var file=await App.study.filesbystudents(j);
          var filestudent=file[5];
          if(studentaddr.toUpperCase().localeCompare(filestudent.toUpperCase())==0){
              var desc= file[4];
              var studentaddr=file[5];
              var time=file[3];
              var subject=file[2];
              var filehash=file[1];
              //desc,studentaddr,time,subject,filehash
              await App.setPanelString1(desc,studentaddr,time,subject,filehash,studentname,j);
              console.log(App.str);
              $("#displayallbooksinstudentdashboard").append(App.str); 
          }
        }

      }
    }

  },
  searchbyteacher : async() => {
    $("#displayallbooksinteacherdashboard").empty();
    var searchvaluebyteacher=$("#searchvaluebyteacher").val()
    window.alert("searchvaluebyteacher" +searchvaluebyteacher);
    var teacherCount=await App.study.teacherCount();
    for(var i=1;i<=teacherCount;i++){
      var teacher=await App.study.teachers(i);
      var teachername=teacher[2];            
      if(teachername.localeCompare(searchvaluebyteacher)==0){
        console.log("teacher found");
        var teacheraddr=teacher[1]
        var teacherfilesCount=await App.study.teacherfilesCount();
        for(var j=1;j<=teacherfilesCount;j++){
          var file=await App.study.filesbyteachers(j);
          var fileteacher=file[5];
          if(teacheraddr.toUpperCase().localeCompare(fileteacher.toUpperCase())==0){
              var desc= file[4];
              var teacheraddr=file[5];
              var time=file[3];
              var subject=file[2];
              var filehash=file[1];
              //desc,teacheraddr,time,subject,filehash
              await App.setPanelString1(desc,teacheraddr,time,subject,filehash,teachername,j);
              console.log(App.str);
              $("#displayallbooksinteacherdashboard").append(App.str); 
          }
        }

      }
    }

  }
};
$(function() {
  $(window).load(function () {
    //window.alert("starting")
    App.load();
  });
});
