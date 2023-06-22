const express=require("express");

const jwt=require("jsonwebtoken");
const SECRET_CODE="siva";

const router=express.Router();
const {offer}=require("../schemas/offer-schema");

const getUserByToken=(token)=>{
    return new Promise((resolve,reject)=>{
        if(token){
            let userData
            try {
                userData=jwt.verify(token,SECRET_CODE)
                resolve(userData)

            }catch(err){
                reject("Invalid Token")
            }

        }else{
            reject("Token not found")
        }
    })
}
router.post("/list",async(req,res)=>{
    const validOffers=[];
    offer.find().then((offers)=>{
        console.log("offer list",offers);
        offers.filter((offer)=>{
            const rules=offer.target.split("and")
            rules.forEach((rule) => {
                let ruleKey={}
                if(rule.includes(">")){
                    ruleKey={key:rule.trim().split(">")[0].trim(),value:parseInt(rule.trim().split(">")[1])}
                    console.log(req.body[ruleKey.key])
                    if(req.body[ruleKey.key]>ruleKey.value){
                        validOffers.push(offer)
                    }

                }else {
                    ruleKey={key:rule.trim().split("<")[0],value:rule.trim().split("<")[1]}
                    if(req.body[ruleKey.key]<ruleKey.value){
                        validOffers.push(offer)
                    }
                }
                
            });
           
        }) 
        res.status(200).send(validOffers);
         
    }).catch(()=>{
        res.status(500).send("internal server error")
    })

})
router.post("/create",async(req,res)=>{
    getUserByToken(req.headers.authorization).then((user)=>{
        offer.create({...req.body, username:user.username}).then((offer)=>{
            res.status(200).send(offer)

        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
        //res.status(200).send(user)

    }).catch((err)=>{
        res.status(400).send(err)

    })
    
})
router.put("/update",async()=>{
    offer.updateOne("identifer data","new data")

});
router.delete("/delete",async()=>{
    offer.deleteOne({_id:req.body.id})

})

module.exports=router;