const axios = require('axios');
const fs = require('fs');
const userSchema = require('../models/userModel');
let FormData = require('form-data');


module.exports.handleImageUpload = (req, res) => {
    let file = req.files.image;
    const PATH = __dirname + '/images/' + file.name;
    
    file.mv(PATH, async(err) => {
        if (err){
            res.send({status: 'error' ,ERRORCODE: 1, message: err}).end();
        } else {
            let data = new FormData();
            data.append('image', fs.createReadStream(PATH));
            const config = {
                method: 'post',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Authorization': 'Client-ID 7e581f1b699fba6', 
                    'Accept': 'application/json',
                    'Accept-Encoding': 'identity',
                    ...data.getHeaders()
                },
                data : data
            };
            axios(config)
            .then(resp => {
                console.log(resp.data);
                let url = 'IMAGE>' + resp.data.data.link + '?deleteHash=' + resp.data.data.deletehash + '&id=' + resp.data.data.id;
                console.groupCollapsed(url);
                res.json({url}).end()
            })
            .catch(err => {
                console.log(resp.data)
                res.send(err).end()
            })
        }
    })
}

module.exports.deleteImage = (req, res) => {
    var config = {
        method: 'delete',
        url: `https://api.imgur.com/3/image/${req.query.id}`,
        headers: { 
            'Authorization': 'Bearer 887f72aad6ff9a6724b4958da748d628b338089a',
            'Accept': 'application/json',
            'Accept-Encoding': 'identity',
        },
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data).end();
      })
      .catch(function (error) {
        console.log(error);
        res.send(error).end();
      });
}

module.exports.updateAccInfo = (req, res) => {
    const {user, value, type} = req.body;
    userSchema.updateOne(
        {username: user},
        {
            $set:{
                [type]: value
            }
        },
        {
            upsert: true
        }, (error, result) => {
            if (error){
                res.send('Something went wrong').end();
                console.log(error);
            } else {
                res.send('Data updated successfully!').end();
            }
        }
    )
}