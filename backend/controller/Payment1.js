const express = require('express');
const router = express.Router();
const con = require('../db');

module.exports = () => {
    router.get('/:id', async (req, res) => {
        try {
            const [ret] = await con.execute('select * from customers where email = ?', [req.params.id]);
            res.json(ret[0]);
        } catch (err) {
            res.status(500).send('db 오류');
        }
    });

    router.post('/add', async (req, res) => {
        const { email, customer_name, zip, roadname_address, building_name, detail_address } = req.body;

        const query = `
          UPDATE customers
            SET 
                customer_name = ?,
                zip = ?,
                roadname_address = ?,
                building_name = ?,
                detail_address = ?
            WHERE email = ?;
        `;

        try {
            await con.execute(query, [customer_name, zip, roadname_address, building_name, detail_address, email]);
            res.json('수정완료');
        } catch (err) {
            res.status(500).send('db 오류');
        }
    });

    return router;
};
