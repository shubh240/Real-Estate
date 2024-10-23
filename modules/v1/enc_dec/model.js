const { encryptionjs, decryptionjs } = require('../../../middleware/headerValidator');

var enc_dec_modal = {

    /*==================================================== 
      encryption api                                                                               
   ====================================================== */

    reactEncryption: (request, res, callback) => {
        if (request != "" && request != undefined) {
            encryptionjs(request, (encryptionData) => {
                if (encryptionData != null) {
                    res.send(encryptionData)
                } else {
                    callback('', { keyword: 'encryption not done', content: {} }, {})
                }
            })
        } else {
            callback('', { keyword: 'encryption not done', content: {} }, {})
        }
    },

    /*==================================================== 
      decryption api                                                                               
    ====================================================== */

    reactDecryption: (request, res, callback) => {
        if (request != "" && request != undefined) {
            decryptionjs(request, (Decryption) => {
                if (Decryption != null) {
                    res.send(Decryption)
                } else {
                    callback('0', { keyword: 'decryption not done', content: {} }, {})
                }
            })
        } else {
            callback('0', { keyword: 'decryption not done', content: {} }, {})
        }
    },
}

module.exports = enc_dec_modal