import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit").then(result => console.log(result)).catch(e => console.log(e));

// bridge.subscribe((e) => {
//   console.log('1', e);
//   if(e.type == 'VKWebAppInitResult') {
//     console.log(e.data.status);
//   }
// });

// let atoken;
// bridge.send("VKWebAppGetCommunityToken", {"app_id": 7784511, "group_id": 204547782, "scope": "app_widget"}).then(result => {
//   atoken = result.access_token;
//   console.log(result.access_token)
//   console.log(atoken)
// }).catch(e => console.log(e));

// const params = {
//   type: "text",
//   // code: "{\"title\": \"Цитата\",\"text\": \"Текст цитаты\"}"
// };
// const options = {
//   method: 'POST',
//   body: JSON.stringify( params )  
// };
// const funct = async () => {
//   console.log('right in')
//   await fetch(`https://api.vk.com/method/appWidgets.update?type=text&code=a&access_token=${atoken}&v=V`)
//   .then(console.log('right here')).catch(console.log('error'));
// }

// funct();

// bridge.subscribe((e) => {
//   console.log('2', e);
//   if(e.type == 'VKWebAppCommunityAccessTokenResult') {
//     console.log(e.data.status);
//   }
// });

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
