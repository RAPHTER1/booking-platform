import { pool } from '../config/database.js';

export async function findRoleById(roleId) {
    const result = await pool.query('SELECT * FROM roles WHERE id_role = $1', [roleId]);
    return result.rows[0];
}