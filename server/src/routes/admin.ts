import { Router } from "express";
import { deleteResource, editResource, getNumberOfResourceDocuments, getResource, getResources, getStatistics, getUsers, saveResource, sendPromoEmails } from "../controllers/admin";
import { verifyAdmin, verifyToken } from "../middleware/auth";
import upload from "../utils/cloudinary";
import { dataUriFormatter } from "../utils/functions";

const router = Router();

router.use(verifyToken, verifyAdmin);

//router.get('/users', getUsers);

router.post('/users', async (req: any, res: any) => {
    console.log(req.body)
    console.log(req.files.image)

    const file = dataUriFormatter(req.files.image.name, req.files.image.data);

    if (!file)
        return res.status(510).json({ error: 'Server could not upload image' });

    const slika = await upload(file);
    console.log(slika)
    res.status(200).json({ link: slika.secure_url });
})


router.get('/statistics', getStatistics);

router.post('/send-promotional-email', sendPromoEmails);

router.get('/get-number-of-:resourceType', getNumberOfResourceDocuments);

router.get('/:resourceType', getResources);

router.get('/:resourceType/:id', getResource);

router.post('/:resourceType', saveResource);

router.patch('/:resourceType/:id', editResource);

router.delete('/:resourceType', deleteResource);


export default router;