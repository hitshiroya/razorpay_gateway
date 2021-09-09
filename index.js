const express=require('express');
const Razorpay=require('razorpay');
const app=express();
//const order_id;
const razorpay=new Razorpay({
    key_id:'rzp_test_VBKDODJSPTcBim',
    key_secret:'m5lrdMttkVopF8xZha9tnkPP'
})

app.set('views','views');
app.set('view engine','ejs');
//app.use(express.urlencoded({extended:false}));

app.get(('/'),(req,res)=>{
    res.render('razorpay.ejs');
})

app.post('/order',(req,res)=>{
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        //receipt: "order_rcptid_11"
        
      };
      razorpay.orders.create(options,(err,order)=>{
          order_id=order.id;
          console.log(order);
          res.json(order);
          
          //res.json(order);
      })

      app.post('/is-order-complete',(req,res)=>{
        
razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
                if(paymentDocument.status=='captured')
                {
                    res.send('your payment done successsfullly...!');
                }else
                {
                    res.redirect('/');
                }
        })
      })
})

app.listen(5000,()=>{
    console.log('listening....okay');
})