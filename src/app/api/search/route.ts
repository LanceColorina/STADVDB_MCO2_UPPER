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
        const sql = `START TRANSACTION;

                    -- Set isolation level to REPEATABLE READ
                    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

                    -- Lock the row in a shared mode to prevent modification but allow other reads
                    SELECT * FROM games WHERE game_name = $(name) LOCK IN SHARE MODE;

                    COMMIT;`;

        const name = url.searchParams.get('name');
        const game = await dbConnection.query(sql,[name]);

        return NextResponse.json(game);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}