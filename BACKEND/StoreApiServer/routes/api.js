'use strict';


const imageCtrl = require('../controllers/ImageCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const storeCtrl = require('../controllers/StoreCtrl');



module.exports = (router) => {

  router.route('/store')
    .get(authCtrl.auth, storeCtrl.listAll);

  router.route('/store/mylists')
    .get(authCtrl.auth, storeCtrl.myList);

  router.route('/store/:idx')
    .post(authCtrl.auth, storeCtrl.purchase);


  return router;
};