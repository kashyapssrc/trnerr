import api from './index';

// gets all active notices to be displayed in the notifications card
export function getMessages(callback, options) {

  let query = api.getQueryString(options);

  api.get("v1/message_history/?" + query, (response, isError) => {
    if(!isError){
      console.log("The response data in the msg history js: %s", JSON.stringify(response));
      // let st = '';
      // st = JSON.stringify(response)
      console.log("Also checking random: %s", JSON.stringify(response.message))
      console.log("just resp.msg: %s", response.message.uuid)
      callback(null, response.message);
    }else{
      console.log("the response value if error occurred: %s", response);
      callback(response.message, null);
    }
  });
};