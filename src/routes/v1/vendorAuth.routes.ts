import { Router } from 'express';
import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import VendorAuthController from '../../controllers/vendorAuth.controller';
import { vendorAuthFields } from '../../requiredFields';

const router = Router();

router.post('/register', requireFieldsMiddleware(vendorAuthFields.register), VendorAuthController.vendorRegistration);

router.post('/login', requireFieldsMiddleware(vendorAuthFields.login), VendorAuthController.vendorLogin);

router.post('/forget-password', VendorAuthController.forgetPassword);

export { router as vendorAuthRoute };
