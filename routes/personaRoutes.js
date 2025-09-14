import express from 'express';
import {
  fullStackDiagnostic,
  updatePersona,
  deletePersona
} from '../controllers/personaController.js';

const router = express.Router();

router.get('/fullStackDiagnostic', fullStackDiagnostic);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);

export default router;
module.exports = router;
