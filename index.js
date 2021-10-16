const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express()


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("hii")
})
app.post("/getamazon", async (req, res) => {
    const search = req.body.search
    url = `https://www.amazon.in/s?k=${search}`;

    const ary = []
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.s-result-item').each((i, el) => {
                const title = $(el).find('h2 a span').text().replace(/\s\s+/g, '');
                const lk = $(el).find('h2 a').attr('href')
                let link = 'https://www.amazon.in' + lk;


                const review = $(el).find('span a .a-size-base').text().replace(/\s\s+/g, '');
                const rating = $(el).find('.a-icon-alt').text().trim().split(" ")[0];

                const imag = $(el).find('span', { 'data-component-type': "s-product-image" })
                const imglink = imag.find('img').attr('src')

                const pr = $(el).find('span', { 'data-a-color': "price" })
                const price = pr.find('.a-price-whole').text()
                const productid = link.split("/ref=")[0]
                let reviewlink = productid.replace('/dp/', '/product-reviews/')

                if (link.indexOf("https://www.amazon.in/gp/slredirect/picassoRedirect.html/ref=") !== -1) {
                    const aryy = link.split("%2F")
                    reviewlink = "https://www.amazon.in/" + aryy[1].trim() + "/product-reviews/" + aryy[3].trim();
                }

                const obj = {
                    title,
                    link,
                    review,
                    rating,
                    imglink,
                    price,
                    reviewlink
                }
                ary.push(obj)
                // console.log(i+ "---" + title +" "+ link +" "+ review + " " + rating + " "+ imglink + " "+ price)

            })






            // console.log(ary);
            res.send(ary);
        }
    });

})

// app.post("/getflipkart", async (req, res) => {
//     const search = req.body.search
//     url = `https://www.flipkart.com/search?q=${search}`;


//     const ary = []
//     const elc = ['tv', 'laptop', 'mobile', 'phone', 'realme', 'mi', 'readme', 'poco', 'samsung', 'lg', 'sonic', 'nokia', 'oppo', 'vivo', 'dell', 'hp', 'asus', 'dell laptop', 'hp laptop', 'asus laptop']
//     let check = false;
//     if (elc.includes(search.toLowerCase())) {
//         check = true
//     }
//     request(url, (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//             const $ = cheerio.load(html);
//             // console.log(html)

//             if (check) {
//                 $('._1AtVbE').each((i, el) => {

//                     const title = $(el).find('._4rR01T').text().replace(/\s\s+/g, '');
//                     const lk = $(el).find('._1fQZEK').attr('href')
//                     const link = 'https://www.flipkart.com' + lk;
//                     const review = $(el).find('._2_R_DZ').text().replace(/\s\s+/g, '');
//                     const imglink = $(el).find('.CXW8mj img').attr('src')

//                     const rating = $(el).find('._3LWZlK').text().trim();
//                     const productid = link.split("&")[0]
//                     const reviewlink = productid.replace('/p/', '/product-reviews/')



//                     const price = $(el).find('._1_WHN1').text()

//                     const obj = {
//                         title,
//                         link,
//                         review,
//                         rating,
//                         imglink,
//                         price,
//                         reviewlink
//                     }
//                     ary.push(obj)


//                 })

//             }
//             else {
//                 $('._1xHGtK').each((i, el) => {
//                     // console.log(el)
//                     const title = $(el).find('._4rR01T').text().replace(/\s\s+/g, '');
//                     const lk = $(el).find('.IRpwTa').attr('href')
//                     const link = 'https://www.flipkart.com' + lk;
//                     const imglink = $(el).find('a ._312yBx img').attr('src')
//                     // const pr = $(el).find('div', { 'class': "_312yBx" })
//                     //    const imglink=pr.find('img').attr('src')
//                     // const imglink=$('._2r_T1I ').attr('src')
//                     // console.log()

//                     const productid = link.split("&")[0]
//                     const reviewlink = productid.replace('/p/', '/product-reviews/')



//                     const price = $(el).find('._30jeq3').text()

//                     const obj = {
//                         title,
//                         link,
//                         review: "",
//                         rating: "",
//                         imglink,
//                         price,
//                         reviewlink
//                     }
//                     ary.push(obj)


//                 })
//             }










//             // console.log(ary);
//             res.send(ary);
//         }
//     });

// })

app.post("/getflipkartele", async (req, res) => {
    const search = req.body.search
    url = `https://www.flipkart.com/search?q=${search}`;


    const ary = []


    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // console.log(html)


            $('._1AtVbE').each((i, el) => {

                const title = $(el).find('._4rR01T').text().replace(/\s\s+/g, '');
                const lk = $(el).find('._1fQZEK').attr('href')
                const link = 'https://www.flipkart.com' + lk;
                const review = $(el).find('._2_R_DZ').text().replace(/\s\s+/g, '');
                const imglink = $(el).find('.CXW8mj img').attr('src')

                const rating = $(el).find('._3LWZlK').text().trim();
                const productid = link.split("&")[0]
                const reviewlink = productid.replace('/p/', '/product-reviews/')



                const price = $(el).find('._1_WHN1').text()

                const obj = {
                    title,
                    link,
                    review,
                    rating,
                    imglink,
                    price,
                    reviewlink
                }
                ary.push(obj)


            })













            // console.log(ary);
            res.send(ary);
        }
    });

})

app.post("/getflipkartdress", async (req, res) => {
    const search = req.body.search
    url = `https://www.flipkart.com/search?q=${search}`;
    const ary = []

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // console.log(html)



            $('._1xHGtK').each((i, el) => {
                // console.log(el)
                const title = $(el).find('.IRpwTa').text().replace(/\s\s+/g, '');
                const lk = $(el).find('.IRpwTa').attr('href')
                const link = 'https://www.flipkart.com' + lk;
                let imglink = $(el).find('._312yBx img').attr('src')


                const productid = link.split("&")[0]
                const reviewlink = productid.replace('/p/', '/product-reviews/')



                const price = $(el).find('._30jeq3').text()
                if (imglink === "") {
                    imglink = 'http://localhost:4000/image/images.png'
                }

                const obj = {
                    title,
                    link,
                    review: "",
                    rating: "",
                    imglink,
                    price,
                    reviewlink
                }
                ary.push(obj)


            })






            // console.log(ary);
            res.send(ary);
        }
    });

})


app.post("/getflipkartgro", async (req, res) => {
    const search = req.body.search
    url = `https://www.flipkart.com/search?q=${search}`;
    const ary = []

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // console.log(html)



            $('._4ddWXP').each((i, el) => {
                // console.log(el)
                const title = $(el).find('.s1Q9rs').text().replace(/\s\s+/g, '');
                const lk = $(el).find('.s1Q9rs').attr('href')
                const link = 'https://www.flipkart.com' + lk;
                const imglink = $(el).find('.CXW8mj img').attr('src')
                // const review = $(el).find('._2afbis span').text().replace(/\s\s+/g, '');
                const rating = $(el).find('._3LWZlK').text().trim();

                // console.log(review)

                const productid = link.split("&")[0]
                const reviewlink = productid.replace('/p/', '/product-reviews/')



                const price = $(el).find('._30jeq3').text()
                if (imglink === "") {
                    imglink = 'http://localhost:4000/image/images.png'
                }

                const obj = {
                    title,
                    link,
                    review: "",
                    rating,
                    imglink,
                    price,
                    reviewlink
                }
                ary.push(obj)


            })






            // console.log(ary);
            res.send(ary);
        }
    });

})




app.post("/flipreview", async (req, res) => {
    try {
        const link = req.body.link
        // console.log(link)
        const ary = []

        request(link, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                // console.log(html)



                $('._1AtVbE').each((i, el) => {
                    // console.log(el)
                    const name = $(el).find('._2V5EHH').text().trim();


                    let msg = $(el).find('._6K-7Co').text().trim();
                    if (msg === "") {
                        msg = $(el).find('._2-N8zT').text().trim();
                    }
                    const rating = $(el).find('._3LWZlK').text().trim();
                    let desc = $(el).find('.t-ZTKy div div').text().trim();

                    if (desc) {
                        const d = parseInt(desc.charAt(0))
                        if (Number.isInteger(d)) {
                            if (desc.slice(1, desc.length) === msg) {
                                desc = ""
                            }
                        }
                    }

                    // console.log((desc.charAt(0)) )

                    const obj = {
                        name,
                        rating,
                        msg,
                        desc
                    }
                    ary.push(obj)


                })


                // _2-N8zT mbile 



                // console.log(ary);
                res.send(ary);
            }
        });

    }
    catch (err) {
        console.log(err)
    }
})

app.post("/amazonreview", async (req, res) => {
    try {
        const link = req.body.link
        // console.log(link)
        const ary = []

        request(link, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                // console.log(html)



                $('.review').each((i, el) => {
                    // console.log(el)
                    const name = $(el).find('.a-profile-name').text().trim();


                    let msg = $(el).find('.review-title span').text().trim();

                    const rat = $(el).find('.a-icon-alt').text().trim();
                    const rating = rat.split(" ")[0]
                    const desc = $(el).find('.review-text span').text().trim();

                    const obj = {
                        name,
                        rating,
                        msg,
                        desc
                    }
                    ary.push(obj)


                })


                // _2-N8zT mbile 



                // console.log(ary);
                res.send(ary);
            }
        });
    }
    catch (err) {
        console.log(err)
    }
})


app.post("/getflipkartfur", async (req, res) => {
    const search = req.body.search
    url = `https://www.flipkart.com/search?q=${search}`;
    const ary = []

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // console.log(html)



            $('._4ddWXP').each((i, el) => {
                // console.log(el)
                const title = $(el).find('.s1Q9rs').text().replace(/\s\s+/g, '');
                const lk = $(el).find('.s1Q9rs').attr('href')
                const link = 'https://www.flipkart.com' + lk;
                const imglink = $(el).find('.CXW8mj img').attr('src')
                // const review = $(el).find('._2afbis span').text().replace(/\s\s+/g, '');
                const rating = $(el).find('._3LWZlK').text().trim();

                // console.log(review)

                const productid = link.split("&")[0]
                const reviewlink = productid.replace('/p/', '/product-reviews/')



                const price = $(el).find('._30jeq3').text()
                if (imglink === "") {
                    imglink = 'http://localhost:4000/image/images.png'
                }

                const obj = {
                    title,
                    link,
                    review: "",
                    rating,
                    imglink,
                    price,
                    reviewlink
                }
                ary.push(obj)


            })






            // console.log(ary);
            res.send(ary);
        }
    });

})


app.get("/flipDetails/:id", async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        url = `https://www.flipkart.com/product/p/${id}`;
        const ary = []
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                // console.log(html)



                $('._1YokD2').each((i, el) => {
                    
                    let imglink = $(el).find('.CXW8mj img').attr('src')
                    const title = $(el).find('.B_NuCI').text().trim()
                    let price = $(el).find('._30jeq3').text().trim().split("₹")[1]
                    price ="₹"+price

                    if(!imglink)
                    {
                        imglink=$(el).find('._312yBx img').attr('src')
                    }



                    const obj = {
                        title,
                        imglink:imglink,
                        price
                    }
                    ary.push(obj)


                })






                // console.log(ary);
                res.send(ary);
            }
        });

    } catch (err) {
        console.log(err)
    }
})
app.get("/amazonDetails/:id", async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        url = `https://www.amazon.in/product/dp/${id}`;
        const ary = []
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                // console.log(html)



                $('#ppd').each((i, el) => {
                    // const imag = $(el).find('span', { 'id': "a-autoid-9-announce" })
                    // const imglink = imag.find('img').attr('src')
                    let imglink = $(el).find('.a-button-text img').attr('src')
                    const title = $(el).find('#productTitle').text().trim()
                    let price = $(el).find('#priceblock_dealprice').text().trim()

                    // imglink=imglink.replace('_SS40_','_SS300_')
                    // imglink=imglink.replace('_SR38,50_','_SS300_')
                    imgary=imglink.split('.')
                    // console.log(imgary)
                    imgary[imgary.length-2]='_SS300_'
                    // console.log(imgary)
                    // console.log(imgary.join())
                    imglink=imgary.join().replace(/,/g,".")


                    if(!price)
                    {
                        price= $(el).find('#priceblock_ourprice').text().trim()
                    }

                    const obj = {
                        title,
                        imglink:imglink,
                        price
                    }
                    ary.push(obj)


                })






                // console.log(ary);
                res.send(ary);
            }
        });


        

    }
    catch (err) {
        console.log(err)
    }
})


app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})