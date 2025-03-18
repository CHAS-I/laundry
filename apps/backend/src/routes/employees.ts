import Router from 'express'
import { EmployeeModel } from '../models/employee.js'
export const router = Router()


router.get('/', async (_req, res, _next) => {
    const result = await EmployeeModel.findMany()

    res.status(200).json(result)
})

router.get('/:id', async (req, res, next) => {
    try {
        const result = await EmployeeModel.findFirst({ id: req.params.id })

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const result = await EmployeeModel.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})