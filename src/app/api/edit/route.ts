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
        const sql = `SELECT * FROM games WHERE app_id = ? FOR UPDATE;`;
        const editQuery = `UPDATE games
                    SET 
                        game_name = ?,
                        release_date = ?,
                        price = ?,
                        header_image = ?,
                        positive = ?,
                        negative = ?
                    WHERE 
                        app_id = ?;`;
        const id = url.searchParams.get('id');
        const name = url.searchParams.get('name') || null;
        const date = url.searchParams.get('date') || null;
        const price = url.searchParams.get('price') || null;
        const image = url.searchParams.get('image') || null;
        const positive = url.searchParams.get('positive') || null;
        const negative = url.searchParams.get('negative') || null;
        await dbConnection.query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;");
        await dbConnection.query("START TRANSACTION;");
        await dbConnection.query(sql,[id]);
        await dbConnection.query(editQuery,[name,date,price,image,positive,negative,id]);
        await dbConnection.query("COMMIT;");


        return NextResponse.json({ message: 'Data edited successfully' });
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}