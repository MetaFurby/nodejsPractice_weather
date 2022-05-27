import request from 'postman-request';

export function forecast(latitude,longitude,callback){
    const url = 'http://api.weatherstack.com/current?access_key=a1cb6d89de355313feaddecb7367c508&query='+
     latitude.toString() + ',' + longitude.toString() + '&units=f';
     request({url, json:true},(error,response)=>{
        if(error){
            callback("Can't connect to server WEATHER",undefined);
        }
        else if(response.body.error){
            callback("Forecast not found",undefined);
        }
        else{
            const data = response.body;
            const weather = data.current.weather_descriptions[0];
            const temperature = data.current.temperature;
            const feelslike = data.current.feelslike;
            const formatedRes = "It's " + weather + ". The temperature is "+ temperature +
            " degrees but it feels like " + feelslike +" degrees.";
            callback(undefined,formatedRes);
        }
    });
}