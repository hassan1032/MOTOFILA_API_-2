import { Router } from 'express';
import WorkerAuthController from '../../controllers/worker.controller';
import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import { workerFields } from '../../requiredFields';
import { authenticateVendor } from '../../middlewares/jwtAuth';

const router = Router();

router.get('/', authenticateVendor, WorkerAuthController.getAllWorkers);

router.get('/:id', authenticateVendor, WorkerAuthController.getWorkerById);

router.post('/', authenticateVendor, requireFieldsMiddleware(workerFields.create), WorkerAuthController.createWorker);

router.put('/:id', authenticateVendor, requireFieldsMiddleware(workerFields.update), WorkerAuthController.updateWorker);

router.delete('/:id', authenticateVendor, WorkerAuthController.deleteWorker);

export { router as workerAuthRoute };