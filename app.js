// var port = getRandomInt();
var port = 8000;
var baseURL = "https://catalog.mayra.id/api/public/";
var waktu = 3500;

function getRandomInt() {
    return Math.floor(Math.random() * 16000);
}

import {
    delay
} from '@adiwajshing/baileys'
import axios from 'axios'
import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import {
    init,
    cleanup,
    getSession
} from './whatsapp.js'
import cors from 'cors'

// import res from 'express/lib/response'
import response from './response.js'
import cliSelect from 'cli-select';





const app = express()

var baseURL = "https://catalog.mayra.id/api/public/";
const baseServerUrl = 'http://localhost:' + port
const baseurl = ""


app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/', routes)



function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



app.listen(port, async () => {
    let groups = [];
    let loggedIn = false;
    let wid = null
    init()
    console.log(`Server is listening on http://localhost:${port}`)
    await delay(5000)
    try {
        let sessions = await axios.get(baseServerUrl + '/sessions/all').then(response => {
            return response.data.message
        })

        for await (let session of sessions) {
            let groups = await axios.get(baseServerUrl + '/groups/iamadmin?id=' + session, {
                // id: session,
                // receiver: '6285877776770',
                // message: 'Bot Ready'
            }).then(response => {
                // console.log(response.data.data)
                return response.data.data

            })
            // console.log(groups)

            for await (let group of groups) {

                try {
                    // console.log(group.id)
                    let code = await axios.post(baseServerUrl + '/groups/invitelink?id=' + session, {
                        group_id: group.id
                        // receiver: '6285877776770',
                        // message: 'Bot Ready'
                    }).then(response => {
                        // console.log(response)
                        return response.data.data
                    })

                    let participants = await axios.post(baseServerUrl + '/groups/participants?id=' + session, {
                        group_id: group.id
                        // receiver: '6285877776770',
                        // message: 'Bot Ready'
                    }).then(response => {
                        // console.log(response)
                        return response.data.data
                    })
                    await axios.post('https://lexy.mayra.id/respon/api/public/membercount', {
                        data: {
                            name: group.name,
                            count: participants.length,
                            linkgroup: 'https://chat.whatsapp.com/' + code
                        }
                    }).then(response => {
                        console.log(response.data)
                        // console.log('updating..')
                    })
                } catch (error) {
                    // console.log(error)
                }
            }

        }
        console.log('done update...')

    } catch (error) {
        console.log('corrupt file , silahkan logout dulu whatsappnya')
    }

    //init delay



    // //cari session 

    // try {

    //     loggedIn = await axios.get('http://localhost' + ':' + port + '/sessions/find/' + devName).catch(cc => {
    //         axios.post('http://localhost' + ':' + port + '/sessions/add/', {
    //             id: devName,
    //             isLegacy: false
    //         }).then(response => {
    //             console.log('TOLONG TUTUP DAN BUKA LAGI SETELAH 10 DETIK')
    //             return true
    //         })
    //     })

    // } catch (error) {
    //     console.log(error)

    // }

    // try {
    //     wid = getSession(devName).user.id.substr(0, getSession(devName).user.id.indexOf(':')) + '@s.whatsapp.net';
    // } catch (error) {

    // }
    // if (wid !== null) {
    //     // let wid = getSession(devName).user.id.substr(0, getSession(devName).user.id.indexOf(':')) + '@s.whatsapp.net';
    //     let tokos = []
    //     let produks = []
    //     let vasa = await axios.get(baseURL + 'tokosiapupload', {
    //         wid: wid
    //     }).then(res => {
    //         res.data.forEach(element => {
    //             tokos.push(element.name)
    //         })
    //         return res.data;
    //     })
    //     cliSelect({
    //         values: ['Upload', 'Kirim Tutupan'],
    //         valueRenderer: (value, selected) => {
    //             if (selected) {
    //                 return value;
    //             }

    //             return value;
    //         },
    //     }).then(async hasil => {

    //         if (hasil.id == 1) {
    //             async function kirimtutupan() {
    //                 console.log('cook')
    //                 var tutupantext = '';
    //                 var laporanresi = '';
    //                 const d = new Date(); // today, now
    //                 const daysAgo = new Date(d.getTime() - 10 * 24 * 60 * 60 * 1000);
    //                 // console.log(d.toISOString().slice(0, 10)); // YYYY-MM-DD
    //                 // console.log(daysAgo.toISOString().slice(0, 10)); // YYYY-MM-DD
    //                 await axios
    //                     .get(
    //                         "https://syaripesta.net/sistembaruapi/public/api/resi?date1=" +
    //                         daysAgo.toISOString().slice(0, 10) +
    //                         "&date2=" +
    //                         d.toISOString().slice(0, 10)
    //                     )
    //                     .then((response) => {
    //                         let dataresi = response.data;
    //                         //console.log(dataresi);
    //                         let resiText =
    //                             "*Laporan pengiriman (no resi ) tanggal :* \n " +
    //                             daysAgo.toISOString().slice(0, 10) +
    //                             " sd " +
    //                             d.toISOString().slice(0, 10) +
    //                             "\n\n\n";

    //                         for (const resi of dataresi) {
    //                             resiText +=
    //                                 "-" +
    //                                 resi.nama +
    //                                 " - *" +
    //                                 resi.no_resi +
    //                                 "* - " +
    //                                 resi.ekspedisi +
    //                                 "\n";
    //                         }
    //                         resiText +=
    //                             "\n*Untuk yang resi nya belum tersedia , kiranya bisa chat ke nomor admin pengiriman 085877776770 ( http://wa.me/6285877776770 ).*";

    //                         laporanresi = resiText;
    //                     });

    //                 await axios.get("https://lexy.mayra.id/copy.php").then((response) => {
    //                     tutupantext = response.data;
    //                 });




    //                 let pesan = laporanresi + '\n\n\n' + tutupantext;


    //                 async function kirimtutupantext(pesan, groups) {
    //                     console.log(pesan)
    //                     for await (let group of groups) {
    //                         console.log(group.id)
    //                         await axios.post('http://127.0.0.1:' + port + '/chats/send-group-text?id=johntol', {
    //                             receiver: group.id,
    //                             message: pesan

    //                         }).then(resp => {
    //                             console.log('upload')
    //                         })

    //                         await delay(2000)
    //                     }
    //                 }

    //                 await kirimtutupantext(pesan, groups);
    //                 return true;
    //             }
    //             await kirimtutupan()

    //         } else {



    //             await axios.post(baseURL + 'widsudahupload', {
    //                 wid: wid
    //             }).then(resp => {
    //                 resp.data.forEach(element => {
    //                     console.log(element.name)
    //                 })

    //                 console.log('========')
    //             });



    //             let idx = await cliSelect({
    //                 values: tokos,
    //                 valueRenderer: (value, selected) => {
    //                     if (selected) {
    //                         return value;
    //                     }

    //                     return value;
    //                 },
    //             }).then(hasil => {
    //                 // console.log(hasil)
    //                 let index = vasa.findIndex(object => {
    //                     return object.name === hasil.value;
    //                 });

    //                 // console.log(vasa[index])

    //                 return index

    //             });
    //             try {
    //                 produks = await axios.post(baseURL + 'hargatoday', {
    //                     toko_id: vasa[idx].id,
    //                     wid: wid
    //                 }).then(response => {
    //                     produks = response.data
    //                     // console.log(produks)
    //                     return produks
    //                 });
    //             } catch (error) {

    //             }


    //             try {
    //                 groups = await axios.get('http://localhost' + ':' + port + '/groups/iamadmin?id=johntol', {
    //                     isGroup: true,
    //                 }).then(groups => {
    //                     return groups.data.data
    //                 })
    //             } catch (error) {
    //                 console.log(error)
    //             }



    //             await sendtogroup(produks, groups);
    //             async function sendtogroup(produks, groups) {


    //                 var listharga = 'Daftar Harga Upload Hari ini : \n';
    //                 try {
    //                     await delay(waktu)
    //                     for await (const produk of produks) {

    //                         // let varready = produk.variants.map(e => e.name).join(",");

    //                         if (produk.gambar.length > 0) {
    //                             let caption = produk.nama + ' ' + produk.harga;
    //                             listharga += '~ ' + toTitleCase(caption) + "\n"
    //                             // await wait(waktu)
    //                             for await (const gambar of produk.gambar) {

    //                                 for await (let group of groups) {
    //                                     // console.log(group.id)
    //                                     await axios.post('http://127.0.0.1:' + port + '/chats/send-media?id=johntol', {
    //                                         receiver: group.id,
    //                                         imgurl: gambar.url,
    //                                         caption: caption

    //                                     }).then(resp => {
    //                                         // console.log('upload')
    //                                     })

    //                                     await delay(2000)
    //                                 }


    //                             }


    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log(error)
    //                 }





    //                 async function sendTextToGroup(newlistharga, groups) {
    //                     for await (let group of groups) {
    //                         console.log(group.id)
    //                         await axios.post('http://127.0.0.1:' + port + '/chats/send-group-text?id=johntol', {
    //                             receiver: group.id,
    //                             message: newlistharga

    //                         }).then(resp => {
    //                             console.log('upload')
    //                         })

    //                         await delay(2000)
    //                     }
    //                 }
    //                 let newlistharga = listharga
    //                     .split("\n")
    //                     .filter((item, i, allItems) => {
    //                         return i === allItems.indexOf(item);
    //                     })
    //                     .join("\n");

    //                 await sendTextToGroup(newlistharga, groups);








    //             }
    //             console.log('done...')
    //             return true;



    //         }




    //     });










    // }





})

nodeCleanup(cleanup)

export default app
