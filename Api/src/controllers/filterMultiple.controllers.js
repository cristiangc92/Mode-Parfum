const infoDb = require('../services/infoDB.service')

const filterMultiple = async(req,res) => {
    try{ 
        const { genero , price , marca} = req.query
        if(genero && !price && !marca){ 
            const filt = await infoDb.productsDbInfo()  
            console.log(genero)
            let genre = filt.filter(e=> e.genre.toLowerCase() === genero.toLowerCase())  
            res.json(genre)
        }else if(genero && price && !marca){   
            const filt = await infoDb.productsDbInfo() 
            let genre = filt.filter(e=> e.genre.toLowerCase() === genero.toLowerCase()) 
            if(price === 'ASC'){ 
                let price = genre.sort(function (a, b) {
                    if (a.price[0][1] > b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] > a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }) 
                res.json(price)
            } 
            if(price === 'DESC'){ 
                let price = genre.sort(function (a, b) {
                    if (a.price[0][1] < b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] < a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }); 
                res.json(price)
            }
        }else if(genero && price && marca){ 
            const filt = await infoDb.productsDbInfo() 
            let genre = filt.filter(e=> e.genre.toLowerCase() === genero.toLowerCase())  
            let brand = genre.filter(e=> e.brand.dataValues.name.toLowerCase() === marca.toLowerCase()) 
            if(price === 'ASC'){ 
                let price = brand.sort(function (a, b) {
                    if (a.price[0][1] > b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] > a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }) 
                res.json(price)
            } 
            if(price === 'DESC'){ 
                let price = brand.sort(function (a, b) {
                    if (a.price[0][1] < b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] < a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }); 
                res.json(price) 
            }
        }else if(marca && genero && !price){ 
            const filt = await infoDb.productsDbInfo() 
            let genre = filt.filter(e=> e.genre.toLowerCase() === genero.toLowerCase())  
            let brand = genre.filter(e=> e.brand.dataValues.name === marca)  
            res.json(brand)
        }else if(marca && price && !genero){ 
            const filt = await infoDb.productsDbInfo()  
            let brand = filt.filter(e=> e.brand.dataValues.name.toLowerCase() === marca.toLowerCase())  
            if(price === 'ASC'){ 
                let price = brand.sort(function (a, b) {
                    if (a.price[0][1] > b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] > a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }) 
                res.json(price)
            } 
            if(price === 'DESC'){ 
                let price = brand.sort(function (a, b) {
                    if (a.price[0][1] < b.price[0][1]) {
                      return 1;
                    }
                    if (b.price[0][1] < a.price[0][1]) {
                      return -1;
                    }
                    return 0;
                  }); 
                res.json(price) 
            }
        }else if(marca && !price && !genero){ 
            const filt = await infoDb.productsDbInfo()  
            let brand = filt.filter(e=> e.brand.dataValues.name.toLowerCase() === marca.toLowerCase())   
            res.json(brand)
        }else if(price && !marca && !genero){ 
            const filt = await infoDb.productsDbInfo()  
            if(price === 'ASC'){ 
              let price = filt.sort(function (a, b) {
                  if (a.price[0][1] > b.price[0][1]) {
                    return 1;
                  }
                  if (b.price[0][1] > a.price[0][1]) {
                    return -1;
                  }
                  return 0;
                }) 
              res.json(price)
          } 
          if(price === 'DESC'){ 
              let price = filt.sort(function (a, b) {
                  if (a.price[0][1] < b.price[0][1]) {
                    return 1;
                  }
                  if (b.price[0][1] < a.price[0][1]) {
                    return -1;
                  }
                  return 0;
                }); 
              res.json(price) 
          }
        }
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    filterMultiple
}