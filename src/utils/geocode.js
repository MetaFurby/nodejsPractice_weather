import request from 'postman-request';

export function geocode(address,callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+
    '.json?access_token=pk.eyJ1IjoiYW5pbWF1eDEyMyIsImEiOiJjbDNuYnJwczEwY3k0M2RsOGl4YmphN3E3In0.lYBZfc9uXMu2EOCjxQ05kA&limit=1'
    request({url, json:true},(error,response)=>{
        if(error){
            callback("Can't connect to server GEO",undefined);
        }
        else if(response.body.error || response.body.features.length===0){
            callback("Locations not found",undefined);
        }
        else{
            const data = response.body;
            const longitude = data.features[0].center[0];
            const latitude = data.features[0].center[1];
            const location = data.features[0].place_name;
            callback(undefined,{longitude,
                                latitude,
                                location});
        }
    });
}