import { Router } from 'https://deno.land/x/oak/mod.ts';
import { home,signup,kategori} from './controllers/blog.ts';
const router = new Router();
router
    .get ("/", home)
    .get ("/daftar",signup)
    .post("/daftar",signup)
    .get ("/kategori/:id",kategori);
export default router;