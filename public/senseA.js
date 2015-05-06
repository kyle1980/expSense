
var main = document.getElementById('main');


var mGet = function(){
  var url = "http://kyle.princesspeach.nyc/messages";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    msgObj = JSON.parse(xhr.responseText);
    console.log(msgObj);
    mDisplay(msgObj);
  });

  xhr.send();

};


// var convoBuilder = function(){
//   var
//
// }


var mDisplay = function(userArray){
  userArray.forEach(function(user){
    var cDiv = document.createElement('div');
    cDiv.className = 'convo';
    // cDiv.id = msg['phone'];
    main.appendChild(cDiv);
    user['messages'].forEach(function(msg){
      var mDiv = document.createElement('div');
      cDiv.id = '+' + msg['phone'];
      mDiv.innerText = msg['phone'] + ' : ' +  msg['body'];
      console.log(msg['received']);
      if(msg['received'] == true){
        mDiv.className = 'user';
      }else{mDiv.className = 'operator';}
      cDiv.appendChild(mDiv);
    })
    var chatArea = document.createElement('textarea');
    chatArea.className = 'chatArea';
    var sendButton = document.createElement('button');
    sendButton.innerHTML = 'Send Message';

    sendButton.addEventListener('click', function(){
      console.log('click');
      console.log(chatArea.value.trim() + ' > # ' + user['phone']);
      mSend(chatArea.value.trim() , user['phone']);
      chatArea.value = '';
    });

    chatArea.type = 'textarea';
    cDiv.appendChild(chatArea);
    cDiv.appendChild(sendButton);

  });

};



var mSend = function(mString,mPhone){
  var url = "http://kyle.princesspeach.nyc/operator";
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('load', function(e) {
    console.log('sent');
    console.log(xhr.responseText);

  });
  var msgOut = {body:mString,
  phone:mPhone};
  xhr.send(JSON.stringify(msgOut));
  wsMessage(msgOut , 'operator');
};


intTest = function (){console.log('Test String')}
intTest2 = function(){setInterval(intTest , 10)}

var testH = document.getElementById('test');
testH.addEventListener('click' , function(){

  return intTest2();
})


mGet();


// ws addition


var chatToo = new WebSocket("ws://kyle.princesspeach.nyc:4000");
// var chatToo = new WebSocket("ws://localhost:4000");



// var talker = function(name , message){
//
//
//
//   li.innerText = name + " : " + message;
//   var top = msgBox.firstChild;
//   msgBox.insertBefore(li , top);
// }

var wsMessage =  function(msgObj , classString){
  var cDiv = document.getElementById(msgObj.phone);
  var mBody = document.createElement('li');
  mBody.className = classString;
  mBody.innerText = msgObj.message;
  cDiv.appendChild(mBody);

}



chatToo.addEventListener("message" , function(evt){
  mumble = JSON.parse(evt.data);
  console.log(mumble);
  wsMessage(mumble , 'user');


})



chatToo.addEventListener("open" , function(){
  console.log("connected");

})


chatToo.addEventListener("close" , function(){
  console.log("Disconnected");
  // talker(info["name"] ,"you have been disconnected");
})
