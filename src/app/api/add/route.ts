import { createConnection1 } from '@/utils/dbMaster';  // Master DB
import { createConnection2 } from '@/utils/dbLower';   // Lower DB
import { createConnection3 } from '@/utils/dbUpper';   // Upper DB
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
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

    // SQL query
    const sql = `
      START TRANSACTION;

      -- Set isolation level to REPEATABLE READ
      SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

      INSERT INTO games (app_id, game_name, release_date, price, header_image, positive, negative)
      VALUES (?, ?, ?, ?, ?, ?, ?);

      COMMIT;
    `;

    // Extract the parameters directly from the URL search parameters
    const id = url.searchParams.get('id');
    const name = url.searchParams.get('name');
    const date = url.searchParams.get('date');
    const price = url.searchParams.get('price');
    const image = url.searchParams.get('image');
    const positive = 0;
    const negative = 0;

    // Check if all parameters are provided (for optional parameters, you might want to do additional validation)
    if (!id || !name || !date || !price || !image || !positive || !negative) {
      return NextResponse.json({ error: 'Missing required parameters' });
    }

    // Ensure the values are correctly passed to the query (type conversion or validation may be needed)
    await dbConnection.query(sql, [id, name, date, price, image, positive, negative]);

    // Return success response
    return NextResponse.json({ message: 'Data inserted successfully' });
    
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error: error.message || 'An error occurred' });
  }
}
