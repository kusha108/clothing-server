

import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmMerchantkey, paytmParams } from '../index.js';



export const addpaymentgateway = async (request, response) => {
     try{
      let paytmcheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);

      let params = {...paytmParams, "CHECKSUMHASH": paytmcheckSum}
      response.status(200).json(params);
     }catch(error){
      response.status(500).json({ error:error.message || 'Something went wrong'});
}
}