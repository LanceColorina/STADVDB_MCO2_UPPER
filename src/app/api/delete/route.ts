import {createConnection1} from '@/utils/dbMaster'
import {createConnection2} from '@/utils/dbLower'
import {createConnection3} from '@/utils/dbUpper'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {

        const url = new URL(req.url);

        // Extract the database type from the URL (e.g., /api/endpoint?db=master, lower, or upper)
        const dbType = url.searchParams.get('db'); // Get the 'db' query param value (e.g., 'master', 'lower', 'upper')
    
        // Check for valid dbType, default to 'master' if not provided or invalid
        let dbConnection;
        if (dbType === 'master') {
          dbConnection = await createConnection1();
        } else if (dbType === 'lower') {
          dbConnection = await createConnection2();
        } else if (dbType === 'upper') {
          dbConnection = await createConnection3();
        } else {
          // Default to master if no valid dbType is provided
          dbConnection = await createConnection1();
        }

        //Unoptimized
        const selectQuery = `SELECT * FROM games WHERE app_id = ? FOR UPDATE;`;
        const deleteQuery = `DELETE FROM games WHERE app_id = ?;`;

        const id = url.searchParams.get('id');
        await dbConnection.query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;");
        await dbConnection.query("START TRANSACTION;");
        const rows = await dbConnection.query(selectQuery, [id]);
        console.log(rows);
        await dbConnection.query(deleteQuery, [id]);
        await dbConnection.query("COMMIT;");
        return NextResponse.json({ message: 'Data deleted successfully' });
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}