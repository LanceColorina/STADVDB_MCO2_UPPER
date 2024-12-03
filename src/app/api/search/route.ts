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
        const sql = `SELECT * FROM games WHERE app_id = ?;`;

        const name = url.searchParams.get('name');
        await dbConnection.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
        await dbConnection.query('START TRANSACTION;');
        const game = await dbConnection.query(sql,[name]);
        await dbConnection.query('COMMIT;');
        return NextResponse.json(game[0]);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}