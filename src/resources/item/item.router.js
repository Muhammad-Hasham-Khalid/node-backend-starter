import { Router } from 'express';
import controllers from './item.controllers';

const router = Router();

router.route('/').get(controllers.getMany).post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
