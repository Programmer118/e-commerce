import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types:['card'],
            billing_address_collection:'required',
            shipping_options:[
                {shipping_rate:'shr_1MXfl9SABZrrOXzZ9U48AbSu'},
                {shipping_rate:'shr_1MXfj5SABZrrOXzZQmGxpdDU'}
            ],
            line_items: req.body.map((item)=>{
                const img = item.image[0].asset._ref
                const newImage = img.replace('image-','https://cdn.sanity.io/images/6pj0dl7b/production/').replace('-webp','.webp')

                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name: item.name,
                            images:[newImage],

                        },
                        unit_amount:item.price*100
                    },
                    adjustable_quantity:{
                        enabled: true,
                        minimum:1,
                    },
                    quantity:item.quantity
                }
            }),

          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/canceled`,
        }
      
      
        // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    //   res.redirect(303, session.url);
    } catch (err) {
        res.status(400);
        return res.send({
          error: {
            message: e.message,
          }
        });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}